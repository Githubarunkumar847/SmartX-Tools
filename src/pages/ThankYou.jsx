import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SparklesCore } from "./SparklesCore";

export default function ThankYou() {
  const navigate = useNavigate();

  // Auto-redirect after 6 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 6000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Sparkle Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.6}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#22c55e"
        />
      </div>

      <div className="z-10 text-center max-w-xl px-6 py-10 rounded-2xl bg-white/80 dark:bg-black/50 shadow-xl backdrop-blur-md">
        <h1 className="text-5xl font-extrabold text-green-600 dark:text-green-400 animate-bounce mb-4">
          🎉 Thank You!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          We’ve received your message and will reach out shortly. You’ll be redirected to the homepage automatically.
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic">Redirecting...</div>
      </div>
    </div>
  );
}
