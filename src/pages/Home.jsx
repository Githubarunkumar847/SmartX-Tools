import { Link } from "react-router-dom";
import {
  FaCompress,
  FaFilePdf,
  FaExchangeAlt,
  FaHeartbeat,
  FaBirthdayCake,
  FaQrcode,
  FaFont,
  FaAtom,
  FaSubscript,
} from "react-icons/fa";
import { FaMoneyBillTransfer, FaPenNib } from "react-icons/fa6";

// Tool Configurations
const tools = [
  {
    name: "Compress Image",
    path: "/compress-image",
    icon: <FaCompress className="text-3xl text-blue-500 dark:text-blue-400" />,
    description: "Reduce image size without quality loss.",
  },
  {
    name: "Merge PDF",
    path: "/merge-pdf",
    icon: <FaFilePdf className="text-3xl text-red-500 dark:text-red-400" />,
    description: "Combine multiple PDFs into one.",
  },
  {
    name: "File Converter",
    path: "/file-converter",
    icon: <FaExchangeAlt className="text-3xl text-green-500 dark:text-green-400" />,
    description: "Convert between JPG, PNG, PDF, and DOC.",
  },
  {
    name: "BMI Calculator",
    path: "/bmi",
    icon: <FaHeartbeat className="text-3xl text-pink-500 dark:text-pink-400" />,
    description: "Calculate your Body Mass Index.",
  },
  {
    name: "Age Calculator",
    path: "/age",
    icon: <FaBirthdayCake className="text-3xl text-yellow-500 dark:text-yellow-300" />,
    description: "Calculate your exact age from DOB.",
  },
  {
    name: "QR Code Generator",
    path: "/qr",
    icon: <FaQrcode className="text-3xl text-purple-500 dark:text-purple-400" />,
    description: "Generate QR Codes for your text/URL.",
  },
  {
    name: "Text Utility",
    path: "/text-utils",
    icon: <FaFont className="text-3xl text-indigo-500 dark:text-indigo-400" />,
    description: "Generate and format clean text.",
  },
  {
    name: "Unit Converter",
    path: "/unit-converter",
    icon: <FaMoneyBillTransfer className="text-3xl text-emerald-500 dark:text-emerald-400" />,
    description: "Convert between different units.",
  },
  {
    name: "LatexViewer",
    path: "/latex",
    icon: <FaSubscript className="text-3xl text-cyan-500 dark:text-cyan-300" />,
    description: "Markdown + LaTeX Viewer.",
  },
  {
    name: "Periodic Table",
    path: "/periodictable",
    icon: <FaAtom className="text-3xl text-orange-500 dark:text-orange-400" />,
    description: "Explore the periodic table.",
  },
  {
    name: "To Do List",
    path: "/todo",
    icon: <FaPenNib className="text-3xl text-orange-500 dark:text-orange-400" />,
    description: "Manage your tasks and to-dos.",
  },
];

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to <span className="text-blue-600 dark:text-blue-400">SmartX</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          All-in-one utility tools for students, professionals, and seniors.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="mb-4">{tool.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {tool.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{tool.description}</p>
            <Link
              to={tool.path}
              className="mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-all text-sm font-medium"
            >
              Launch
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
