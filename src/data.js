// src/data.js - Enhanced with more tasks to accommodate proper 7-day weeks

// Time blocks for the schedule
export const timeBlocks = [
  // Morning Blocks (6:00 AM - 12:00 PM)
  { id: 1, time: "06:00 - 07:00", activity: "Exercise", category: "physical" },
  { id: 2, time: "07:00 - 08:00", activity: "Freshen up + breakfast", category: "selfCare" },
  { id: 3, time: "08:00 - 09:30", activity: "Intellect", category: "individual" },
  { id: 4, time: "09:30 - 10:00", activity: "Mindfulness Break", category: "mental" },
  { id: 5, time: "10:00 - 11:30", activity: "DSA + Aptitude", category: "individual" },
  { id: 6, time: "11:30 - 12:00", activity: "Reflection Break", category: "mental" },

  // Afternoon Blocks (12:00 PM - 6:00 PM)
  { id: 7, time: "12:00 - 01:00", activity: "Minor Projects", category: "individual" },
  { id: 8, time: "01:00 - 01:30", activity: "Lunch", category: "selfCare" },
  { id: 9, time: "01:30 - 02:00", activity: "Minor Projects", category: "individual" },
  { id: 10, time: "02:00 - 02:30", activity: "Team Communication", category: "team" },
  { id: 11, time: "02:30 - 04:00", activity: "Major Project", category: "team" },
  { id: 12, time: "04:00 - 04:30", activity: "Fresh Air Break", category: "mental" },
  { id: 13, time: "04:30 - 06:00", activity: "Intellect", category: "individual" },

  // Evening Blocks (6:00 PM - 12:00 AM)
  { id: 14, time: "06:00 - 07:00", activity: "Exercise", category: "physical" },
  { id: 15, time: "07:00 - 07:30", activity: "Rest", category: "selfCare" },
  { id: 16, time: "07:30 - 08:30", activity: "DSA", category: "individual" },
  { id: 17, time: "08:30 - 09:00", activity: "Dinner", category: "selfCare" },
  { id: 18, time: "09:00 - 09:30", activity: "Aptitude", category: "individual" },
  { id: 19, time: "09:30 - 10:00", activity: "Team Planning", category: "team" },
  { id: 20, time: "10:00 - 11:30", activity: "Major Project", category: "team" },
  { id: 21, time: "11:30 - 12:00", activity: "Minor Projects", category: "individual" }
];

// Additional weekend tasks to better distribute the schedule
export const weekendTasks = [
  { id: 22, time: "Flexible", activity: "Project Review", category: "team" },
  { id: 23, time: "Flexible", activity: "Code Refactoring", category: "individual" },
  { id: 24, time: "Flexible", activity: "Learning New Technology", category: "individual" },
  { id: 25, time: "Flexible", activity: "Templar Meditation", category: "mental" },
  { id: 26, time: "Flexible", activity: "Team Retrospective", category: "team" },
  { id: 27, time: "Flexible", activity: "Documentation", category: "individual" },
  { id: 28, time: "Flexible", activity: "Physical Training", category: "physical" },
  { id: 29, time: "Flexible", activity: "Strategic Planning", category: "individual" }
];

// Weekly quests with enhanced challenges
export const weeklyQuests = [
  {
    week: 1,
    title: "The Call to Adventure",
    description: "Establish your daily ritual and begin to recognize your patterns.",
    challenges: [
      "Practice the 'Breath of Four Realms' meditation during each break",
      "Create a visual progress tracker for your Intellect app",
      "Document each team member's strengths in your Arbiter's Codex",
      "Complete at least one Team Communication or Team Planning session",
      "Begin journaling daily, recording both victories and challenges",
      "Identify three common distractions that pull you from your focus",
      "On the weekend, complete at least one Project Review session"
    ]
  },
  {
    week: 2,
    title: "Forging the Foundation",
    description: "Build consistency and record your accomplishments.",
    challenges: [
      "Record one specific accomplishment in your journal each day",
      "Create a symbol or note for each algorithm you master",
      "Hold a team meeting where you practice active listening more than speaking",
      "Maintain at least 70% schedule completion throughout the week",
      "Exercise at least 5 times during the week",
      "Identify a minor issue in your project and fix it without being asked",
      "On the weekend, lead a Team Retrospective discussing the week's progress"
    ]
  },
  {
    week: 3,
    title: "The Shadow Within",
    description: "Confront your distractions and begin to share with your team.",
    challenges: [
      "Create a quick reminder technique for each of your common distractions",
      "During a team session, share one concern or excitement with your team",
      "Implement the most challenging feature of your Intellect app",
      "Assign clear responsibilities to team members based on their strengths",
      "Complete all Mindfulness and Reflection breaks for three consecutive days",
      "Document your overthinking patterns and how you're addressing them",
      "On the weekend, practice Code Refactoring on your recent work"
    ]
  },
  {
    week: 4,
    title: "The Crucible of Persistence",
    description: "Focus intensely on maintaining consistency throughout the week.",
    challenges: [
      "Rate your focus quality for each session from 1-10 in your journal",
      "Master one complex algorithm completely rather than sampling many",
      "Create a visual progress board that all team members can access",
      "Complete all scheduled activities for at least 5 consecutive days",
      "Spend at least 30 minutes on Physical Training every day",
      "Reach out to team members who are struggling with their tasks",
      "On the weekend, devote time to Learning New Technology relevant to your projects"
    ]
  },
  {
    week: 5,
    title: "The Broken Bridge",
    description: "Practice asking for help and building interdependence.",
    challenges: [
      "For one task you've been avoiding, explicitly ask for assistance",
      "Ask one specific question to someone who might help your progress each day",
      "Seek feedback on your Intellect app from two external sources",
      "Hold a structured feedback session where every team member shares",
      "Document instances where collaboration led to better outcomes",
      "Practice delegation by assigning at least one task you would normally do yourself",
      "On the weekend, lead a Strategic Planning session for the coming week"
    ]
  },
  {
    week: 6,
    title: "The Templar's Reflection",
    description: "Assess your progress on all four virtues and plan adjustments.",
    challenges: [
      "Add a 5-minute reflection at the end of each day in your journal",
      "Create a visual knowledge map connecting all algorithms you've mastered",
      "Check in individually with each team member to understand their challenges",
      "Complete an honest self-assessment of your four virtues in your journal",
      "Identify one improvement you can make in each virtue area",
      "Begin implementing improvements to your weakest virtue",
      "On the weekend, practice Templar Meditation focused on your growth areas"
    ]
  },
  {
    week: 7,
    title: "The Integrated Warrior",
    description: "Balance all four virtues simultaneously in your daily practice.",
    challenges: [
      "During breaks, alternate between different virtue-building activities",
      "Implement user feedback from previous weeks into your Intellect app",
      "Delegate one responsibility you usually handle yourself to a team member",
      "Balance individual and team activities throughout the week",
      "Practice translating technical concepts into clear, simple explanations",
      "Document how your four virtues are beginning to work together",
      "On the weekend, update your Documentation to reflect recent progress"
    ]
  },
  {
    week: 8,
    title: "The Dawn Judgment",
    description: "Evaluate your projects with clear, unbiased understanding.",
    challenges: [
      "Each morning, identify the single most important task for each project",
      "Hold a structured meeting where each team member receives balanced feedback",
      "Create visualizations of the improvements made to your projects",
      "Assess which virtue has grown the most and which needs more attention",
      "Practice making decisive choices without overthinking",
      "Begin final preparations for your project presentations",
      "On the weekend, conduct a comprehensive Project Review of all work"
    ]
  },
  {
    week: 9,
    title: "The Final Trial",
    description: "Apply all four virtues intensively as you complete your projects.",
    challenges: [
      "Push your limits while maintaining balance between all four virtues",
      "Finalize your Intellect application with polished, user-ready features",
      "Lead a comprehensive review session for all team projects",
      "Document specific instances where you've overcome each of your four challenges",
      "Begin preparing your transformation journey presentation",
      "Practice explaining your projects to someone outside your field",
      "On the weekend, engage in intense Physical Training followed by Templar Meditation"
    ]
  },
  {
    week: 10,
    title: "The Ascended Arbiter",
    description: "Complete your projects and document your transformation.",
    challenges: [
      "Finalize documentation of your transformation journey",
      "Prepare presentations showcasing both technical accomplishments and personal growth",
      "Complete all projects to a high standard of excellence",
      "Lead a final team retrospective celebrating collective achievements",
      "Create a sustainability plan for maintaining your four virtues beyond this journey",
      "Express gratitude to those who supported your transformation",
      "On the final day, perform the Arbiter's Ritual: reviewing your entire journey in your journal"
    ]
  }
];

// Achievement definitions that can be unlocked
export const achievements = [
  {
    id: "mindful_arbiter",
    title: "Mindful Arbiter",
    description: "Complete all meditation sessions for a full week",
    icon: "🧘",
    virtue: "mentalClarity"
  },
  {
    id: "foundation_builder",
    title: "Foundation Builder",
    description: "Maintain 80% completion rate for an entire week",
    icon: "🏗️",
    virtue: "consistency"
  },
  {
    id: "shadow_binder",
    title: "Shadow Binder",
    description: "Successfully identify and counter all your common distractions",
    icon: "🔮",
    virtue: "mentalClarity"
  },
  {
    id: "unbroken_chain",
    title: "Unbroken Chain",
    description: "Complete 7 consecutive days without missing any scheduled sessions",
    icon: "⛓️",
    virtue: "consistency"
  },
  {
    id: "humble_strength",
    title: "Humble Strength",
    description: "Ask for help or feedback at least 10 times in a week",
    icon: "🤲",
    virtue: "interdependence"
  },
  {
    id: "clear_sight",
    title: "Clear Sight",
    description: "Complete an honest self-assessment and implement improvements",
    icon: "👁️",
    virtue: "mentalClarity"
  },
  {
    id: "balanced_arbiter",
    title: "Balanced Arbiter",
    description: "Achieve a score of at least 6 in all four virtues",
    icon: "⚖️",
    virtue: "all"
  },
  {
    id: "wise_judge",
    title: "Wise Judge",
    description: "Successfully lead a balanced feedback session with your team",
    icon: "📜",
    virtue: "emotionalIntelligence"
  },
  {
    id: "templar_resolve",
    title: "Templar's Resolve",
    description: "Complete Week 9 with at least 90% schedule adherence",
    icon: "🛡️",
    virtue: "consistency"
  },
  {
    id: "ascended_arbiter",
    title: "Ascended Arbiter",
    description: "Complete the full 10-week journey and all major projects",
    icon: "👑",
    virtue: "all"
  }
];