// src/components/CurrentQuest.js
import React from 'react';
import { weeklyQuests } from '../data';

function CurrentQuest({ currentWeek, challengesCompleted, completeChallenge }) {
  // Get current quest data
  const quest = weeklyQuests[currentWeek - 1];
  
  if (!quest) return null;
  
  return (
    <section className="section quest-section">
      <h3>Current Quest: Week {currentWeek}</h3>
      
      <div className="current-quest">
        <div className="quest-header">
          <h4>{quest.title}</h4>
          <div className="quest-progress">
            {challengesCompleted.length}/4
          </div>
        </div>
        
        <p className="quest-description">{quest.description}</p>
        
        <div className="quest-challenges">
          {quest.challenges.map((challenge, index) => (
            <div 
              key={index} 
              className={`challenge-item ${
                challengesCompleted.includes(index) ? 'challenge-completed' : ''
              }`}
              onClick={() => completeChallenge(currentWeek, index, !challengesCompleted.includes(index))}
            >
              <div className="challenge-check">
                {challengesCompleted.includes(index) ? '✓' : '○'}
              </div>
              <div className="challenge-text">{challenge}</div>
            </div>
          ))}
        </div>
        
        {challengesCompleted.length === 4 && (
          <div className="quest-complete-bonus">
            <div className="bonus-icon">🏆</div>
            <div className="bonus-text">
              <h5>Week Completed!</h5>
              <p>+100 XP Week Completion Bonus</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CurrentQuest;