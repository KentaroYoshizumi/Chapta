package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware" // ← これを追加！
)

// ReviewRequest はレビュー依頼のデータ構造
type ReviewRequest struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Body      string `json:"body"`
	Genre     string `json:"genre"`
	CreatedAt string `json:"created_at"`
}

// Reviewer 構造体
type Reviewer struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Genre string `json:"genre"`
}

var reviewRequests []ReviewRequest
var reviewers []Reviewer
var currentID = 1
var currentReviewerID = 1

func main() {
	e := echo.New()

	// CORSミドルウェアを有効化（これがないとブラウザからのAPI呼び出しが弾かれる）
	e.Use(middleware.CORS())

	// ダミーデータ（書評家）
	reviewers = append(reviewers, Reviewer{ID: currentReviewerID, Name: "山田太郎", Genre: "ビジネス"})
	currentReviewerID++
	reviewers = append(reviewers, Reviewer{ID: currentReviewerID, Name: "佐藤花子", Genre: "自己啓発"})
	currentReviewerID++

	// 簡単な疎通確認用エンドポイント
	e.GET("/ping", func(c echo.Context) error {
		return c.String(http.StatusOK, "無事動作しています。")
	})

	// レビュー依頼 新規登録
	e.POST("/review-requests", func(c echo.Context) error {
		var review ReviewRequest
		if err := c.Bind(&review); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
		}
		review.ID = currentID
		currentID++
		review.CreatedAt = "2025-07-09T00:00:00Z"
		reviewRequests = append(reviewRequests, review)
		return c.JSON(http.StatusOK, review)
	})

	// レビュー依頼一覧取得
	e.GET("/review-requests", func(c echo.Context) error {
		return c.JSON(http.StatusOK, reviewRequests)
	})

	// 書評家一覧取得
	e.GET("/reviewers", func(c echo.Context) error {
		return c.JSON(http.StatusOK, reviewers)
	})

	// 書評家 新規登録
	e.POST("/reviewers", func(c echo.Context) error {
		var reviewer Reviewer
		if err := c.Bind(&reviewer); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
		}
		reviewer.ID = currentReviewerID
		currentReviewerID++
		reviewers = append(reviewers, reviewer)
		return c.JSON(http.StatusOK, reviewer)
	})

	e.Logger.Fatal(e.Start(":8080"))
}
