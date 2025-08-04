// src/components/PeriodicTable.jsx
import React, { useEffect, useState } from "react";

const categoryColors = {
  "diatomic nonmetal": "bg-blue-200",
  "noble gas": "bg-purple-200",
  "alkali metal": "bg-red-200",
  "alkaline earth metal": "bg-yellow-200",
  "metalloid": "bg-green-200",
  "polyatomic nonmetal": "bg-cyan-200",
  "transition metal": "bg-orange-200",
  "post-transition metal": "bg-pink-200",
  "lanthanide": "bg-indigo-200",
  "actinide": "bg-teal-200",
};

const PeriodicTable = () => {
  const [elements, setElements] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/elements.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.elements.sort((a, b) => a.number - b.number);
        setElements(sorted);
        setFiltered(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading elements.json:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...elements];
    if (filter !== "all") {
      result = result.filter((el) => el.category === filter);
    }
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter(
        (el) => el.name.toLowerCase().includes(q) || el.symbol.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [filter, search, elements]);

  const uniqueCategories = [...new Set(elements.map((el) => el.category).filter(Boolean))];

  const getPositionStyle = (element) => {
    const isLanthanide = element.category === "lanthanide";
    const isActinide = element.category === "actinide";
    const baseRow = 8;
    return {
      gridColumn: element.xpos,
      gridRow: isLanthanide ? baseRow : isActinide ? baseRow + 1 : element.ypos,
    };
  };

  if (loading) return <p className="text-center mt-10">Loading elements...</p>;

  return (
    <div className="p-4 max-w-screen overflow-x-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Periodic Table</h1>

      <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or symbol"
          className="border px-3 py-2 rounded shadow text-sm"
        />

        <select
          className="border px-3 py-2 rounded shadow text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div
        className="grid gap-1 justify-center"
        style={{
          gridTemplateColumns: "repeat(18, minmax(40px, 1fr))",
          gridAutoRows: "minmax(80px, auto)",
        }}
      >
        {filtered.map((element) => (
          <div
            key={element.number}
            className={`border border-gray-300 rounded p-1 text-xs md:text-sm hover:shadow-lg transition-all cursor-pointer flex flex-col items-center justify-center text-center ${categoryColors[element.category] || "bg-gray-200"}`}
            style={getPositionStyle(element)}
            onClick={() => setSelectedElement(element)}
            title={`${element.name} (${element.symbol})`}
          >
            <span className="font-semibold text-base md:text-lg leading-tight">{element.symbol}</span>
            <span className="text-gray-700 text-xs">{element.number}</span>
            <span className="text-[10px] leading-tight truncate max-w-[60px] md:max-w-[80px]">
              {element.name}
            </span>
          </div>
        ))}
      </div>

      {selectedElement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl relative overflow-y-auto max-h-[90vh] dark:bg-gray-900 dark:text-white">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
              onClick={() => setSelectedElement(null)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-2">
              {selectedElement.name} ({selectedElement.symbol})
            </h2>
            {selectedElement.bohr_model_3d ? (
              <model-viewer
                src={selectedElement.bohr_model_3d}
                alt="3D Model"
                auto-rotate
                camera-controls
                style={{ width: "100%", height: "300px" }}
              ></model-viewer>
            ) : selectedElement.bohr_model_image ? (
              <img
                src={selectedElement.bohr_model_image}
                alt="Bohr model"
                className="w-full h-40 object-contain mb-2"
              />
            ) : null}
            <div className="space-y-1 text-sm">
              <p><strong>Atomic Number:</strong> {selectedElement.number}</p>
              <p><strong>Category:</strong> {selectedElement.category}</p>
              <p><strong>Phase:</strong> {selectedElement.phase}</p>
              <p><strong>Atomic Mass:</strong> {selectedElement.atomic_mass}</p>
              <p className="text-gray-700 dark:text-gray-300">
                {selectedElement.summary}
              </p>
              <a
                href={selectedElement.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline inline-block mt-2"
              >
                More info
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;
