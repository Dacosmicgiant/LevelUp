// src/components/WeekendActivities.js
// New component to display and track weekend activities
import React from 'react';
import { weekendTasks } from '../data';
import { getExperienceFromActivities } from '../utils/calculations';

function WeekendActivities({ dateString, completedTasks, handleCompleteTask }) {
  // Check if today is a weekend day
  const isWeekend = () => {
    const date = new Date(dateString);
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    return day === 0 || day === 6;
  };
  
  // Calculate completion percentage
  const getCompletionPercentage = () => {
    return Math.round((completedTasks.length / weekendTasks.length) * 100);
  };
  
  // Group tasks by category for better organization
  const getTasksByCategory = () => {
    const categories = {
      team: { name: "Team Activities", tasks: [] },
      individual: { name: "Individual Growth", tasks: [] },
      mental: { name: "Mental Development", tasks: [] },
      physical: { name: "Physical Training", tasks: [] }
    };
    
    weekendTasks.forEach(task => {
      if (categories[task.category]) {
        categories[task.category].tasks.push(task);
      }
    });
    
    return Object.values(categories);
  };
  
  // If it's not weekend, show a preview message
  if (!isWeekend()) {
    return (
      <section className="section weekend-preview-section">
        <h3>Weekend Activities</h3>
        <div className="weekend-preview">
          <div className="weekend-message">
            <p>Weekend activities will be available on Saturday and Sunday.</p>
            <p>Use these flexible activities to strengthen your weakest virtues and complete your weekly challenges.</p>
          </div>
          <div className="weekend-categories">
            {getTasksByCategory().map(category => (
              <div key={category.name} className="preview-category">
                <div className="category-name">{category.name}</div>
                <div className="category-count">{category.tasks.length} activities</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="section weekend-section">
      <div className="schedule-header">
        <h3>Weekend Activities</h3>
        <div className="completion-indicator">
          <div className="completion-percentage">{getCompletionPercentage()}%</div>
        </div>
      </div>
      
      <p className="weekend-description">
        These flexible activities can be completed at any time during the weekend to supplement your growth.
        Focus on activities that strengthen your weakest virtues.
      </p>
      
      {getTasksByCategory().map(category => (
        <div key={category.name} className="activity-category">
          <h4>{category.name}</h4>
          <div className="weekend-tasks">
            {category.tasks.map(task => (
              <div 
                key={task.id} 
                className={`weekend-task ${
                  completedTasks.includes(task.id) ? 'completed' : ''
                }`}
                onClick={() => handleCompleteTask(task.id)}
              >
                <div className="activity">{task.activity}</div>
                <div className="task-xp">+{getExperienceFromActivities(task.activity)} XP</div>
                <div className="status-indicator">
                  {completedTasks.includes(task.id) ? '✓' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default WeekendActivities;