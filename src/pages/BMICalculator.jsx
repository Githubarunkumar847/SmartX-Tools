import { useState } from 'react';

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [color, setColor] = useState('text-gray-600');
  const [loading, setLoading] = useState(false);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h || w <= 0 || h <= 0) {
      setBmi(null);
      setStatus('Please enter valid weight and height.');
      setColor('text-red-600');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const heightInMeters = h / 100;
      const calculatedBMI = +(w / (heightInMeters ** 2)).toFixed(1);
      setBmi(calculatedBMI);

      if (calculatedBMI < 16) {
        setStatus('Severely underweight');
        setColor('text-red-600');
      } else if (calculatedBMI < 18.5) {
        setStatus('Underweight');
        setColor('text-yellow-500');
      } else if (calculatedBMI < 25) {
        setStatus('Normal weight');
        setColor('text-green-600');
      } else if (calculatedBMI < 30) {
        setStatus('Overweight');
        setColor('text-yellow-600');
      } else if (calculatedBMI < 35) {
        setStatus('Obese Class I');
        setColor('text-orange-600');
      } else if (calculatedBMI < 40) {
        setStatus('Obese Class II');
        setColor('text-orange-700');
      } else {
        setStatus('Obese Class III');
        setColor('text-red-700');
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto p-6 sm:p-8 rounded-xl shadow-lg bg-white dark:bg-blue-900 transition-colors">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-400">
        BMI Calculator
      </h2>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Weight (kg)
        </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="e.g. 70"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Height (cm)
        </label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="e.g. 170"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <button
        onClick={calculateBMI}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
      >
        Calculate BMI
      </button>

      {loading && (
        <div className="flex justify-center mt-6">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && bmi !== null && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Your BMI: <span className="font-bold">{bmi}</span>
          </p>
          <p className={`text-md font-medium mt-1 ${color}`}>Status: {status}</p>

          {/* Progress bar visual */}
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ease-out ${color}`}
              style={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BMICalculator;
