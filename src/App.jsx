// src/App.js - Updated with restart functionality
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import JourneyMap from './components/JourneyMap';
import DailySchedule from './components/DailySchedule';
import WeekendActivities from './components/WeekendActivities';
import CurrentQuest from './components/CurrentQuest';
import Journal from './components/Journal';
import CharacterStats from './components/CharacterStats';
import Onboarding from './components/Onboarding';
import { timeBlocks, weekendTasks, weeklyQuests } from './data';
import { calculateStats, getExperienceFromActivities } from './utils/calculations';
import './index.css';

function App() {
  // Check if first time user
  const [isFirstTime, setIsFirstTime] = useState(localStorage.getItem('templarOnboarded') !== 'true');
  
  // Game settings with defaults
  const [gameSettings, setGameSettings] = useState(() => {
    const saved = localStorage.getItem('templarSettings');
    if (saved) return JSON.parse(saved);
    
    // Default settings if none exist
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 70); // Default to 70 days (10 weeks)
    
    return {
      startDate: today.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      characterName: 'Kaelan Dawnblade',
      initialized: false
    };
  });

  // Current date and view
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showOnboarding, setShowOnboarding] = useState(isFirstTime);
  
  // Game state
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem('templarGameState');
    if (saved) return JSON.parse(saved);
    
    return {
      experience: 0,
      level: 1,
      completedBlocks: {}, // date: [blockIds]
      completedWeekendTasks: {}, // date: [taskIds]
      journalEntries: {},  // date: content
      achievements: [],    // list of achievement ids
      lastCompletedWeek: 0,
      currentWeek: 1,
      challengesCompleted: {} // week: [challengeIds]
    };
  });
  
  // Stat calculation (automatic)
  const stats = calculateStats(gameState, gameSettings);
  
  // Current date in ISO format for lookups
  const dateString = currentDate.toISOString().split('T')[0];
  
  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (gameSettings.initialized) {
      localStorage.setItem('templarSettings', JSON.stringify(gameSettings));
      localStorage.setItem('templarGameState', JSON.stringify(gameState));
    }
  }, [gameState, gameSettings]);
  
  // Calculate current week based on start date and today
  useEffect(() => {
    if (gameSettings.initialized) {
      const startDate = new Date(gameSettings.startDate);
      const endDate = new Date(gameSettings.endDate);
      const today = new Date();
      
      // Calculate total journey duration and progress
      const totalDuration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const elapsedDays = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
      
      // Calculate current week (10 weeks total journey)
      const weekDuration = totalDuration / 10;
      const currentWeek = Math.min(10, Math.max(1, Math.ceil(elapsedDays / weekDuration)));
      
      setGameState(prev => ({
        ...prev,
        currentWeek: currentWeek
      }));
    }
  }, [currentDate, gameSettings]);
  
  // Complete onboarding
  const completeOnboarding = (settings) => {
    setGameSettings({
      ...settings,
      initialized: true
    });
    setShowOnboarding(false);
    localStorage.setItem('templarOnboarded', 'true');
  };
  
  // Handle complete restart of journey
  const handleRestartJourney = () => {
    // Clear all localStorage items
    localStorage.removeItem('templarOnboarded');
    localStorage.removeItem('templarSettings');
    localStorage.removeItem('templarGameState');
    
    // Reset to default state
    setIsFirstTime(true);
    setShowOnboarding(true);
    
    // Reset game settings
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 70);
    
    setGameSettings({
      startDate: today.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      characterName: 'Kaelan Dawnblade',
      initialized: false
    });
    
    // Reset game state
    setGameState({
      experience: 0,
      level: 1,
      completedBlocks: {},
      completedWeekendTasks: {},
      journalEntries: {},
      achievements: [],
      lastCompletedWeek: 0,
      currentWeek: 1,
      challengesCompleted: {}
    });
  };
  
  // Check if current date is a weekend
  const isWeekend = () => {
    const date = new Date(dateString);
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    return day === 0 || day === 6;
  };
  
  // Handle completing a time block
  const handleCompleteBlock = (blockId) => {
    const dateKey = dateString;
    const updatedBlocks = { ...gameState.completedBlocks };
    
    if (!updatedBlocks[dateKey]) {
      updatedBlocks[dateKey] = [];
    }
    
    let updatedExperience = gameState.experience;
    
    if (!updatedBlocks[dateKey].includes(blockId)) {
      // Add block to completed
      updatedBlocks[dateKey] = [...updatedBlocks[dateKey], blockId];
      
      // Calculate XP gained
      const block = timeBlocks.find(b => b.id === blockId);
      const xpGained = getExperienceFromActivities(block.activity);
      updatedExperience += xpGained;
    } else {
      // Remove block from completed
      updatedBlocks[dateKey] = updatedBlocks[dateKey].filter(id => id !== blockId);
      
      // Calculate XP lost
      const block = timeBlocks.find(b => b.id === blockId);
      const xpLost = getExperienceFromActivities(block.activity);
      updatedExperience = Math.max(0, updatedExperience - xpLost);
    }
    
    // Calculate new level
    const newLevel = Math.floor(updatedExperience / 100) + 1;
    
    setGameState(prev => ({
      ...prev,
      completedBlocks: updatedBlocks,
      experience: updatedExperience,
      level: newLevel
    }));
  };
  
  // Handle completing a weekend task
  const handleCompleteWeekendTask = (taskId) => {
    if (!isWeekend()) return; // Can only complete weekend tasks on weekends
    
    const dateKey = dateString;
    const updatedTasks = { ...gameState.completedWeekendTasks };
    
    if (!updatedTasks[dateKey]) {
      updatedTasks[dateKey] = [];
    }
    
    let updatedExperience = gameState.experience;
    
    if (!updatedTasks[dateKey].includes(taskId)) {
      // Add task to completed
      updatedTasks[dateKey] = [...updatedTasks[dateKey], taskId];
      
      // Calculate XP gained
      const task = weekendTasks.find(t => t.id === taskId);
      const xpGained = getExperienceFromActivities(task.activity);
      updatedExperience += xpGained;
    } else {
      // Remove task from completed
      updatedTasks[dateKey] = updatedTasks[dateKey].filter(id => id !== taskId);
      
      // Calculate XP lost
      const task = weekendTasks.find(t => t.id === taskId);
      const xpLost = getExperienceFromActivities(task.activity);
      updatedExperience = Math.max(0, updatedExperience - xpLost);
    }
    
    // Calculate new level
    const newLevel = Math.floor(updatedExperience / 100) + 1;
    
    setGameState(prev => ({
      ...prev,
      completedWeekendTasks: updatedTasks,
      experience: updatedExperience,
      level: newLevel
    }));
  };

  // Save journal entry
  const saveJournal = (content) => {
    if (content.trim() === '') return;
    
    // Calculate XP difference if this is a new entry vs updating
    const existingEntry = gameState.journalEntries[dateString];
    const xpChange = existingEntry ? 0 : 20; // 20 XP for new entries
    
    setGameState(prev => ({
      ...prev,
      journalEntries: {
        ...prev.journalEntries,
        [dateString]: content
      },
      experience: prev.experience + xpChange,
      level: Math.floor((prev.experience + xpChange) / 100) + 1
    }));
  };
  
  // Complete a challenge
  const completeChallenge = (weekNumber, challengeId, completed) => {
    const updatedChallenges = { ...gameState.challengesCompleted };
    
    if (!updatedChallenges[weekNumber]) {
      updatedChallenges[weekNumber] = [];
    }
    
    let xpChange = 0;
    
    if (completed && !updatedChallenges[weekNumber].includes(challengeId)) {
      // Add challenge to completed
      updatedChallenges[weekNumber] = [...updatedChallenges[weekNumber], challengeId];
      xpChange = 25; // 25 XP per challenge
    } else if (!completed && updatedChallenges[weekNumber].includes(challengeId)) {
      // Remove challenge from completed
      updatedChallenges[weekNumber] = updatedChallenges[weekNumber].filter(id => id !== challengeId);
      xpChange = -25;
    }
    
    // Get weekly challenges count
    const weekChallenges = weeklyQuests[weekNumber - 1].challenges.length;
    
    // Check if all challenges for the week are now completed
    const allChallengesCompleted = updatedChallenges[weekNumber]?.length === weekChallenges;
    let weekCompletionXP = 0;
    let lastCompletedWeek = gameState.lastCompletedWeek;
    
    // If all challenges completed and week not previously completed, award week completion bonus
    if (allChallengesCompleted && weekNumber > gameState.lastCompletedWeek) {
      weekCompletionXP = 100; // 100 XP bonus for completing a week
      lastCompletedWeek = weekNumber;
    }
    
    setGameState(prev => ({
      ...prev,
      challengesCompleted: updatedChallenges,
      lastCompletedWeek: lastCompletedWeek,
      experience: Math.max(0, prev.experience + xpChange + weekCompletionXP),
      level: Math.floor((Math.max(0, prev.experience + xpChange + weekCompletionXP)) / 100) + 1
    }));
  };
  
  // Reset the current day
  const resetCurrentDay = () => {
    if (window.confirm("Are you sure you want to reset today's progress? This will clear all completed blocks, weekend tasks, and your journal entry for today.")) {
      // Calculate XP to remove
      const todayBlocks = gameState.completedBlocks[dateString] || [];
      let xpToRemove = 0;
      
      // Calculate XP from each completed block
      todayBlocks.forEach(blockId => {
        const block = timeBlocks.find(b => b.id === blockId);
        xpToRemove += getExperienceFromActivities(block.activity);
      });
      
      // Calculate XP from weekend tasks
      const todayWeekendTasks = gameState.completedWeekendTasks[dateString] || [];
      todayWeekendTasks.forEach(taskId => {
        const task = weekendTasks.find(t => t.id === taskId);
        xpToRemove += getExperienceFromActivities(task.activity);
      });
      
      // Add XP from journal if it exists
      const journalXpToRemove = gameState.journalEntries[dateString] ? 20 : 0;
      
      // Update game state
      const updatedBlocks = { ...gameState.completedBlocks };
      delete updatedBlocks[dateString];
      
      const updatedWeekendTasks = { ...gameState.completedWeekendTasks };
      delete updatedWeekendTasks[dateString];
      
      const updatedJournal = { ...gameState.journalEntries };
      delete updatedJournal[dateString];
      
      const updatedXP = Math.max(0, gameState.experience - xpToRemove - journalXpToRemove);
      
      setGameState(prev => ({
        ...prev,
        completedBlocks: updatedBlocks,
        completedWeekendTasks: updatedWeekendTasks,
        journalEntries: updatedJournal,
        experience: updatedXP,
        level: Math.floor(updatedXP / 100) + 1
      }));
    }
  };

  // If onboarding is needed, show that instead
  if (showOnboarding) {
    return <Onboarding completeOnboarding={completeOnboarding} />;
  }

    const getActiveTimeBlocks = () => {
  if (gameSettings.useCustomTimetable && gameSettings.customTimeBlocks && gameSettings.customTimeBlocks.length > 0) {
    return gameSettings.customTimeBlocks;
  }
  return timeBlocks;
};

// Then, when rendering the DailySchedule component, update it to use the active timeblocks

<DailySchedule 
  timeBlocks={getActiveTimeBlocks()}
  dateString={dateString}
  completedBlocks={gameState.completedBlocks[dateString] || []}
  handleCompleteBlock={handleCompleteBlock}
  resetCurrentDay={resetCurrentDay}
/>

// And if you're showing weekend activities together with the daily schedule:

{isWeekend() && (
  <DailySchedule 
    timeBlocks={getActiveTimeBlocks()}
    dateString={dateString}
    completedBlocks={gameState.completedBlocks[dateString] || []}
    handleCompleteBlock={handleCompleteBlock}
    resetCurrentDay={resetCurrentDay}
    isSecondary={true}
  />
)}

  return (
    <div className="app-container">
      <Header 
        characterName={gameSettings.characterName}
        level={gameState.level} 
        experience={gameState.experience} 
        stats={stats}
        handleRestartJourney={handleRestartJourney}
      />

      <main className="app-content">
        <div className="journey-column">
          <JourneyMap 
            gameState={gameState}
            gameSettings={gameSettings}
            currentDate={currentDate}
          />
          
          <CharacterStats stats={stats} />
        </div>

        <div className="activity-column">
          {isWeekend() ? (
            <WeekendActivities 
              dateString={dateString}
              completedTasks={gameState.completedWeekendTasks[dateString] || []}
              handleCompleteTask={handleCompleteWeekendTask}
            />
          ) : (
            <DailySchedule 
              timeBlocks={timeBlocks}
              dateString={dateString}
              completedBlocks={gameState.completedBlocks[dateString] || []}
              handleCompleteBlock={handleCompleteBlock}
              resetCurrentDay={resetCurrentDay}
            />
          )}
          
          {isWeekend() && (
            <DailySchedule 
              timeBlocks={timeBlocks}
              dateString={dateString}
              completedBlocks={gameState.completedBlocks[dateString] || []}
              handleCompleteBlock={handleCompleteBlock}
              resetCurrentDay={resetCurrentDay}
              isSecondary={true}
            />
          )}
        </div>

        <div className="quest-column">
          <CurrentQuest 
            currentWeek={gameState.currentWeek}
            challengesCompleted={gameState.challengesCompleted[gameState.currentWeek] || []}
            completeChallenge={completeChallenge}
            weeklyQuests={weeklyQuests}
          />

            <Journal 
            currentDate={currentDate}
            journalEntries={gameState.journalEntries}
            journalEntry={gameState.journalEntries[dateString] || ''}
            saveJournal={saveJournal}
          />
        </div>
      </main>
    </div>
  );
}

export default App;