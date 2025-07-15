import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Product from "../components/Product";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search")?.toLowerCase().trim() || "";

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch(() => setAllProducts([]));
  }, []);

  const filtered = allProducts.filter((p) =>
    `${p.title} ${p.description} ${p.category}`.toLowerCase().includes(search)
  );

  console.log("Search:", search);
  console.log("Filtered:", filtered);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Product key={p.id} post={p} />
          ))}
        </div>
      ) : (
        <p className="text-xl text-gray-600">
          No products found for: <strong>{search}</strong>
        </p>
      )}
    </div>
  );
};

export default Products;
