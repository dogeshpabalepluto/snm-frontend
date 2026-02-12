"use client";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "80px",
        padding: "40px 0",
        background: "#fff",
        borderTop: "1px solid #eee",
      }}
    >
      <div
        className="page-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h3>IRAAYA COLLECTION</h3>

        <p style={{ color: "#777", fontSize: "14px" }}>
          Quality fashion • Trusted by happy customers
        </p>

        {/* SOCIAL ICON BUTTONS */}
        <div style={{ display: "flex", gap: "16px" }}>
          {/* WhatsApp */}
          <a
            href="https://wa.me/919967889463"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn whatsapp"
            aria-label="WhatsApp"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.52 3.48A11.82 11.82 0 0 0 12.02 0C5.39 0 0 5.39 0 12.02c0 2.12.55 4.2 1.6 6.04L0 24l6.12-1.6a11.94 11.94 0 0 0 5.9 1.5h.01c6.63 0 12.02-5.39 12.02-12.02 0-3.2-1.25-6.21-3.53-8.4zM12.03 21.7h-.01a9.7 9.7 0 0 1-4.95-1.35l-.36-.21-3.63.95.97-3.54-.23-.36a9.65 9.65 0 1 1 8.21 4.51zm5.3-7.26c-.29-.15-1.72-.85-1.99-.94-.27-.1-.47-.15-.67.15-.2.29-.77.94-.94 1.13-.17.2-.35.22-.64.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.01-1.04 2.46 0 1.44 1.07 2.84 1.22 3.04.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.08 1.72-.7 1.97-1.38.24-.68.24-1.27.17-1.38-.07-.12-.27-.2-.57-.35z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn instagram"
            aria-label="Instagram"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                stroke="white"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" />
              <circle cx="17" cy="7" r="1.2" fill="white" />
            </svg>
          </a>
        </div>

        <p style={{ fontSize: "13px", color: "#aaa", marginTop: "10px" }}>
          © {new Date().getFullYear()} SNM. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
