// src/components/CharacterStats.js
import React from 'react';

function CharacterStats({ stats }) {
  // Get descriptive text for each stat level
  const getStatDescription = (stat, value) => {
    const descriptions = {
      mentalClarity: [
        "Scattered thoughts cloud your mind.",
        "Brief moments of clarity appear between distractions.",
        "You can maintain focus in simple situations.",
        "Your thoughts are becoming more organized.",
        "You can recognize when overthinking begins.",
        "Meditation brings noticeable mental peace.",
        "You can maintain clarity even in stressful moments.",
        "Your mind remains steady through most challenges.",
        "Distractions rarely pull you from your purpose.",
        "You possess the legendary mental clarity of an Arbiter."
      ],
      consistency: [
        "Your efforts are sporadic and scattered.",
        "You occasionally complete what you start.",
        "You show flashes of sustained effort.",
        "Your consistency is building slowly.",
        "You maintain routines with moderate success.",
        "Your flame of dedication rarely flickers.",
        "Your consistent efforts are becoming habitual.",
        "Others rely on your steady dedication.",
        "Your consistency has become a defining trait.",
        "Your unbreakable discipline is worthy of legends."
      ],
      emotionalIntelligence: [
        "Your emotions remain mysterious to you and others.",
        "You occasionally recognize your stronger feelings.",
        "You're beginning to name your emotions appropriately.",
        "You can express simple feelings with effort.",
        "Your emotional awareness is developing steadily.",
        "You connect with others' feelings with growing skill.",
        "Your emotional expressions are becoming more authentic.",
        "You navigate complex emotions with confidence.",
        "Your emotional wisdom guides your relationships.",
        "You possess the legendary empathy of a true Arbiter."
      ],
      interdependence: [
        "You rely only on yourself, rejecting all help.",
        "You reluctantly accept help in dire circumstances.",
        "You're beginning to see value in collaboration.",
        "You occasionally seek input from trusted allies.",
        "Your balance of independence and teamwork grows.",
        "You know when to lead and when to follow.",
        "You actively create opportunities for collaboration.",
        "Your strength multiplies through wise partnerships.",
        "You've mastered the art of mutual support.",
        "Your legendary ability to unify others changes the world."
      ]
    };
    
    // Value will be 1-10, map to array index 0-9
    return descriptions[stat][value - 1];
  };
  
  // Define stat icons and colors
  const statInfo = {
    mentalClarity: {
      icon: '🧠',
      color: '#3498db',
      label: 'Mental Clarity'
    },
    consistency: {
      icon: '🔥',
      color: '#e74c3c',
      label: 'Consistency'
    },
    emotionalIntelligence: {
      icon: '💫',
      color: '#9b59b6',
      label: 'Emotional Intelligence'
    },
    interdependence: {
      icon: '🤝',
      color: '#2ecc71',
      label: 'Interdependence'
    }
  };
  
  return (
    <section className="section character-stats-section">
      <h3>Character Stats</h3>
      
      <div className="stats-container">
        {Object.entries(stats).map(([stat, value]) => (
          <div key={stat} className="stat-card">
            <div className="stat-header" style={{ backgroundColor: statInfo[stat].color }}>
              <div className="stat-icon">{statInfo[stat].icon}</div>
              <div className="stat-name">{statInfo[stat].label}</div>
              <div className="stat-value">{value}/10</div>
            </div>
            
            <div className="stat-meter">
              <div 
                className="stat-fill" 
                style={{ 
                  width: `${value * 10}%`,
                  backgroundColor: statInfo[stat].color
                }}>
              </div>
            </div>
            
            <div className="stat-description">
              {getStatDescription(stat, value)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CharacterStats;