import { useState } from 'react';

const unitTypes = {
  length: {
    label: 'Length',
    units: ['meter', 'kilometer', 'mile', 'foot', 'inch'],
    conversion: {
      meter: 1,
      kilometer: 0.001,
      mile: 0.000621371,
      foot: 3.28084,
      inch: 39.3701,
    },
  },
  weight: {
    label: 'Weight',
    units: ['kilogram', 'gram', 'pound', 'ounce'],
    conversion: {
      kilogram: 1,
      gram: 1000,
      pound: 2.20462,
      ounce: 35.274,
    },
  },
  speed: {
    label: 'Speed',
    units: ['m/s', 'km/h', 'mph'],
    conversion: {
      'm/s': 1,
      'km/h': 3.6,
      'mph': 2.23694,
    },
  },
  time: {
    label: 'Time',
    units: ['second', 'minute', 'hour', 'day'],
    conversion: {
      second: 1,
      minute: 1 / 60,
      hour: 1 / 3600,
      day: 1 / 86400,
    },
  },
  area: {
    label: 'Area',
    units: ['square meter', 'square kilometer', 'square mile', 'acre', 'hectare'],
    conversion: {
      'square meter': 1,
      'square kilometer': 0.000001,
      'square mile': 3.861e-7,
      'acre': 0.000247105,
      'hectare': 0.0001,
    },
  },
  volume: {
    label: 'Volume',
    units: ['liter', 'milliliter', 'gallon', 'cubic meter'],
    conversion: {
      liter: 1,
      milliliter: 1000,
      gallon: 0.264172,
      'cubic meter': 0.001,
    },
  },
  temperature: {
    label: 'Temperature',
    units: ['celsius', 'fahrenheit', 'kelvin'],
  },
};

const convertTemperature = (value, from, to) => {
  value = parseFloat(value);
  if (from === to) return value;

  if (from === 'celsius') {
    if (to === 'fahrenheit') return value * 9 / 5 + 32;
    if (to === 'kelvin') return value + 273.15;
  } else if (from === 'fahrenheit') {
    if (to === 'celsius') return (value - 32) * 5 / 9;
    if (to === 'kelvin') return (value - 32) * 5 / 9 + 273.15;
  } else if (from === 'kelvin') {
    if (to === 'celsius') return value - 273.15;
    if (to === 'fahrenheit') return (value - 273.15) * 9 / 5 + 32;
  }

  return value;
};

const UnitConverter = () => {
  const [unitType, setUnitType] = useState('length');
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [result, setResult] = useState('');

  const handleConvert = () => {
    let value = parseFloat(inputValue);
    if (isNaN(value)) return setResult('Invalid input');

    if (unitType === 'temperature') {
      const converted = convertTemperature(value, fromUnit, toUnit);
      setResult(`${converted.toFixed(2)} ${toUnit}`);
    } else {
      const baseValue = value / unitTypes[unitType].conversion[fromUnit];
      const converted = baseValue * unitTypes[unitType].conversion[toUnit];
      setResult(`${converted.toFixed(4)} ${toUnit}`);
    }
  };

  const resetAll = () => {
    const units = unitTypes[unitType].units;
    setInputValue('');
    setFromUnit(units[0]);
    setToUnit(units[1]);
    setResult('');
  };

  const handleUnitTypeChange = (e) => {
    const type = e.target.value;
    const units = unitTypes[type].units;
    setUnitType(type);
    setFromUnit(units[0]);
    setToUnit(units[1]);
    setInputValue('');
    setResult('');
  };

  const currentUnits = unitTypes[unitType].units;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-zinc-800 rounded-xl shadow-lg space-y-4 transition-all">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">🔄 Universal Unit Converter</h2>

      {/* Unit Type Selector */}
      <div className="flex flex-wrap justify-center gap-2">
        <select
          value={unitType}
          onChange={handleUnitTypeChange}
          className="p-2 rounded border bg-white dark:bg-zinc-700 dark:text-white"
        >
          {Object.entries(unitTypes).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* Conversion Inputs */}
      <div className="flex flex-wrap justify-center items-center gap-2">
        <input
          type="number"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
          className="p-2 border rounded w-full sm:w-36 dark:bg-zinc-700 dark:text-white"
        />

        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="p-2 border rounded dark:bg-zinc-700 dark:text-white">
          {currentUnits.map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>

        <span className="text-xl font-bold">→</span>

        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="p-2 border rounded dark:bg-zinc-700 dark:text-white">
          {currentUnits.map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="text-center space-x-2">
        <button
          onClick={handleConvert}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Convert
        </button>
        <button
          onClick={resetAll}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded dark:bg-zinc-600 dark:text-white dark:hover:bg-zinc-500"
        >
          Reset
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="text-center text-lg text-green-700 dark:text-green-400">
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
