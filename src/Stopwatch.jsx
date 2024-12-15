import { useState } from "react";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0); // Total elapsed time
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [laps, setLaps] = useState([]); // To store lap times

  const totalDuration = 60; // Full circle duration for progress (in seconds)

  // Start/Stop function
  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const id = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    }
    setIsRunning(!isRunning);
  };

  // Reset function
  const resetTimer = () => {
    clearInterval(intervalId);
    setSeconds(0);
    setIsRunning(false);
    setIntervalId(null);
    setLaps([]); // Reset lap times
  };

  // Lap function
  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, seconds]);
  };

  // Calculate percentage for circular progress
  const progressPercentage = (seconds / totalDuration) * 100;

  // Format seconds to mm:ss
  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-teal-500">
      <div className="relative flex flex-col items-center justify-center space-y-8 p-8 rounded-3xl bg-white bg-opacity-40 backdrop-blur-xl shadow-2xl w-80 md:w-96">
        {/* Circular Timer */}
        <div className="relative w-72 h-72">
          <div
            className="absolute w-full h-full border-8 border-t-8 rounded-full"
            style={{
              background: `conic-gradient(#4C91FB ${progressPercentage}%, #e0e0e0 0%)`,
              transition: "background 1s ease-in-out",
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-extrabold text-white drop-shadow-lg">
              {formatTime(seconds)}
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="space-x-6 flex">
          <button
            onClick={toggleTimer}
            className={`px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform ${
              isRunning
                ? "bg-red-500 hover:bg-red-600 scale-110"
                : "bg-green-500 hover:bg-green-600 scale-105"
            } shadow-lg focus:outline-none`}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={recordLap}
            className="px-8 py-4 text-white font-semibold rounded-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 transform scale-105 shadow-lg focus:outline-none"
          >
            Lap
          </button>
          <button
            onClick={resetTimer}
            className="px-8 py-4 text-white font-semibold rounded-full bg-gray-600 hover:bg-gray-700 transition-all duration-300 transform scale-100 shadow-lg focus:outline-none"
          >
            Reset
          </button>
        </div>

        {/* Lap Times */}
        <div className="w-full mt-6 text-white overflow-y-auto max-h-48">
          <h3 className="text-xl font-bold">Lap Times</h3>
          <ul className="space-y-3 mt-3">
            {laps.length === 0 ? (
              <li>No laps recorded yet</li>
            ) : (
              laps.map((lap, index) => (
                <li
                  key={index}
                  className={`p-3 rounded-lg ${
                    index % 2 === 0 ? "bg-blue-300" : "bg-indigo-300"
                  } text-lg`}
                >
                  Lap {index + 1}: {formatTime(lap)}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
