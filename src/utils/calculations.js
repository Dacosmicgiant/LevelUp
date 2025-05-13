// src/utils/calculations.js - Updated to include weekend tasks calculation

// Calculate experience from different activities
export const getExperienceFromActivities = (activity) => {
  const activityXP = {
    // Daily schedule activities
    "Exercise": 15,
    "Freshen up + breakfast": 5,
    "Intellect": 20,
    "Mindfulness Break": 10,
    "DSA + Aptitude": 20,
    "Reflection Break": 10,
    "Minor Projects": 15,
    "Lunch": 5,
    "Team Communication": 15,
    "Major Project": 25,
    "Fresh Air Break": 8,
    "Rest": 5,
    "DSA": 15,
    "Aptitude": 10,
    "Team Planning": 15,
    "Dinner": 5,
    
    // Weekend activities
    "Project Review": 25,
    "Code Refactoring": 20,
    "Learning New Technology": 20,
    "Templar Meditation": 15,
    "Team Retrospective": 25,
    "Documentation": 15,
    "Physical Training": 15,
    "Strategic Planning": 20
  };
  
  return activityXP[activity] || 10; // Default 10 XP for any unlisted activity
};

// Calculate the four character stats based on user activity
export const calculateStats = (gameState, gameSettings) => {
  const { completedBlocks, completedWeekendTasks, journalEntries, challengesCompleted, lastCompletedWeek } = gameState;
  
  // Helper function to get all days with any activity
  const getActiveDays = () => {
    const days = new Set();
    
    // Add days with completed blocks
    Object.keys(completedBlocks).forEach(day => {
      if (completedBlocks[day].length > 0) {
        days.add(day);
      }
    });
    
    // Add days with weekend tasks
    Object.keys(completedWeekendTasks).forEach(day => {
      if (completedWeekendTasks[day].length > 0) {
        days.add(day);
      }
    });
    
    // Add days with journal entries
    Object.keys(journalEntries).forEach(day => {
      days.add(day);
    });
    
    return Array.from(days).sort();
  };
  
  // Get all active days
  const activeDays = getActiveDays();
  
  // Calculate Mental Clarity (1-10)
  // Based on: 
  // 1. Recent journal entries (quality and frequency)
  // 2. Completing meditation/break activities
  const calculateMentalClarity = () => {
    let score = 1; // Base score
    
    // Check recent journaling (last 7 days)
    const recentDays = 7;
    const today = new Date();
    let journalCount = 0;
    
    for (let i = 0; i < recentDays; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      if (journalEntries[dateStr]) {
        journalCount++;
        
        // Bonus for detailed journal entries
        const entryLength = journalEntries[dateStr].length;
        if (entryLength > 100) score += 0.2;
        if (entryLength > 250) score += 0.3;
      }
    }
    
    // Journal consistency
    score += (journalCount / recentDays) * 3;
    
    // Break/meditation completion
    let breakBlocks = 0;
    let totalBreakBlocks = 0;
    
    Object.keys(completedBlocks).forEach(day => {
      completedBlocks[day].forEach(blockId => {
        // If block is a break activity (ID 4, 6, 10, 12, 19)
        if ([4, 6, 12].includes(blockId)) {
          breakBlocks++;
        }
      });
      
      // Count recent break opportunities (last 7 days)
      const blockDate = new Date(day);
      const daysDiff = Math.floor((today - blockDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff < recentDays) {
        totalBreakBlocks += 3; // 3 break blocks per day
      }
    });
    
    // Weekend meditation tasks
    Object.keys(completedWeekendTasks).forEach(day => {
      completedWeekendTasks[day].forEach(taskId => {
        // Templar Meditation (ID 25)
        if (taskId === 25) {
          breakBlocks += 2; // Worth more than regular breaks
        }
      });
    });
    
    // Break completion ratio
    if (totalBreakBlocks > 0) {
      score += (breakBlocks / totalBreakBlocks) * 4;
    }
    
    // Challenge completions that boost mental clarity
    // Check week 1 challenges (index 0)
    if (challengesCompleted[1]?.includes(0)) score += 0.5; // Week 1 meditation challenge
    if (challengesCompleted[4]?.includes(0)) score += 0.5; // Week 4 focus rating challenge
    if (challengesCompleted[6]?.includes(0)) score += 0.5; // Week 7 skill alternation challenge
    
    // Cap score between 1-10
    return Math.min(10, Math.max(1, Math.round(score)));
  };
  
  // Calculate Consistency (1-10)
  // Based on:
  // 1. Streak of days with activities
  // 2. Percentage of schedule followed
  // 3. Completed consistency challenges
  const calculateConsistency = () => {
    let score = 1; // Base score
    
    // Check for streaks
    let currentStreak = 0;
    let maxStreak = 0;
    
    if (activeDays.length > 0) {
      const sortedDays = [...activeDays].sort();
      
      // Calculate current streak
      const today = new Date().toISOString().split('T')[0];
      let checkDate = new Date(today);
      currentStreak = 0;
      
      while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        
        if (sortedDays.includes(dateStr)) {
          currentStreak++;
        } else {
          break;
        }
        
        // Move to previous day
        checkDate.setDate(checkDate.getDate() - 1);
      }
      
      // Calculate max streak
      let streak = 1;
      for (let i = 1; i < sortedDays.length; i++) {
        const prevDate = new Date(sortedDays[i-1]);
        const currDate = new Date(sortedDays[i]);
        const dayDiff = Math.round((currDate - prevDate) / (1000 * 60 * 60 * 24));
        
        if (dayDiff === 1) {
          streak++;
        } else {
          if (streak > maxStreak) {
            maxStreak = streak;
          }
          streak = 1;
        }
      }
      
      if (streak > maxStreak) {
        maxStreak = streak;
      }
    }
    
    // Add streak bonus to score
    score += Math.min(4, maxStreak / 3); // Up to +4 for 12+ day streak
    
    // Schedule completion rate for recent days
    const recentDays = Math.min(activeDays.length, 10); // Look at last 10 active days max
    let totalBlocks = 0;
    let completedBlocksCount = 0;
    
    for (let i = 0; i < recentDays; i++) {
      const day = activeDays[activeDays.length - 1 - i];
      
      // Check if weekend
      const date = new Date(day);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      
      if (isWeekend) {
        // Weekend has 8 possible tasks
        totalBlocks += 8;
        completedBlocksCount += completedWeekendTasks[day]?.length || 0;
      } else {
        // Weekday has 21 time blocks
        totalBlocks += 21;
        completedBlocksCount += completedBlocks[day]?.length || 0;
      }
    }
    
    // Add completion rate bonus
    if (totalBlocks > 0) {
      const completionRate = completedBlocksCount / totalBlocks;
      score += completionRate * 4; // Up to +4 for 100% completion
    }
    
    // Challenge completions that boost consistency
    if (challengesCompleted[1]?.includes(1)) score += 0.3; // Week 2 daily accomplishment challenge
    if (challengesCompleted[3]?.includes(3)) score += 0.5; // Week 4 unbroken chain achievement
    if (lastCompletedWeek >= 3) score += 0.5; // Completed 3+ weeks
    if (lastCompletedWeek >= 5) score += 0.7; // Completed 5+ weeks
    
    // Cap score between 1-10
    return Math.min(10, Math.max(1, Math.round(score)));
  };
  
  // Calculate Emotional Intelligence (1-10)
  // Based on:
  // 1. Journaling depth and emotional content
  // 2. Team-related challenges completed
  // 3. Major project completions (team work)
  const calculateEmotionalIntelligence = () => {
    let score = 1; // Base score
    
    // Journal depth analysis - look for emotional keywords
    const emotionalKeywords = [
      'feel', 'feeling', 'felt', 'emotion', 'happy', 'sad', 'angry', 'frustrated',
      'excited', 'anxious', 'worried', 'proud', 'disappointed', 'satisfied', 'grateful',
      'challenge', 'struggle', 'overcame', 'learned', 'realized', 'understand',
      'team', 'together', 'helped', 'supported', 'listened', 'shared'
    ];
    
    let emotionalEntryCount = 0;
    let totalEntries = Object.keys(journalEntries).length;
    
    if (totalEntries > 0) {
      Object.values(journalEntries).forEach(entry => {
        const lowerEntry = entry.toLowerCase();
        
        // Check for emotional keywords
        let hasEmotionalContent = false;
        for (const keyword of emotionalKeywords) {
          if (lowerEntry.includes(keyword)) {
            hasEmotionalContent = true;
            break;
          }
        }
        
        if (hasEmotionalContent) {
          emotionalEntryCount++;
        }
      });
      
      // Add journaling emotional intelligence score
      score += (emotionalEntryCount / totalEntries) * 3; // Up to +3
    }
    
    // Check for team activities completion (team communication, team planning, major project)
    let teamBlocks = 0;
    let totalDays = Math.min(activeDays.length, 14); // Look at last 14 active days max
    
    for (let i = 0; i < totalDays; i++) {
      const day = activeDays[activeDays.length - 1 - i];
      
      // Check if team blocks were completed (ID 10, 11, 19, 20)
      if (completedBlocks[day]) {
        if (completedBlocks[day].includes(10)) teamBlocks++; // Team Communication
        if (completedBlocks[day].includes(11)) teamBlocks++; // Major Project
        if (completedBlocks[day].includes(19)) teamBlocks++; // Team Planning
        if (completedBlocks[day].includes(20)) teamBlocks++; // Major Project
      }
      
      // Check weekend team tasks (ID 22, 26)
      if (completedWeekendTasks[day]) {
        if (completedWeekendTasks[day].includes(22)) teamBlocks++; // Project Review
        if (completedWeekendTasks[day].includes(26)) teamBlocks++; // Team Retrospective
      }
    }
    
    // Add team activity bonus
    const possibleTeamBlocks = totalDays * 4; // 4 team blocks possible per day
    if (possibleTeamBlocks > 0) {
      score += (teamBlocks / possibleTeamBlocks) * 3; // Up to +3
    }
    
    // Challenge completions that boost emotional intelligence
    if (challengesCompleted[1]?.includes(2)) score += 0.5; // Week 2 active listening challenge
    if (challengesCompleted[2]?.includes(1)) score += 0.5; // Week 3 sharing concerns/excitement
    if (challengesCompleted[4]?.includes(2)) score += 0.5; // Week 5 structured feedback session
    if (challengesCompleted[5]?.includes(2)) score += 0.5; // Week 6 team check-ins
    
    // Completed weeks bonus
    if (lastCompletedWeek >= 4) score += 0.5; // Completed 4+ weeks
    if (lastCompletedWeek >= 7) score += 0.5; // Completed 7+ weeks
    
    // Cap score between 1-10
    return Math.min(10, Math.max(1, Math.round(score)));
  };
  
  // Calculate Interdependence (1-10)
  // Based on:
  // 1. Team delegation challenges completed
  // 2. Balance between individual and team activities
  // 3. Seeking feedback activities
  const calculateInterdependence = () => {
    let score = 1; // Base score
    
    // Challenge completions that directly boost interdependence
    if (challengesCompleted[2]?.includes(3)) score += 0.7; // Week 3 assign responsibilities
    if (challengesCompleted[4]?.includes(0)) score += 0.7; // Week 5 asking for assistance
    if (challengesCompleted[4]?.includes(1)) score += 0.7; // Week 5 asking questions
    if (challengesCompleted[6]?.includes(2)) score += 0.7; // Week 7 delegating responsibility
    
    // Check for balance between individual and team activities
    let individualBlocks = 0;
    let teamBlocks = 0;
    let totalDays = Math.min(activeDays.length, 10); // Look at last 10 active days max
    
    for (let i = 0; i < totalDays; i++) {
      const day = activeDays[activeDays.length - 1 - i];
      
      // Count completed blocks by category
      if (completedBlocks[day]) {
        completedBlocks[day].forEach(blockId => {
          const block = getBlockById(blockId);
          if (block) {
            if (block.category === 'individual') {
              individualBlocks++;
            } else if (block.category === 'team') {
              teamBlocks++;
            }
          }
        });
      }
      
      // Count completed weekend tasks by category
      if (completedWeekendTasks[day]) {
        completedWeekendTasks[day].forEach(taskId => {
          const task = getWeekendTaskById(taskId);
          if (task) {
            if (task.category === 'individual') {
              individualBlocks++;
            } else if (task.category === 'team') {
              teamBlocks++;
            }
          }
        });
      }
    }
    
    // Calculate balance ratio - ideal is around 70% individual, 30% team
    const totalBlocks = individualBlocks + teamBlocks;
    if (totalBlocks > 0) {
      const teamRatio = teamBlocks / totalBlocks;
      
      // Optimum score at 0.3 ratio, decreasing as it moves away from that
      const balanceScore = 3 - Math.abs(0.3 - teamRatio) * 10;
      score += Math.max(0, balanceScore);
    }
    
    // Weekly progression
    score += Math.min(3, lastCompletedWeek * 0.3); // Up to +3 for completing weeks
    
    // Journal mentions of team and collaboration
    const teamKeywords = [
      'team', 'together', 'collaborate', 'help', 'assist', 'support', 'delegate',
      'ask', 'share', 'feedback', 'advice', 'others', 'group', 'member'
    ];
    
    let teamMentionCount = 0;
    let totalEntries = Object.keys(journalEntries).length;
    
    if (totalEntries > 0) {
      Object.values(journalEntries).forEach(entry => {
        const lowerEntry = entry.toLowerCase();
        
        // Check for team keywords
        let hasTeamMention = false;
        for (const keyword of teamKeywords) {
          if (lowerEntry.includes(keyword)) {
            hasTeamMention = true;
            break;
          }
        }
        
        if (hasTeamMention) {
          teamMentionCount++;
        }
      });
      
      // Add team mention score
      score += (teamMentionCount / totalEntries) * 2;
    }
    
    // Cap score between 1-10
    return Math.min(10, Math.max(1, Math.round(score)));
  };
  
  // Helper function to get block by ID
  const getBlockById = (id) => {
    // This would need to be imported from your data
    // For now, we'll use a simplified version
    const blockCategories = {
      3: 'individual', 5: 'individual', 7: 'individual', 9: 'individual',
      13: 'individual', 16: 'individual', 18: 'individual', 21: 'individual',
      10: 'team', 11: 'team', 19: 'team', 20: 'team'
    };
    
    return { category: blockCategories[id] || 'other' };
  };
  
  // Helper function to get weekend task by ID
  const getWeekendTaskById = (id) => {
    // This would need to be imported from your data
    // For now, we'll use a simplified version
    const taskCategories = {
      22: 'team', 26: 'team',
      23: 'individual', 24: 'individual', 27: 'individual', 29: 'individual',
      25: 'mental', 28: 'physical'
    };
    
    return { category: taskCategories[id] || 'other' };
  };
  
  // Calculate all stats
  return {
    mentalClarity: calculateMentalClarity(),
    consistency: calculateConsistency(),
    emotionalIntelligence: calculateEmotionalIntelligence(),
    interdependence: calculateInterdependence()
  };
};

// Get character title based on level and stats
export const getCharacterTitle = (level, stats) => {
  if (level >= 10) return "Ascended Arbiter";
  
  if (level >= 7) {
    // Specialization based on highest stat
    const highestStat = Object.entries(stats).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    
    switch (highestStat) {
      case 'mentalClarity':
        return "Templar Sage";
      case 'consistency':
        return "Templar Guardian";
      case 'emotionalIntelligence':
        return "Templar Empath";
      case 'interdependence':
        return "Templar Unifier";
      default:
        return "Templar Sage";
    }
  }
  
  if (level >= 4) return "Templar Knight";
  
  return "Templar Initiate";
};