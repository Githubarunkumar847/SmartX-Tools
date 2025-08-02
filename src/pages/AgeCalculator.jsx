import { useState } from 'react';

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [ageData, setAgeData] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    // Calculate difference in years
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

    // Calculate next birthday
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
    <div className="max-w-md mx-auto p-6 shadow-md rounded-lg bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-center">Age Calculator</h2>

      <div className="mb-4">
        <label className="block mb-1">Enter your birthdate:</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={calculateAge}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Calculate Age
      </button>

      {ageData && (
        <div className="mt-6 text-center space-y-2">
          <p className="text-lg font-semibold">
            You are {ageData.years} years, {ageData.months} months, and {ageData.days} days old
          </p>
          <p className="text-sm text-gray-700">Total Days: {ageData.totalDays.toLocaleString()}</p>
          <p className="text-sm text-gray-700">Total Weeks: {ageData.totalWeeks.toLocaleString()}</p>
          <p className="text-sm text-blue-600 mt-2 font-medium">
            ⏳ {ageData.monthsToNextBirthday} months and {ageData.remainingDays} days left for your next birthday!
          </p>
        </div>
      )}
    </div>
  );
}

export default AgeCalculator;
