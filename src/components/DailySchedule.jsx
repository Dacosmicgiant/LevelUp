// src/components/DailySchedule.js
import React from 'react';

function DailySchedule({ timeBlocks, dateString, completedBlocks, handleCompleteBlock, resetCurrentDay }) {
  // Calculate completion percentage
  const getCompletionPercentage = () => {
    return Math.round((completedBlocks.length / timeBlocks.length) * 100);
  };
  
  // Experience value of each block
  const getBlockXpValue = (activity) => {
    const activityXP = {
      "Exercise": 15,
      "Freshen up + breakfast": 5,
      "Intellect": 20,
      "Break": 5,
      "DSA + Aptitude": 20,
      "DSA": 15,
      "Aptitude": 10,
      "Minor Projects": 15,
      "Lunch": 5,
      "Major project": 25,
      "Rest": 5,
      "Dinner": 5,
    };
    
    return activityXP[activity] || 10;
  };
  
  // Group blocks by time period
  const getMorningBlocks = () => timeBlocks.filter(block => block.id <= 8);
  const getAfternoonBlocks = () => timeBlocks.filter(block => block.id > 8 && block.id <= 15);
  const getEveningBlocks = () => timeBlocks.filter(block => block.id > 15);
  
  return (
    <section className="section schedule-section">
      <div className="schedule-header">
        <h3>Today's Schedule</h3>
        <div className="completion-indicator">
          <div className="completion-percentage">{getCompletionPercentage()}%</div>
          <button 
            className="reset-button" 
            onClick={resetCurrentDay}
            title="Reset today's progress"
          >
            Reset Today
          </button>
        </div>
      </div>
      
      <div className="day-period">
        <h4>Morning</h4>
        <div className="time-blocks">
          {getMorningBlocks().map(block => (
            <div 
              key={block.id} 
              className={`time-block ${
                completedBlocks.includes(block.id) ? 'completed' : ''
              }`}
              onClick={() => handleCompleteBlock(block.id)}
            >
              <div className="time">{block.time}</div>
              <div className="activity">{block.activity}</div>
              <div className="block-xp">+{getBlockXpValue(block.activity)} XP</div>
              <div className="status-indicator">
                {completedBlocks.includes(block.id) ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="day-period">
        <h4>Afternoon</h4>
        <div className="time-blocks">
          {getAfternoonBlocks().map(block => (
            <div 
              key={block.id} 
              className={`time-block ${
                completedBlocks.includes(block.id) ? 'completed' : ''
              }`}
              onClick={() => handleCompleteBlock(block.id)}
            >
              <div className="time">{block.time}</div>
              <div className="activity">{block.activity}</div>
              <div className="block-xp">+{getBlockXpValue(block.activity)} XP</div>
              <div className="status-indicator">
                {completedBlocks.includes(block.id) ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="day-period">
        <h4>Evening</h4>
        <div className="time-blocks">
          {getEveningBlocks().map(block => (
            <div 
              key={block.id} 
              className={`time-block ${
                completedBlocks.includes(block.id) ? 'completed' : ''
              }`}
              onClick={() => handleCompleteBlock(block.id)}
            >
              <div className="time">{block.time}</div>
              <div className="activity">{block.activity}</div>
              <div className="block-xp">+{getBlockXpValue(block.activity)} XP</div>
              <div className="status-indicator">
                {completedBlocks.includes(block.id) ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DailySchedule;