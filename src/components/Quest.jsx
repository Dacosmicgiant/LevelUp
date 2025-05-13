function Quest({ currentWeek, quest }) {
  return (
    <section className="section">
      <h3>Current Quest: Week {currentWeek}</h3>
      <div className="current-quest">
        <h4>{quest.title}</h4>
        <p>{quest.description}</p>
        <ul>
          {quest.challenges.map((challenge, index) => (
            <li key={index}>{challenge}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Quest;