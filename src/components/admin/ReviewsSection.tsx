import React, { useCallback } from "react";
import styles from "../../app/admin/dashboard/dashboard.module.css";
import { Review } from "../../types/admin";

interface ReviewsSectionProps {
  reviews: Review[];
  onReviewUpdate: (reviews: Review[]) => void;
  onError: (error: string) => void;
}

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ReviewsSection({
  reviews,
  onReviewUpdate,
  onError,
}: ReviewsSectionProps) {
  // API Service Functions
  const apiService = {
    async approveReview(id: string): Promise<void> {
      const response = await fetch(`${API_BASE_URL}/reviews/${id}/approve`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to approve review");
    },

    async rejectReview(id: string): Promise<void> {
      const response = await fetch(`${API_BASE_URL}/reviews/${id}/reject`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to reject review");
    },

    async deleteReview(id: string): Promise<void> {
      const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete review");
    },
    };

  // Review handlers
  const handleViewReview = useCallback((review: Review) => {
    // TODO: Implement review view functionality
    console.log("View review:", review);
  }, []);

  const handleApproveReview = useCallback(async (id: string) => {
    try {
      await apiService.approveReview(id);
      const updatedReviews = reviews.map((r) => 
        r.id === id ? { ...r, is_approved: true } : r
      );
      onReviewUpdate(updatedReviews);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  }, [reviews, onReviewUpdate, onError]);

  const handleRejectReview = useCallback(async (id: string) => {
    try {
      await apiService.rejectReview(id);
      const updatedReviews = reviews.map((r) => 
        r.id === id ? { ...r, is_approved: false } : r
      );
      onReviewUpdate(updatedReviews);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  }, [reviews, onReviewUpdate, onError]);

  const handleDeleteReview = useCallback(async (id: string) => {
    try {
      await apiService.deleteReview(id);
      const updatedReviews = reviews.filter((r) => r.id !== id);
      onReviewUpdate(updatedReviews);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  }, [reviews, onReviewUpdate, onError]);

  return (
    <div className={styles.reviewsSection}>
      <h2>مدیریت نظرات</h2>
      <div className={styles.reviewsTable}>
        <div className={styles.tableHeader}>
          <span>شماره نظر</span>
          <span>تاریخ</span>
          <span>مشتری</span>
          <span>محصول</span>
          <span>امتیاز</span>
          <span>نظر</span>
          <span>وضعیت</span>
          <span>عملیات</span>
        </div>
        {reviews.map((review) => (
          <div key={review.id} className={styles.tableRow}>
            <span>#{review.id}</span>
            <span>
              {new Date(review.created_at).toLocaleDateString("fa-IR")}
            </span>
            <span>
              {review.first_name} {review.last_name}
            </span>
            <span>{review.product_name || "نامشخص"}</span>
            <span>{review.rating || 0} ⭐</span>
            <span className={styles.reviewComment}>{review.comment}</span>
            <span
              className={`${styles.status} ${
                styles[review.is_approved ? "approved" : "pending"]
              }`}
            >
              {review.is_approved ? "تایید شده" : "در انتظار"}
            </span>
            <div className={styles.reviewActions}>
              <button 
                className={styles.viewButton}
                onClick={() => handleViewReview(review)}
              >
                مشاهده
              </button>
              {!review.is_approved && (
                <button
                  className={styles.approveButton}
                  onClick={() => handleApproveReview(review.id)}
                >
                  تایید
                </button>
              )}
              {review.is_approved && (
                <button
                  className={styles.rejectButton}
                  onClick={() => handleRejectReview(review.id)}
                >
                  رد
                </button>
              )}
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteReview(review.id)}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
