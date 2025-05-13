import React, { useState } from 'react';

function TimetableCustomization({ timeBlocks: initialTimeBlocks, onSave }) {
  const [customTimeBlocks, setCustomTimeBlocks] = useState([...initialTimeBlocks]);
  const [newBlock, setNewBlock] = useState({
    time: "",
    activity: "",
    category: "individual"
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const categories = [
    { value: "individual", label: "Individual Work" },
    { value: "team", label: "Team Work" },
    { value: "mental", label: "Mental Development" },
    { value: "physical", label: "Physical Activity" },
    { value: "selfCare", label: "Self-Care" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlock(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTimeBlock = () => {
    if (!newBlock.time || !newBlock.activity) return;

    if (editingIndex !== null) {
      const updatedBlocks = [...customTimeBlocks];
      updatedBlocks[editingIndex] = {
        ...updatedBlocks[editingIndex],
        time: newBlock.time,
        activity: newBlock.activity,
        category: newBlock.category
      };
      setCustomTimeBlocks(updatedBlocks);
      setEditingIndex(null);
    } else {
      const newId = customTimeBlocks.length > 0 
        ? Math.max(...customTimeBlocks.map(block => block.id)) + 1 
        : 1;

      setCustomTimeBlocks(prev => [
        ...prev,
        {
          id: newId,
          time: newBlock.time,
          activity: newBlock.activity,
          category: newBlock.category
        }
      ]);
    }

    setNewBlock({
      time: "",
      activity: "",
      category: "individual"
    });
  };

  const editTimeBlock = (index) => {
    const block = customTimeBlocks[index];
    setNewBlock({
      time: block.time,
      activity: block.activity,
      category: block.category
    });
    setEditingIndex(index);
  };

  const deleteTimeBlock = (index) => {
    setCustomTimeBlocks(prev => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setNewBlock({
        time: "",
        activity: "",
        category: "individual"
      });
    }
  };

  const moveBlockUp = (index) => {
    if (index === 0) return;
    const updatedBlocks = [...customTimeBlocks];
    [updatedBlocks[index - 1], updatedBlocks[index]] = [updatedBlocks[index], updatedBlocks[index - 1]];
    setCustomTimeBlocks(updatedBlocks);
  };

  const moveBlockDown = (index) => {
    if (index === customTimeBlocks.length - 1) return;
    const updatedBlocks = [...customTimeBlocks];
    [updatedBlocks[index], updatedBlocks[index + 1]] = [updatedBlocks[index + 1], updatedBlocks[index]];
    setCustomTimeBlocks(updatedBlocks);
  };

  const saveCustomTimetable = () => {
    const orderedBlocks = customTimeBlocks.map((block, index) => ({
      ...block,
      id: index + 1
    }));
    onSave(orderedBlocks);
  };

  const groupTimeBlocks = () => {
    const groups = { morning: [], afternoon: [], evening: [] };
    customTimeBlocks.forEach(block => {
      const hour = parseInt(block.time.split(':')[0]);
      if (hour < 12) groups.morning.push(block);
      else if (hour < 18) groups.afternoon.push(block);
      else groups.evening.push(block);
    });
    return groups;
  };

  const getCategoryColor = (category) => {
    const colors = {
      individual: "#3498db",
      team: "#9b59b6",
      mental: "#2ecc71",
      physical: "#e74c3c",
      selfCare: "#f39c12"
    };
    return colors[category] || "#777";
  };

  const groupedBlocks = groupTimeBlocks();

  return (
    <div className="timetable-customization">
      <div className="timetable-editor">
        <h3>Customize Your Daily Schedule</h3>
        <p className="customization-info">
          Define your own time blocks for your daily schedule. These blocks will be used throughout your journey.
        </p>

        <div className="block-form">
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input 
              type="text" 
              id="time" 
              name="time" 
              placeholder="e.g. 08:00 - 09:30" 
              value={newBlock.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="activity">Activity</label>
            <input 
              type="text" 
              id="activity" 
              name="activity" 
              placeholder="e.g. Intellect" 
              value={newBlock.activity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select 
              id="category" 
              name="category" 
              value={newBlock.category}
              onChange={handleInputChange}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          <button className="add-block-button" onClick={addTimeBlock}>
            {editingIndex !== null ? "Update Block" : "Add Block"}
          </button>
        </div>

        <div className="timetable-preview">
          <h4>Your Schedule</h4>
          {customTimeBlocks.length === 0 ? (
            <div className="empty-timetable">
              <p>Your schedule is empty. Add some time blocks to get started.</p>
            </div>
          ) : (
            <div className="time-block-groups">
              {Object.entries(groupedBlocks).map(([period, blocks]) =>
                blocks.length > 0 && (
                  <div className="time-block-group" key={period}>
                    <h5>{period.charAt(0).toUpperCase() + period.slice(1)}</h5>
                    {blocks.map((block, index) => (
                      <div className="time-block-item" key={block.id}>
                        <div
                          className="block-category-indicator"
                          style={{ backgroundColor: getCategoryColor(block.category) }}
                        ></div>
                        <div className="block-details">
                          <div className="block-time">{block.time}</div>
                          <div className="block-activity">{block.activity}</div>
                        </div>
                        <div className="block-actions">
                          <button
                            className="move-up-button"
                            onClick={() => moveBlockUp(customTimeBlocks.indexOf(block))}
                            title="Move up"
                          >
                            ↑
                          </button>
                          <button
                            className="move-down-button"
                            onClick={() => moveBlockDown(customTimeBlocks.indexOf(block))}
                            title="Move down"
                          >
                            ↓
                          </button>
                          <button
                            className="edit-button"
                            onClick={() => editTimeBlock(customTimeBlocks.indexOf(block))}
                            title="Edit"
                          >
                            ✎
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => deleteTimeBlock(customTimeBlocks.indexOf(block))}
                            title="Delete"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <div className="timetable-actions">
          <button 
            className="save-timetable-button" 
            onClick={saveCustomTimetable}
            disabled={customTimeBlocks.length === 0}
          >
            Save Custom Schedule
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimetableCustomization;
