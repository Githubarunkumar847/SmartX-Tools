export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-3xl w-full text-center">
        <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">
          About <span className="text-gray-900 dark:text-white">SmartX Tools</span>
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <strong>SmartX Tools</strong> is a collection of simple, fast, and free tools designed to help students,
          professionals, and everyday users perform tasks like converting files, generating QR codes,
          calculating BMI, and more — all from a single clean interface.
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          This app is 100% web-based, requires no sign-up, and works seamlessly on mobile and desktop devices.
          We are continuously improving the tools based on user feedback and usefulness.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
          Version <span className="font-semibold">1.0.0</span> — Made with ❤️ in India 🇮🇳
        </p>
      </div>
    </div>
  );
}
