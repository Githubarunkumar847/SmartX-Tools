// src/components/PeriodicTable.jsx
import React, { useEffect, useState } from "react";

const categoryColors = {
  "diatomic nonmetal": "bg-blue-400 dark:bg-blue-600",
  "noble gas": "bg-purple-400 dark:bg-purple-600",
  "alkali metal": "bg-red-400 dark:bg-red-600",
  "alkaline earth metal": "bg-yellow-400 dark:bg-yellow-600",
  "metalloid": "bg-green-400 dark:bg-green-600",
  "polyatomic nonmetal": "bg-cyan-400 dark:bg-cyan-600",
  "transition metal": "bg-orange-400 dark:bg-orange-600",
  "post-transition metal": "bg-pink-400 dark:bg-pink-600",
  "lanthanide": "bg-indigo-400 dark:bg-indigo-600",
  "actinide": "bg-teal-400 dark:bg-teal-600",
};

const PeriodicTable = () => {
  const [elements, setElements] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBohrModel, setShowBohrModel] = useState(false);
  const [currentView, setCurrentView] = useState("image");

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

  useEffect(() => {
    if (selectedElement) {
      setShowBohrModel(false);
      setCurrentView("image");
      const timer = setTimeout(() => {
        setCurrentView("bohr");
        setShowBohrModel(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedElement]);

  const uniqueCategories = [...new Set(elements.map((el) => el.category).filter(Boolean))];

  const getPositionStyle = (element) => {
    const isLanthanide = element.category === "lanthanide";
    const isActinide = element.category === "actinide";
    const baseRow = 8;
    return {
      gridColumn: element.xpos,
      gridRow: isLanthanide ? baseRow + 1 : isActinide ? baseRow + 2 : element.ypos,
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
          className="border px-3 py-2 rounded shadow text-sm dark:bg-gray-800 dark:text-white"
        />

        <select
          className="border px-3 py-2 rounded shadow text-sm dark:bg-gray-800 dark:text-white"
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
        className="relative grid gap-1 justify-center"
        style={{
          gridTemplateColumns: "repeat(18, minmax(40px, 1fr))",
          gridAutoRows: "minmax(80px, auto)",
        }}
      >
        <div
          className="text-[10px] text-center text-gray-600 dark:text-gray-400"
          style={{ gridColumn: 4, gridRow: 6, gridColumnEnd: "span 4" }}
        >
          ← Lanthanides ↓
        </div>
        <div
          className="text-[10px] text-center text-gray-600 dark:text-gray-400"
          style={{ gridColumn: 4, gridRow: 7, gridColumnEnd: "span 4" }}
        >
          ← Actinides ↓
        </div>

        {filtered.map((element) => (
          <div
            key={element.number}
            className={`border border-gray-300 dark:border-gray-700 rounded p-1 text-xs md:text-sm hover:shadow-lg transition-all cursor-pointer flex flex-col items-center justify-center text-center ${categoryColors[element.category] || "bg-gray-200 dark:bg-gray-700"}`}
            style={getPositionStyle(element)}
            onClick={() => setSelectedElement(element)}
            title={`${element.name} (${element.symbol})`}
          >
            <span className="font-semibold text-base md:text-lg leading-tight">
              {element.symbol}
            </span>
            <span className="text-gray-700 dark:text-gray-300 text-xs">{element.number}</span>
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
            <div className="relative w-full h-60 flex justify-center items-center">
              {currentView === "image" && selectedElement.image?.url && (
                <img
                  src={selectedElement.image.url}
                  alt={selectedElement.image.title || selectedElement.name}
                  className="object-contain w-full h-full rounded"
                />
              )}
              {currentView === "bohr" && showBohrModel && selectedElement.bohr_model_3d ? (
                <model-viewer
                  src={selectedElement.bohr_model_3d}
                  alt="3D Model"
                  auto-rotate
                  camera-controls
                  style={{ width: "100%", height: "100%" }}
                ></model-viewer>
              ) : currentView === "bohr" && showBohrModel && selectedElement.bohr_model_image ? (
                <img
                  src={selectedElement.bohr_model_image}
                  alt="Bohr model"
                  className="w-full h-full object-contain animate-zoom"
                />
              ) : null}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                  onClick={() => setCurrentView("image")}
                  className="bg-white dark:bg-gray-800 text-black dark:text-white p-1 rounded-full shadow hover:bg-gray-200"
                >
                  ◀
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  onClick={() => setCurrentView("bohr")}
                  className="bg-white dark:bg-gray-800 text-black dark:text-white p-1 rounded-full shadow hover:bg-gray-200"
                >
                  ▶
                </button>
              </div>
            </div>

            <div className="space-y-1 text-sm mt-3">
              <p>
                <strong>Atomic Number:</strong> {selectedElement.number}
              </p>
              <p>
                <strong>Category:</strong> {selectedElement.category}
              </p>
              <p>
                <strong>Phase:</strong> {selectedElement.phase}
              </p>
              <p>
                <strong>Atomic Mass:</strong> {selectedElement.atomic_mass}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {selectedElement.summary}
              </p>
              <a
                href={selectedElement.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline inline-block mt-2"
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
