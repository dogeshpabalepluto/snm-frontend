"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MobileIntro() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const hasSeen = sessionStorage.getItem("snm_intro_seen");

    if (isMobile && pathname === "/" && !hasSeen) {
      setShow(true);
      sessionStorage.setItem("snm_intro_seen", "true");

      const timer = setTimeout(() => {
        setShow(false);
        document.body.classList.remove("pre-intro");
      }, 1600);

      return () => clearTimeout(timer);
    } else {
      document.body.classList.remove("pre-intro");
    }
  }, [pathname]);

  if (!show) return null;

  return (
    <div className="mobile-intro">
      <img src="/logo.png" alt="IRAAYA COLLECTION" />
    </div>
  );
}
