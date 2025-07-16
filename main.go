package main

import (
	"net/http"
	"strconv"
	"sync"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type ReviewRequest struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
	Genre string `json:"genre"`
}

var (
	reviewRequests = []ReviewRequest{}
	idCounter      = 1
	mutex          = &sync.Mutex{}
)

func main() {
	e := echo.New()

	// CORS対応（フロントエンドからのリクエストを許可）
	e.Use(middleware.CORS())

	// 一覧取得
	e.GET("/review-requests", func(c echo.Context) error {
		return c.JSON(http.StatusOK, reviewRequests)
	})

	// 登録（POST）
	e.POST("/review-requests", func(c echo.Context) error {
		req := new(ReviewRequest)
		if err := c.Bind(req); err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{"error": "invalid request"})
		}

		mutex.Lock()
		req.ID = idCounter
		idCounter++
		reviewRequests = append(reviewRequests, *req)
		mutex.Unlock()

		return c.JSON(http.StatusCreated, req)
	})

	// 詳細取得（GET /review-requests/:id）
	e.GET("/review-requests/:id", func(c echo.Context) error {
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			return c.JSON(http.StatusBadRequest, echo.Map{"error": "invalid id"})
		}

		for _, req := range reviewRequests {
			if req.ID == id {
				return c.JSON(http.StatusOK, req)
			}
		}
		return c.JSON(http.StatusNotFound, echo.Map{"error": "not found"})
	})

	// サーバ起動
	e.Logger.Fatal(e.Start(":8080"))
}
