import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import React from 'react';


function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [viewGraph, setViewGraph] = useState(false); 

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  const categoryData = filteredProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(categoryData).map((key) => ({
    category: key,
    count: categoryData[key],
  }));

  const toggleView = () => {
    setViewGraph((prevState) => !prevState);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      {}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Productos</h1>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={toggleView}
          >
            {viewGraph ? (
              <>
                <span>Ver Tabla</span>
              </>
            ) : (
              <>
                <span>Ver Gráfico</span>
              </>
            )}
          </button>
        </div>
        <input
          type="text"
          placeholder= "Buscar por nombre o categoría..."
          className="input-field w-full p-2 border rounded-md mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {}
      {viewGraph ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Categoría</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-2">{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
