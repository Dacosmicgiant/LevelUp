// src/components/Header.js - Updated with restart button
import React, { useState } from 'react';
import { getCharacterTitle } from '../utils/calculations';

function Header({ characterName, level, experience, stats, handleRestartJourney }) {
  // State for confirmation modal
  const [showRestartModal, setShowRestartModal] = useState(false);
  
  // Get title based on level and stats
  const title = getCharacterTitle(level, stats);
  
  // Get avatar based on level
  const getAvatarClass = () => {
    if (level >= 10) return 'avatar-ascended';
    if (level >= 7) return 'avatar-sage';
    if (level >= 4) return 'avatar-knight';
    return 'avatar-initiate';
  };
  
  // Toggle modal visibility
  const toggleRestartModal = () => {
    setShowRestartModal(!showRestartModal);
  };
  
  // Handle restart confirmation
  const confirmRestart = () => {
    handleRestartJourney();
    setShowRestartModal(false);
  };
  
  return (
    <header className="app-header">
      <div className="character-profile">
        <div className={`character-avatar ${getAvatarClass()}`}>
          <div className="avatar-level">{level}</div>
        </div>
        
        <div className="character-details">
          <h1>{characterName}</h1>
          <h2>{title}</h2>
          
          <div className="level-display">
            <div className="level-label">Level {level}</div>
            <div className="experience-bar">
              <div 
                className="experience-fill" 
                style={{ width: `${experience % 100}%` }}>
              </div>
            </div>
            <div className="xp-label">{experience % 100}/100 XP</div>
          </div>
        </div>
      </div>
      
      <div className="header-actions">
        <button 
          className="restart-button" 
          onClick={toggleRestartModal}
          title="Start a new journey from the beginning"
        >
          Restart Journey
        </button>
      </div>
      
      {/* Restart Confirmation Modal */}
      {showRestartModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Restart Your Journey?</h3>
            <p>This will erase <strong>all</strong> of your progress and achievements, allowing you to begin a new journey as a Templar Initiate.</p>
            <p>This action cannot be undone.</p>
            
            <div className="modal-actions">
              <button 
                className="cancel-button" 
                onClick={toggleRestartModal}
              >
                Cancel
              </button>
              <button 
                className="confirm-button danger" 
                onClick={confirmRestart}
              >
                Restart from Scratch
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;