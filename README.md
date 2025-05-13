# LevelUp

A gamified productivity and personal development application that transforms your daily routine into an epic hero's journey. As Kaelan Dawnblade, you'll progress through a 10-week quest to overcome your four great challenges and become an Ascended Arbiter.

## Features

### Character Development
- Progress from Templar Initiate to Ascended Arbiter through 10 levels
- Develop four virtues that evolve automatically based on your activity:
  - **Mental Clarity**: Combat overthinking through mindfulness and focus
  - **Consistency**: Build discipline through regular practice
  - **Emotional Intelligence**: Develop awareness of emotions and connection with others
  - **Interdependence**: Balance independence with effective teamwork

### Customizable Journey
- Set your own start and end dates (70-90 days journey)
- Create a custom daily schedule or use the default timetable
- Restart your journey at any time if you want a fresh beginning

### Daily Tracking System
- Complete time blocks throughout your day to earn XP
- Weekend activities for flexible skill development
- Visual completion indicators and progress tracking
- Reset today's progress if needed

### Quest System
- Weekly challenges that progress your character development
- Each week represents a stage in your hero's journey
- Earn bonus XP for completing all weekly challenges
- Unlock achievements for significant milestones

### Templar's Chronicle
- Journal system to record your thoughts and reflections
- Complete history view of all past entries
- Emotional content in journal entries improves your stats
- Earn XP for consistent journaling

### Visual Progress Tracking
- Journey map showing your progression through weeks
- Flame Covenant Calendar highlighting days of activity
- Level and experience progress bar
- Detailed stat descriptions that evolve with your growth

## Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/LevelUp.git
cd LevelUp
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Technical Overview

- **Frontend**: React + Vite
- **State Management**: React Hooks & Context
- **Data Persistence**: LocalStorage
- **Styling**: Custom CSS with variables for theming
- **Routing**: React Router
- **Calendar**: react-calendar component

## Project Structure

```
templars-ascension/
├── src/
│   ├── components/            # UI components
│   │   ├── CharacterStats.jsx # Character stats display
│   │   ├── DailySchedule.jsx  # Daily activities tracking
│   │   ├── Header.jsx         # App header with character info
│   │   ├── Journal.jsx        # Journaling system
│   │   ├── JourneyMap.jsx     # Visual progress tracking
│   │   ├── Onboarding.jsx     # Initial setup wizard
│   │   └── ...
│   ├── utils/                 # Utility functions
│   │   └── calculations.js    # Stat calculation algorithms
│   ├── data.js                # Time blocks and weekly quests
│   ├── App.jsx                # Main application component
│   ├── index.css              # Global styles
│   └── main.jsx               # Application entry point
└── package.json               # Dependencies and scripts
```

## Usage

1. Complete the onboarding process to set up your journey
2. Follow your daily schedule and check off completed activities
3. Complete weekly challenges to progress through your journey
4. Journal regularly to improve your character stats
5. Watch as your character transforms from Initiate to Ascended Arbiter

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## License

[MIT](LICENSE)

## Acknowledgments

This project was inspired by the concept of gamifying personal development and productivity. It combines RPG character progression with habit tracking to create a meaningful journey toward self-improvement.

---

*"The path to mastery is walked one step at a time, with many missteps along the way. It is the rising after each fall that forges the Arbiter's spirit."* - Templar Wisdom
