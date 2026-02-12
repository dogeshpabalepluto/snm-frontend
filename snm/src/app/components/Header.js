"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        background: "#fffaf6",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div className="header-container header-inner">

        {/* LOGO */}
       <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <img
            src="/logo.png"
            alt="IRAAYA Collections"
            width={80}
            height={80}
            style={{
              borderRadius: "30%",
              objectFit: "cover",
              background: "#fff",
              border: "1px solid rgba(120,70,90,0.25)",
              display: "block",
              pointerEvents: "auto",
            }}
          />
        </Link>


          <div className="header-brand-name">
          <div className="brand-stars">
            <span className="small">✶</span>
            <span className="big">✷</span>
          </div>

          IRAAYA&nbsp;COLLECTION

          <div className="brand-stars">
            <span className="big">✷</span>
            <span className="small">✶</span>
          </div>
        </div>





        {/* NAV */}
        <nav className="header-nav" style={{ display: "flex", gap: "24px" }}>
          <Link className="nav-link hover-underline" href="/">
            Products
          </Link>
          <Link className="nav-link hover-underline" href="/happy-customers">
            Happy Customers
          </Link>
        </nav>
      </div>
    </header>
  );
}
