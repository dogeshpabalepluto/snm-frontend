"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // 🔁 Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // 🔁 Fetch products (category + pagination + search)
  useEffect(() => {
    if (!slug) return;

    setLoading(true);

    fetch(
      `https://purple-crab-746918.hostingersite.com/wp-json/snm/v1/products?category=${slug}&page=${currentPage}&per_page=25&search=${encodeURIComponent(
        search
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.products || !Array.isArray(data.products)) {
          setProducts([]);
          setLoading(false);
          return;
        }

        setProducts(data.products);
        setTotalPages(data.total_pages || 1);
        setLoading(false);

        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  }, [slug, currentPage, search]);




  return (
    <div className="page-container">
      <h1 style={{ textTransform: "capitalize" }}>
        {slug.replace("-", " ")}
      </h1>

      <input
        type="text"
        placeholder="Search by product name or ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "12px 14px",
          borderRadius: "12px",
          border: "1.5px solid rgba(184, 50, 90, 0.7)",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      />


      {!loading && products.length === 0 && (
    <p>No products found in this category.</p>
    )}


      <div className="category-products-grid">
  {loading
    ? Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="product-card skeleton-card">
          <div className="skeleton-image" />
          <div className="skeleton-text short" />
          <div className="skeleton-text long" />
        </div>
      ))
    : products.map((product) => (
        <a
          key={product.id}
          href={`/product/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="product-card hover-underline">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "260px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginBottom: "12px",
                }}
              />
            )}

            <h3>{product.name}</h3>

            {/* PRICE LOGIC */}
            {product.sale_price ? (
              <div className="price-box">
                <p className="mrp">₹{product.price}</p>
                <p className="sale-price">₹{product.sale_price}</p>
              </div>
            ) : (
              <div className="price-box">
                <p className="mrp invisible">₹{product.price}</p>
                <p className="sale-price">₹{product.price}</p>
              </div>
            )}

            <p style={{ fontSize: "14px", color: "var(--gray)" }}>
              Stock left: {product.stock ?? "Available"}
            </p>
          </div>
        </a>
      ))}
</div>


              {/* PAGINATION */}
                {totalPages > 1 && (
        <div className="snm-pagination">
          <button
            className="snm-page-btn"
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((p) => p - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                className={`snm-page-btn ${
                  page === currentPage ? "active" : ""
                }`}
                onClick={() => {
                  setCurrentPage(page);
                  
                }}
              >
                {page}
              </button>
            );
          })}

          <button
            className="snm-page-btn"
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage((p) => p + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Next →
          </button>
        </div>
)}

    </div>
  );
}
