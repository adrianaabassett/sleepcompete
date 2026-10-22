import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  // 1. Default all days to 8.0 hours
  const [sleepData, setSleepData] = useState({
    Mon: 8.0, Tue: 8.0, Wed: 8.0, Thu: 8.0, Fri: 8.0, Sat: 8.0, Sun: 8.0
  });

  // State for the form inputs and feedback
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [inputHours, setInputHours] = useState(8.0);
  const [errorMsg, setErrorMsg] = useState('');

  // 2. Mock data abstraction for Live Friend Activity (ready for WebSockets)
  const [friendActivity] = useState([
    { id: 1, text: 'Friend A just logged 8 hours!' },
    { id: 2, text: 'Friend B just went to bed.' }
  ]);

  const MAX_HOURS = 12;
  const TARGET_HOURS = 8.0;
  
  
  const userName = localStorage.getItem('userName') || 'Insert User Name Here';

  // 3. Load saved sleep data from backend database on mount (with credentials included)
  useEffect(() => {
    fetch(`/api/sleep/${userName}`, {
      credentials: 'include', // <-- Required to send the auth cookie
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.Mon !== undefined) {
          setSleepData(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching sleep data:', err);
      });
  }, [userName]);

  // 4. Derived state: Safely cast values to Numbers to prevent string concatenation
  const days = Object.keys(sleepData);
  const totalHours = days.reduce((sum, day) => sum + Number(sleepData[day] || 0), 0);
  const avgHours = (totalHours / days.length).toFixed(1);
  const daysGoalMet = days.filter(day => Number(sleepData[day] || 0) >= TARGET_HOURS).length;

  // 5. useEffect hook to update the input field when the user selects a new day
  useEffect(() => {
    setInputHours(Number(sleepData[selectedDay] || 8.0));
  }, [selectedDay, sleepData]);

  // Handle form submission, update state, and save to the backend database
  const handleSleepSubmit = async (e) => {
    e.preventDefault();
    const hours = parseFloat(inputHours);
    if (!isNaN(hours) && hours >= 0 && hours <= MAX_HOURS) {
      const updatedSleepData = { ...sleepData, [selectedDay]: hours };
      setSleepData(updatedSleepData);
      setErrorMsg(''); // Clear any previous errors on success

      // Save updated sleep data to the backend database (with credentials included)
      try {
        await fetch('/api/sleep', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // <-- Required to send the auth cookie
          body: JSON.stringify({ userName, sleepData: updatedSleepData }),
        });
      } catch (err) {
        console.error('Failed to save sleep data to database', err);
        setErrorMsg('Failed to save to database. Please try again.');
      }
    } else {
      setErrorMsg(`Invalid input. Please enter a number between 0 and ${MAX_HOURS} hours.`);
    }
  };

  return (
    <div className="dashboard-view">
      <header className="text-center pb-3 mb-4 border-bottom">
        <h2 className="h2">SleepCompete Dashboard</h2>
        <p className="text-secondary mb-0">Welcome back, <strong className="text-light">{userName}</strong>!</p>
      </header>

      {/* Dynamic Leaderboard Section */}
      <section className="mb-5">
        <h2 className="text-center h4 mb-3">Dynamic Leaderboard (Weekly Sleep Averages)</h2>
        <div className="table-container rounded overflow-hidden">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Friend</th>
                <th scope="col">Average Sleep (Hours)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Alice</td><td>8.2</td></tr>
              <tr><td>2</td><td>Bob</td><td>7.5</td></tr>
              <tr><td>3</td><td>You</td><td>{avgHours}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Weekly Sleep Tracker Section */}
      <section className="card-style rounded p-4 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="h4 mb-0">Weekly Sleep Log</h2>
          <span className="badge bg-dark border border-secondary text-warning">Goal: {TARGET_HOURS.toFixed(1)} hrs/night</span>
        </div>
        <p className="small text-secondary mb-4">Click any day bar or use the form below to update sleep hours from previous days.</p>

        {/* Chart Columns */}
        <div className="sleep-chart-container d-flex justify-content-around align-items-end p-3 mb-4">
          {days.map((day) => {
            const hours = Number(sleepData[day] || 0);
            const heightPercent = Math.min((hours / MAX_HOURS) * 100, 100);
            const isGoalMet = hours >= TARGET_HOURS;
            const isSelected = day === selectedDay;

            return (
              <div 
                key={day} 
                className={`chart-col text-center ${isSelected ? 'selected' : ''} ${isGoalMet ? 'goal-met' : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                <div className="bar-value small mb-1">{hours}h</div>
                <div className="bar-track mx-auto">
                  <div className="bar-fill" style={{ height: `${heightPercent}%` }}></div>
                </div>
                <div className="day-label small mt-2">{day}</div>
              </div>
            );
          })}
        </div>

        {/* Live Summary Cards */}
        <div className="row g-2 text-center mb-4">
          <div className="col-4">
            <div className="p-2 rounded border border-secondary bg-dark">
              <div className="text-secondary small">Total Slept</div>
              <div className="fs-6 fw-bold text-light">{totalHours.toFixed(1)} hrs</div>
            </div>
          </div>
          <div className="col-4">
            <div className="p-2 rounded border border-secondary bg-dark">
              <div className="text-secondary small">Nightly Avg</div>
              <div className="fs-6 fw-bold text-warning">{avgHours} hrs</div>
            </div>
          </div>
          <div className="col-4">
            <div className="p-2 rounded border border-secondary bg-dark">
              <div className="text-secondary small">Goal Met</div>
              <div className="fs-6 fw-bold text-success">{daysGoalMet} / 7 Days</div>
            </div>
          </div>
        </div>

        {/* Sleep Entry Form */}
        <form onSubmit={handleSleepSubmit} className="card p-3 bg-dark border-secondary">
          <h3 className="h6 mb-3 text-light">Update Day's Hours</h3>
          <div className="row g-2 align-items-end">
            <div className="col-md-5">
              <label htmlFor="daySelect" className="form-label text-secondary small mb-1">Day</label>
              <select 
                id="daySelect" 
                className="form-select bg-dark text-light border-secondary" 
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option value="Mon">Monday</option>
                <option value="Tue">Tuesday</option>
                <option value="Wed">Wednesday</option>
                <option value="Thu">Thursday</option>
                <option value="Fri">Friday</option>
                <option value="Sat">Saturday</option>
                <option value="Sun">Sunday</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="hoursInput" className="form-label text-secondary small mb-1">Hours Slept (0-12)</label>
              <input 
                type="number" 
                id="hoursInput" 
                min="0" max="12" step="0.5" 
                className="form-control bg-dark text-light border-secondary" 
                value={inputHours}
                onChange={(e) => setInputHours(e.target.value)}
                required 
              />
            </div>
            <div className="col-md-3">
              <button type="submit" className="btn btn-warning w-100 fw-bold">Save Hours</button>
            </div>
          </div>
          {/* Form Validation Feedback Warning */}
          {errorMsg && <div className="text-danger small mt-2">{errorMsg}</div>}
        </form>
      </section>

      {/* Live Friend Activity */}
      <section className="mb-5">
        <h2 className="text-center h4 mb-3">Live Friend Activity</h2>
        <div className="card-style rounded p-3 bg-dark border border-secondary">
          {friendActivity.map((activity) => (
            <p key={activity.id} className="mb-1">
              <em>
                <strong style={{ color: 'var(--accent-color)' }}>[Live]</strong> {activity.text}
              </em>
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}