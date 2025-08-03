import { useState } from 'react';

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [ageData, setAgeData] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const diffMs = nextBirthday - today;
    const daysToNextBirthday = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const monthsToNextBirthday = Math.floor(daysToNextBirthday / 30);
    const remainingDays = daysToNextBirthday % 30;

    setAgeData({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      monthsToNextBirthday,
      remainingDays,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-6">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          🎂 Age Calculator
        </h2>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Enter your birthdate:
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          onClick={calculateAge}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors"
        >
          Calculate Age
        </button>

        {ageData && (
          <div className="mt-8 text-center space-y-3">
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              You are <span className="text-green-600">{ageData.years}</span> years,{' '}
              <span className="text-green-600">{ageData.months}</span> months, and{' '}
              <span className="text-green-600">{ageData.days}</span> days old
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              📅 Total Days: <strong>{ageData.totalDays.toLocaleString()}</strong>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              📆 Total Weeks: <strong>{ageData.totalWeeks.toLocaleString()}</strong>
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-2">
              ⏳ {ageData.monthsToNextBirthday} months and {ageData.remainingDays} days until your next birthday!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgeCalculator;
