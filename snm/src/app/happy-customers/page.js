"use client";

import { useEffect, useState } from "react";

export default function HappyCustomers() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://purple-crab-746918.hostingersite.com/wp-json/snm/v1/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setReviews([]);
        }
      })
      .catch(() => setReviews([]));
  }, []);

  return (
    <div className="page-container">
      <h1>Happy Customers</h1>

      {reviews.length === 0 && <p>No reviews yet.</p>}

      {reviews.map((review) => (
        <div
          key={review.id}
          style={{
            border: "1px solid #eee",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <strong>{review.author}</strong>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}
