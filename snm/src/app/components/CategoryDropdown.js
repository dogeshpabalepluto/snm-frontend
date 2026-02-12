"use client";

export default function CategoryDropdown({ categories }) {
  return (
    <select
      className="category-dropdown"
      defaultValue=""
      onChange={(e) => {
        const value = e.target.value;
        if (value) {
          window.location.href = value;
        }
      }}
>
      <option value="" disabled>
        Select category
      </option>

      {categories.map((cat) => (
        <option key={cat.id} value={`/category/${cat.slug}`}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}
