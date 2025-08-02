import { useState } from 'react';

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [color, setColor] = useState('text-gray-600');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h || w <= 0 || h <= 0) {
      setBmi(null);
      setStatus('Please enter valid weight and height.');
      setColor('text-red-600');
      return;
    }

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
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-md rounded-lg bg-white dark:bg-blue-900">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-white">
        Body Mass Index Calculator
      </h2>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-300">Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700"
          placeholder="e.g. 70"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-300">Height (cm)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700"
          placeholder="e.g. 170"
        />
      </div>

      <button
        onClick={calculateBMI}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calculate BMI
      </button>

      {bmi !== null && (
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Your BMI: {bmi}</p>
          <p className={`text-sm font-medium ${color}`}>Status: {status}</p>
        </div>
      )}
    </div>
  );
}

export default BMICalculator;
