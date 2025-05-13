// src/components/CalendarView.js
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarView({ currentDate, setCurrentDate, tileClassName }) {
  return (
    <section className="section">
      <h3>Flame Covenant Calendar</h3>
      <Calendar 
        onChange={setCurrentDate} 
        value={currentDate}
        tileClassName={tileClassName}
      />
    </section>
  );
}

export default CalendarView;