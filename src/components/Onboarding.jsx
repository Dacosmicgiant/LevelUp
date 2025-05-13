// src/components/Onboarding.js - Updated with timetable customization option
import React, { useState } from 'react';
import TimetableCustomization from './TimetableCustomization'
import { timeBlocks } from '../data';

function Onboarding({ completeOnboarding }) {
  const [step, setStep] = useState(1);
  const [settings, setSettings] = useState({
    characterName: 'Kaelan Dawnblade',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    journeyLength: 70, // Default to 70 days (10 weeks of 7 days)
    useCustomTimetable: false,
    customTimeBlocks: []
  });

  // Calculate end date based on start date and journey length
  const calculateEndDate = (startDate, days) => {
    const end = new Date(startDate);
    end.setDate(end.getDate() + parseInt(days));
    return end.toISOString().split('T')[0];
  };

  // Update settings on input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setSettings(prev => ({
        ...prev,
        [name]: checked
      }));
      return;
    }
    
    // Special handling for start date and journey length
    if (name === 'startDate' || name === 'journeyLength') {
      const journeyLength = name === 'journeyLength' ? value : settings.journeyLength;
      const startDate = name === 'startDate' ? value : settings.startDate;
      
      const endDate = calculateEndDate(startDate, journeyLength);
      
      setSettings(prev => ({
        ...prev,
        [name]: value,
        endDate: endDate
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Save custom timetable
  const saveCustomTimetable = (customBlocks) => {
    setSettings(prev => ({
      ...prev,
      customTimeBlocks: customBlocks,
      useCustomTimetable: true
    }));
    nextStep();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    completeOnboarding(settings);
  };

  // Skip timetable customization
  const skipCustomization = () => {
    setSettings(prev => ({
      ...prev,
      useCustomTimetable: false,
      customTimeBlocks: []
    }));
    nextStep();
  };

  // Handle step navigation
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // Calculate days per week based on journey length
  const getDaysPerWeek = () => {
    // We always want 10 weeks, and each week should be 7 days or less
    return Math.min(7, Math.ceil(settings.journeyLength / 10));
  };

  // Calculate number of weeks based on journey length
  const getNumberOfWeeks = () => {
    return Math.ceil(settings.journeyLength / getDaysPerWeek());
  };

  // Calculate the remaining days (last week might be shorter)
  const getRemainingDays = () => {
    return settings.journeyLength % getDaysPerWeek() || getDaysPerWeek();
  };

  // Get explanation text about the journey duration
  const getJourneyExplanation = () => {
    const daysPerWeek = getDaysPerWeek();
    const numberOfWeeks = getNumberOfWeeks();
    const remainingDays = getRemainingDays();
    
    if (numberOfWeeks === 10 && daysPerWeek === 7) {
      return `The Order has calculated that your journey will cover exactly 10 weeks, with each week lasting 7 days.`;
    } else if (numberOfWeeks === 10) {
      return `The Order has calculated that your journey will cover 10 weeks, with each week lasting ${daysPerWeek} days.`;
    } else if (numberOfWeeks > 10) {
      return `The Order has calculated that your journey will cover ${numberOfWeeks} weeks, with each week lasting ${daysPerWeek} days. The last week will be ${remainingDays} days.`;
    } else {
      // This should not happen with our constraints, but just in case
      return `The Order has calculated a special journey of ${numberOfWeeks} weeks, with ${daysPerWeek} days per week.`;
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="onboarding-header">
          <h1>Templar's Ascension</h1>
          <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 4 ? 'active' : ''}`}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="onboarding-step">
              <h2>Welcome, Templar</h2>
              <p>
                The path of the Templar Arbiter is one of growth, balance, and transformation. 
                Over the next journey, you will face challenges that will forge your character and develop your skills.
              </p>
              <p>
                Before we begin, tell us who you are, brave one.
              </p>
              <div className="form-group">
                <label htmlFor="characterName">Your Templar Name</label>
                <input 
                  type="text" 
                  id="characterName" 
                  name="characterName" 
                  value={settings.characterName} 
                  onChange={handleChange}
                  required
                  placeholder="e.g. Kaelan Dawnblade"
                />
              </div>
              <div className="onboarding-actions">
                <button type="button" onClick={nextStep} className="next-button">Continue</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="onboarding-step">
              <h2>Plan Your Journey</h2>
              <p>
                The Templar's Ascension is a 10-week trial that will transform you into the Ascended Arbiter.
                When would you like to begin this sacred path?
              </p>
              <div className="form-group">
                <label htmlFor="startDate">Journey Start Date</label>
                <input 
                  type="date" 
                  id="startDate" 
                  name="startDate" 
                  value={settings.startDate} 
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="journeyLength">Journey Length (Days)</label>
                <input 
                  type="range" 
                  id="journeyLength" 
                  name="journeyLength" 
                  min="70" 
                  max="90" 
                  step="1" 
                  value={settings.journeyLength} 
                  onChange={handleChange}
                />
                <div className="range-details">
                  <span>70 days</span>
                  <span>{settings.journeyLength} days</span>
                  <span>90 days</span>
                </div>
              </div>
              <div className="form-group">
                <label>Journey End Date: {settings.endDate}</label>
                <p className="journey-note">{getJourneyExplanation()}</p>
              </div>
              <div className="onboarding-actions">
                <button type="button" onClick={prevStep} className="back-button">Back</button>
                <button type="button" onClick={nextStep} className="next-button">Continue</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="onboarding-step">
              <h2>Customize Your Daily Schedule</h2>
              <p>
                The path of the Templar Arbiter includes a structured daily practice. 
                Would you like to use the default schedule or create your own?
              </p>
              
              <div className="schedule-options">
                <div className="option-buttons">
                  <button 
                    type="button" 
                    className="option-button" 
                    onClick={() => nextStep()}
                  >
                    Use Default Schedule
                  </button>
                  <button 
                    type="button" 
                    className="option-button custom" 
                    onClick={() => {
                      setSettings(prev => ({
                        ...prev,
                        useCustomTimetable: true
                      }));
                      setStep(3.5);
                    }}
                  >
                    Create Custom Schedule
                  </button>
                </div>
                
                <div className="schedule-preview">
                  <h4>Default Schedule Preview</h4>
                  <div className="default-schedule">
                    <div className="schedule-group">
                      <h5>Morning</h5>
                      <ul>
                        {timeBlocks.slice(0, 6).map(block => (
                          <li key={block.id}>{block.time} - {block.activity}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="schedule-group">
                      <h5>Afternoon</h5>
                      <ul>
                        {timeBlocks.slice(6, 13).map(block => (
                          <li key={block.id}>{block.time} - {block.activity}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="schedule-group">
                      <h5>Evening</h5>
                      <ul>
                        {timeBlocks.slice(13, 21).map(block => (
                          <li key={block.id}>{block.time} - {block.activity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="onboarding-actions">
                <button type="button" onClick={prevStep} className="back-button">Back</button>
              </div>
            </div>
          )}

          {step === 3.5 && (
            <div className="onboarding-step timetable-step">
              <TimetableCustomization 
                timeBlocks={timeBlocks}
                onSave={saveCustomTimetable}
              />
              <div className="onboarding-actions">
                <button type="button" onClick={prevStep} className="back-button">Back</button>
                <button type="button" onClick={skipCustomization} className="next-button">Skip Customization</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="onboarding-step">
              <h2>The Templar's Oath</h2>
              <div className="templar-oath">
                <p>
                  I, <strong>{settings.characterName}</strong>, do solemnly swear to follow the Templar's path with dedication and honor.
                </p>
                <p>
                  I will face my four great challenges - overthinking, inconsistency, emotional distance, and excessive independence - 
                  with courage and determination.
                </p>
                <p>
                  I commit to this journey from <strong>{new Date(settings.startDate).toLocaleDateString()}</strong> to <strong>{new Date(settings.endDate).toLocaleDateString()}</strong>, 
                  a sacred period of transformation.
                </p>
                <p>
                  With each completed task, each journal entry, and each challenge overcome, I will forge my character and grow stronger.
                </p>
                <p>
                  I understand that true strength comes not from solitary perfection, 
                  but from consistent practice, emotional awareness, and the wisdom to collaborate with others.
                </p>
                <p>
                  May the Order witness my oath and guide my path to becoming the Ascended Arbiter.
                </p>
              </div>
              <div className="onboarding-actions">
                <button type="button" onClick={prevStep} className="back-button">Back</button>
                <button type="submit" className="submit-button">Begin My Journey</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Onboarding;