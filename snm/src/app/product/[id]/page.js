"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const allImages = product
  ? [product.image, ...(product.gallery_images || [])].filter(Boolean)
  : [];
  // const [allProducts, setAllProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  



  // Fetch product
  useEffect(() => {
    if (!id) return;

    fetch(`https://api.iraayacollection.com/wp-json/snm/v1/product/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setProduct(data);
      setDisplayImage(data.image);
    })
    .catch(() => setProduct(null));
    }, [id]);   

  // Fetch reviews
  useEffect(() => {
    fetch("https://api.iraayacollection.com/wp-json/snm/v1/reviews")
      .then((res) => res.json())
      .then((data) => {
        // SAFETY CHECK
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setReviews([]);
        }
      })
      .catch(() => setReviews([]));
  }, []);

  // Fetch all products (for related items)
// useEffect(() => {
//   fetch("http://snm.local/wp-json/snm/v1/products")
//     .then((res) => res.json())
//     .then((data) => {
//       if (Array.isArray(data)) {
//         setAllProducts(data);
//       } else {
//         setAllProducts([]);
//       }
//     })
//     .catch(() => setAllProducts([]));
// }, []);


    useEffect(() => {
      const savedCart = localStorage.getItem("snm_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }, []);

    useEffect(() => {
  if (!product || !product.categories?.length) return;

  const category = product.categories[0];

  fetch(
    `https://api.iraayacollection.com/wp-json/snm/v1/products?category=${category}&per_page=6`
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.products) {
        setRelatedProducts([]);
        return;
      }

      setRelatedProducts(
        data.products.filter((p) => p.id !== product.id)
      );
    })
    .catch(() => setRelatedProducts([]));
}, [product]);

  if (!product) {
    return <div className="page-container product-page">Loading product...</div>;
    console.log("PRODUCT DATA:", product);

  }

  const hasDiscount =
    product.sale_price && product.sale_price !== "";

  const stock =
    product.stock !== null && product.stock !== undefined
      ? product.stock
      : "Available";

  // SAFELY filter reviews
    const productReviews =
  product && Array.isArray(reviews)
    ? reviews.filter(
        (review) =>
          String(review.product_id) === String(product.id)
      )
    : [];

    console.log("PRODUCT ID:", product?.id);
    console.log("REVIEWS:", reviews);
    console.log("FILTERED:", productReviews);



  // Related products (same category, excluding current product)
// const relatedProducts =
//   product && product.categories && allProducts.length
//     ? allProducts.filter(
//         (p) =>
//           p.id !== product.id &&
//           p.categories?.some((cat) =>
//             product.categories.includes(cat)
//           )
//       )
//     : [];






  // WhatsApp message
const message = `Hi, I am interested in this product:

Product Name: ${product.name}
${selectedColor ? `Color: ${selectedColor}\n` : ""}${selectedSize ? `Size: ${selectedSize}\n` : ""}Product ID: ${product.id}
Price: ₹${hasDiscount ? product.sale_price : product.price}

Product Link: ${window.location.href}`;


  const whatsappLink = `https://wa.me/919999999999?text=${encodeURIComponent(
    message
  )}`;

      const sendAllOnWhatsApp = () => {
        if (cart.length === 0) {
          alert("Your list is empty");
          return;
        }

        let message = "Hi, I want to buy the following items:\n\n";

        cart.forEach((item, index) => {
          message += `${index + 1}. ${item.name}\n`;
          message += `   Product ID: ${item.id}\n`;

          if (item.color) {
            message += `   Color: ${item.color}\n`;
          }

          if (item.size) {
            message += `   Size: ${item.size}\n`;
          }

          message += `   Price: ₹${item.price}\n\n`;
        });

        message += `Total items: ${cart.length}`;

        const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(
          message
        )}`;

        window.open(whatsappUrl, "_blank");
      };


        const removeFromCart = (indexToRemove) => {
        const updatedCart = cart.filter((_, index) => index !== indexToRemove);
        setCart(updatedCart);
        localStorage.setItem("snm_cart", JSON.stringify(updatedCart));
      };


  return (
    <div className="page-container product-page">
      <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(420px, 1fr) minmax(320px, 1fr)",
        gap: "24px",
        alignItems: "flex-start",
      }}
    >

    {/* LEFT SIDE – PRODUCT DETAILS */}
    <div>
      <h1>{product.name}</h1>

      {/* {displayImage && (
      <img
        src={displayImage}
        alt={product.name}
        style={{
          width: "100%",
          maxWidth: "420px",
          marginBottom: "20px",
          borderRadius: "12px",
        }}
      />
    )} */}

    {displayImage && (
        <>
          {/* MAIN IMAGE */}
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              height: "520px",   // fixed height
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "14px",
            }}
          >
            <img
              src={displayImage}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",   // crops nicely
              }}
            />
          </div>

          {/* THUMBNAILS */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "8px",
            }}
          >
            {allImages.map(
              (img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Thumbnail"
                  onClick={() => setDisplayImage(img)}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    cursor: "pointer",
                    border:
                      displayImage === img
                        ? "2px solid var(--primary)"
                        : "1px solid #ddd",
                    transition: "all 0.2s ease",
                  }}
                />
              )
            )}
          </div>
        </>
      )}

      {/* PRICE */}
      {!hasDiscount && (
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
          Price: ₹{product.price}
        </p>
      )}

      {hasDiscount && (
        <div>
          <p className="mrp">MRP: ₹{product.price}</p>
          <p className="sale-price">₹{product.sale_price}</p>
        </div>
      )}

      <p>
        <strong>Stock:</strong> {stock}
      </p>
      {product.description && (
        <div
          style={{
            marginTop: "24px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(184, 50, 90, 0.15)",
            fontSize: window.innerWidth < 768 ? "13px" : "15px",
            lineHeight: "1.8",
            color: "rgba(0,0,0,0.85)",
          }}
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      )}


      {product.size_data && (
        <div style={{ marginTop: "20px" }}>
          <p style={{ fontWeight: "600", marginBottom: "10px" }}>
            Size Information
          </p>

          <div
            className="size-table-wrapper"
            dangerouslySetInnerHTML={{ __html: product.size_data }}
          />
        </div>
      )}

        {/* KIDS SIZE SELECTION */}
{Array.isArray(product.categories) &&
  product.categories.some(cat =>
    cat.toLowerCase().includes("kids")
  ) && (
    <div style={{ marginTop: "16px" }}>
      <p style={{ fontWeight: "600", marginBottom: "8px" }}>
        Select Size
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {[16,18,20,22,24,26,28,30,32,34,36,38].map(size => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            style={{
              padding: "6px 12px",
              borderRadius: "16px",
              border:
                selectedSize === size
                  ? "2px solid var(--primary)"
                  : "1px solid #bbb",
              background:
                selectedSize === size ? "var(--primary)" : "#fff",
              color:
                selectedSize === size ? "#fff" : "var(--text-main)",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
            }}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Size Chart Button */}
      <a
        href="/Kids_size_chart.jpeg"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: "10px",
          fontSize: "13px",
          color: "var(--primary)",
          textDecoration: "underline",
        }}
      >
        View Size Chart
      </a>
    </div>
)}



      {Array.isArray(product.colors) && product.colors.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <p style={{ fontWeight: "600", marginBottom: "8px" }}>
            Available Colors
          </p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {product.colors.filter(Boolean).map((color) => (
        <button
            key={color}
            // onClick={() => setSelectedColor(color)}
            onClick={() => {
            setSelectedColor(color);

            // switch image if color image exists
            if (product.color_images && product.color_images[color]) {
              setDisplayImage(product.color_images[color]);
            } else {
              setDisplayImage(product.image);
            }
          }}

            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border:
                selectedColor === color
                  ? "2px solid var(--primary)"
                  : "1px solid #bbb",
              background:
                selectedColor === color ? "var(--primary)" : "#ffffff",
              color:
                selectedColor === color ? "#ffffff" : "var(--text-main)",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            {color}
        </button>



            

          ))}
          </div>
          </div>
        )}

          {/* SIZE SECTION – KURTI */}
        {/* SIZE SECTION – KURTI (CLICKABLE) */}
{product.size_mode === "alpha_simple" && product.size_data && (
  <div style={{ marginTop: "20px" }}>
    <p style={{ fontWeight: 600, marginBottom: "8px" }}>
      Available Sizes
    </p>

    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      {product.size_data
        .split(",")
        .map((size) => size.trim())
        .filter(Boolean)
        .map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              border:
                selectedSize === size
                  ? "2px solid var(--primary)"
                  : "1px solid rgba(184,50,90,0.35)",
              background:
                selectedSize === size ? "var(--primary)" : "#fff",
              color:
                selectedSize === size ? "#fff" : "var(--text-main)",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            {size}
          </button>
        ))}
    </div>
  </div>
)}



      {/* WHATSAPP */}
      {/* WHATSAPP ACTIONS */}
<div
  style={{
    marginTop: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    maxWidth: "320px",
  }}
>
  {/* BUY SINGLE */}
  <div className="sticky-whatsapp-wrapper">
  <a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    className="btn-whatsapp"
  >
    Buy this on WhatsApp
  </a>
  </div>

  {/* ADD TO LIST */}
  <button
    onClick={() => {
      const newItem = {
        id: product.id,
        name: product.name,
        color: selectedColor,
        size: selectedSize || "",
        price: hasDiscount ? product.sale_price : product.price,
        link: window.location.href,
      };

      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      localStorage.setItem("snm_cart", JSON.stringify(updatedCart));

      setToast("Added to WhatsApp list");

      setTimeout(() => {
        setToast("");
      }, 2000);

    }}
    style={{
      padding: "12px 20px",
      borderRadius: "12px",
      border: "1px solid var(--primary)",
      background: "#fff",
      color: "var(--primary)",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }}
  >
    Add to WhatsApp List
  </button>

  {/* SEND ALL */}
  {cart.length > 0 && (
    <button
      onClick={sendAllOnWhatsApp}
      style={{
        padding: "12px 20px",
        borderRadius: "12px",
        border: "none",
        background: "linear-gradient(135deg, #b8325a, #d45b7a)",
        color: "#fff",
        fontWeight: "600",
        cursor: "pointer",
        boxShadow: "0 8px 18px rgba(184, 50, 90, 0.35)",
      }}
    >
      Send All ({cart.length}) on WhatsApp
    </button>
  )}
</div>

    {cart.length > 0 && (
  <div style={{ marginTop: "24px" }}>
    <p style={{ fontWeight: "600", marginBottom: "10px" }}>
      Your WhatsApp List
    </p>

    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {cart.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#f9f9f9",
            padding: "10px 14px",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          <span>
            {item.name} ({item.color})
          </span>

          <button
            onClick={() => removeFromCart(index)}
            style={{
              background: "transparent",
              border: "none",
              color: "#d00",
              fontSize: "16px",
              cursor: "pointer",
            }}
            title="Remove"
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  </div>
)}




    </div>

    {/* RIGHT SIDE – SIDEBAR */}
    <div>
      {/* RELATED PRODUCTS */}
      <div style={{ marginBottom: "65px" }}>
        <h3>Related Products</h3>

        {relatedProducts.length === 0 && (
          <p style={{ fontSize: "14px", color: "var(--gray)" }}>
            No related products found.
          </p>
        )}

          <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
          }}
        >
          {relatedProducts.slice(0, 6).map((rp) => (
            <a
              key={rp.id}
              href={`/product/${rp.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
        <div 
          className="card hover-underline"
          style={{
            display: "flex",
            gap: "8px",
            padding: "10px",
            alignItems: "center",
          }}
>

          {rp.image && (
            <img
              src={rp.image}
              alt={rp.name}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}

          <div > 
            <p style={{ fontWeight: "500", fontSize: "13px", marginBottom: "2px" }}>
              {rp.name}
            </p>

            <p style={{ fontSize: "13px", color: "var(--primary)" }}>
              ₹{rp.sale_price || rp.price}
            </p>
          </div>
        </div>
      </a>
    ))}
  </div>
</div>


      {/* REVIEWS */}
      <div style={{ paddingTop: "30px" }}>
        <h3>Customer Reviews</h3>

        {productReviews.length === 0 && (
          <p>No reviews for this product yet.</p>
        )}

        {productReviews.map((review) => (
          <div
            key={review.id}
            style={{
              marginBottom: "16px",
              padding: "16px 18px",
              borderRadius: "14px",
              background: "#fff",
              border: "1px solid rgba(184, 50, 90, 0.15)", // soft rose border
              boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 12px 26px rgba(184, 50, 90, 0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(0,0,0,0.05)";
            }}
          >

                        <strong
              style={{
                color: "#8f2c4a", // dark rose gold
                fontWeight: "600",
                display: "block",
                marginBottom: "6px",
              }}
            >
              {review.author}
            </strong>

            <p>{review.content}</p>
            
            {Array.isArray(review.images) && review.images.length > 0 && (
            <div style={{ marginTop: "12px" }}>
              {review.images.map((img, index) => (
                <div key={index} style={{ marginBottom: "12px" }}>

                  {/* THUMBNAIL */}
                  <img
                    src={img}
                    alt="Customer review thumbnail"
                    loading="lazy"
                    style={{
                      width: "120px",          // 👈 smaller, balanced
                      height: "auto",          // 👈 no crop
                      objectFit: "contain",    // 👈 no crop
                      borderRadius: "8px",
                      border: "1px solid rgba(184, 50, 90, 0.25)",
                      cursor: "zoom-in",
                    }}
                    onClick={(e) => {
                      const full = e.currentTarget.nextSibling;
                      if (full) {
                        full.style.display =
                          full.style.display === "none" ? "block" : "none";
                      }
                    }}
                  />

                  {/* FULL IMAGE (HIDDEN BY DEFAULT) */}
                  <img
                    src={img}
                    alt="Customer review full"
                    loading="lazy"
                    style={{
                      display: "none",
                      marginTop: "10px",
                      width: "100%",
                      maxWidth: "480px",       // 👈 readable but not insane
                      height: "auto",
                      objectFit: "contain",
                      borderRadius: "12px",
                      border: "1px solid rgba(184, 50, 90, 0.2)",
                    }}
                  />
                </div>
              ))}
            </div>
          )}




          </div>
        ))}
      </div>
    </div>
  </div>

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            background: "linear-gradient(135deg, #b8325a, #d45b7a)",
            color: "#fff",
            padding: "14px 22px",
            borderRadius: "12px",
            fontWeight: "600",
            boxShadow: "0 12px 24px rgba(0,0,0,0.18)",
            animation: "fadeUp 0.3s ease",
            zIndex: 9999,
          }}
        >
          {toast}
        </div>
      )}


</div>



  );
}
