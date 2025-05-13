// src/components/JourneyMap.js
import React from 'react';
import { getCharacterTitle } from '../utils/calculations';

function JourneyMap({ gameState, gameSettings, currentDate }) {
  const { startDate, endDate } = gameSettings;
  const { currentWeek, lastCompletedWeek, level, challengesCompleted } = gameState;
  
  // Calculate progress percentage through the journey
  const calculateJourneyProgress = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    
    const totalDuration = end - start;
    const elapsed = today - start;
    
    return Math.min(100, Math.max(0, Math.round((elapsed / totalDuration) * 100)));
  };
  
  // Get all milestone nodes for the journey
  const getMilestones = () => {
    const milestones = [];
    
    // Calculate dates for each week
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
    const weekLength = totalDays / 10;
    
    for (let i = 0; i < 10; i++) {
      const weekStart = new Date(start);
      weekStart.setDate(weekStart.getDate() + Math.round(i * weekLength));
      
      const weekNumber = i + 1;
      const completed = lastCompletedWeek >= weekNumber;
      const active = currentWeek === weekNumber;
      const locked = weekNumber > currentWeek;
      
      // Calculate challenges completed in this week
      const weekChallenges = challengesCompleted[weekNumber] || [];
      const challengeCount = weekChallenges.length;
      
      milestones.push({
        week: weekNumber,
        date: weekStart,
        completed,
        active,
        locked,
        challengeCount,
        title: getWeekTitle(weekNumber)
      });
    }
    
    return milestones;
  };
  
  // Get title for each week
  const getWeekTitle = (weekNumber) => {
    const titles = [
      "The Call to Adventure",
      "Forging the Foundation",
      "The Shadow Within",
      "The Crucible of Persistence",
      "The Broken Bridge",
      "The Templar's Reflection",
      "The Integrated Warrior",
      "The Dawn Judgment",
      "The Final Trial",
      "The Ascended Arbiter"
    ];
    
    return titles[weekNumber - 1];
  };
  
  // Get color class based on milestone status
  const getMilestoneColorClass = (milestone) => {
    if (milestone.completed) return 'milestone-completed';
    if (milestone.active) return 'milestone-active';
    return 'milestone-locked';
  };
  
  const journeyProgress = calculateJourneyProgress();
  const milestones = getMilestones();
  
  return (
    <section className="section journey-map-section">
      <h3>Templar's Journey</h3>
      
      <div className="journey-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${journeyProgress}%` }}>
          </div>
        </div>
        <div className="progress-stats">
          <div>Start: {new Date(startDate).toLocaleDateString()}</div>
          <div>{journeyProgress}% Complete</div>
          <div>End: {new Date(endDate).toLocaleDateString()}</div>
        </div>
      </div>
      
      <div className="journey-path">
        {milestones.map((milestone, index) => (
          <div 
            key={milestone.week} 
            className={`milestone ${getMilestoneColorClass(milestone)}`}
            style={{ left: `${(index / 9) * 100}%` }}
          >
            <div className="milestone-node">
              {milestone.completed ? '✓' : milestone.week}
              {milestone.active && !milestone.completed && (
                <div className="milestone-active-indicator"></div>
              )}
            </div>
            
            {(milestone.active || milestone.completed) && (
              <div className="milestone-info">
                <div className="milestone-week">Week {milestone.week}</div>
                <div className="milestone-title">{milestone.title}</div>
                {milestone.challengeCount > 0 && (
                  <div className="milestone-challenges">
                    {milestone.challengeCount}/4 challenges completed
                  </div>
                )}
              </div>
            )}
            
            {milestone.locked && (
              <div className="milestone-info milestone-locked-info">
                <div className="milestone-week">Week {milestone.week}</div>
                <div className="milestone-locked-text">Locked</div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="journey-goal">
        <div className="goal-icon">🏆</div>
        <div className="goal-description">
          <h4>Final Goal: Become the Ascended Arbiter</h4>
          <p>Master all four virtues to transform into your highest self</p>
        </div>
      </div>
    </section>
  );
}

export default JourneyMap;