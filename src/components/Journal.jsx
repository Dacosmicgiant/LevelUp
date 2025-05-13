// src/components/Journal.js - Enhanced with entry history display
import React, { useState, useEffect } from 'react';

function Journal({ currentDate, journalEntries, journalEntry, saveJournal }) {
  const [content, setContent] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Update content when the date or journal entry changes
  useEffect(() => {
    setContent(journalEntry || '');
    setSelectedDate(null); // Reset selected date when current date changes
  }, [currentDate, journalEntry]);
  
  // Handle save button click
  const handleSave = () => {
    saveJournal(content);
  };
  
  // Toggle between current entry and history view
  const toggleHistory = () => {
    setShowHistory(!showHistory);
    setSelectedDate(null); // Reset selected date when toggling view
  };
  
  // Handle selecting a date from history
  const selectDate = (date) => {
    setSelectedDate(date);
    setContent(journalEntries[date] || '');
  };
  
  // Get sorted dates from journal entries
  const getSortedDates = () => {
    return Object.keys(journalEntries).sort((a, b) => new Date(b) - new Date(a));
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get preview text (first 60 characters)
  const getPreviewText = (text) => {
    if (!text) return 'No content';
    return text.length > 60 ? text.substring(0, 60) + '...' : text;
  };
  
  // Get current entry date display
  const getCurrentDateDisplay = () => {
    if (selectedDate) {
      return formatDate(selectedDate);
    }
    return currentDate.toLocaleDateString(undefined, { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Count total entries
  const totalEntries = Object.keys(journalEntries).length;
  
  // Display selected entry or current day's entry
  const displayCurrentEntry = () => (
    <div className="journal-current-entry">
      <div className="journal-entry-header">
        <div className="journal-date">{getCurrentDateDisplay()}</div>
        <div className="journal-actions">
          <button 
            className="history-toggle" 
            onClick={toggleHistory}
            title="View journal history"
          >
            View History ({totalEntries})
          </button>
        </div>
      </div>
      
      <textarea
        value={content || ''}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Record your victories, challenges, and lessons from today's journey. Reflecting on your emotions and team interactions will improve your Character Stats..."
        rows="8"
      ></textarea>
      
      <div className="journal-footer">
        <div className="journal-xp">+20 XP for daily entry</div>
        {!selectedDate && (
          <button 
            onClick={handleSave} 
            disabled={!content.trim()}
          >
            Save Entry
          </button>
        )}
        {selectedDate && (
          <button 
            onClick={() => setSelectedDate(null)}
            className="return-button"
          >
            Return to Today
          </button>
        )}
      </div>
    </div>
  );
  
  // Display history of all entries
  const displayHistory = () => (
    <div className="journal-history">
      <div className="history-header">
        <h4>Chronicle History</h4>
        <button 
          className="history-toggle" 
          onClick={toggleHistory}
        >
          Return to Today
        </button>
      </div>
      
      {getSortedDates().length === 0 ? (
        <div className="empty-history">
          <p>No journal entries recorded yet.</p>
          <p>Begin your chronicle by writing your first entry.</p>
        </div>
      ) : (
        <div className="entry-list">
          {getSortedDates().map(date => (
            <div 
              key={date} 
              className="history-entry"
              onClick={() => selectDate(date)}
            >
              <div className="entry-date">{formatDate(date)}</div>
              <div className="entry-preview">{getPreviewText(journalEntries[date])}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  return (
    <section className="section journal-section">
      <h3>Templar's Chronicle</h3>
      
      {showHistory ? displayHistory() : displayCurrentEntry()}
    </section>
  );
}

export default Journal;