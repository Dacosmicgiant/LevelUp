// src/components/Stats.js
import React from 'react';

function Stats({ stats, updateStat }) {
  return (
    <section className="section">
      <h3>Character Stats</h3>
      <div className="stat-container">
        <div className="stat">
          <label>Mental Clarity:</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={stats.mentalClarity} 
            onChange={(e) => updateStat('mentalClarity', parseInt(e.target.value))}
          />
          <span>{stats.mentalClarity}/10</span>
        </div>
        <div className="stat">
          <label>Consistency:</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={stats.consistency} 
            onChange={(e) => updateStat('consistency', parseInt(e.target.value))}
          />
          <span>{stats.consistency}/10</span>
        </div>
        <div className="stat">
          <label>Emotional Intelligence:</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={stats.emotionalIntelligence} 
            onChange={(e) => updateStat('emotionalIntelligence', parseInt(e.target.value))}
          />
          <span>{stats.emotionalIntelligence}/10</span>
        </div>
        <div className="stat">
          <label>Interdependence:</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={stats.interdependence} 
            onChange={(e) => updateStat('interdependence', parseInt(e.target.value))}
          />
          <span>{stats.interdependence}/10</span>
        </div>
      </div>
    </section>
  );
}

export default Stats;