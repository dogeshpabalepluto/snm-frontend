import CategoryDropdown from "./components/CategoryDropdown";


async function getCategories() {
  const res = await fetch("https://purple-crab-746918.hostingersite.com/wp-json/snm/v1/categories", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="page-container">
        <div className="home-category-header"
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    }}
  >
    <h1 style={{ margin: 0 }}>Shop by Category</h1>

    <CategoryDropdown categories={categories} />
  </div>

      

      <div className="category-grid ">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`/category/${cat.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="category-card">
              {cat.image && (
                <img 
                  src={cat.image}
                  alt={cat.name}
                  className="category-image"
                />
              )}
              <h3 className="hover-underline">{cat.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
