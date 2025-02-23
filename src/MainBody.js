import React, { useState, useEffect } from "react";
import EmptyData from "./EmptyData";
import GroupModel from "./GroupModel";

const MainBody = () => {
  const [groups, setGroups] = useState([]); // State to track groups
  const [selectedGroup, setSelectedGroup] = useState(null); // State to track the selected group
  const [showModal, setShowModal] = useState(false); // State to show modal

  // Load groups from localStorage when the component mounts
  useEffect(() => {
    const savedGroups = localStorage.getItem("groups");
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups)); // Parse and set the groups
    }
  }, []);

  // Function to add a new group
  const addGroup = (name, color, initials) => {
    const newGroup = { name, color, initials };
    const updatedGroups = [...groups, newGroup]; // Add new group to the list
    setGroups(updatedGroups); // Update state
    localStorage.setItem("groups", JSON.stringify(updatedGroups)); // Save to localStorage
  };

  return (
    <div className="main">
      {/* If no groups exist, show EmptyData */}
      {groups.length === 0 ? (
        <EmptyData />
      ) : (
        <div className="group-list">
          {groups.map((group, index) => (
            <div
              key={index}
              className="group-item"
              style={{ backgroundColor: group.color }}
              onClick={() => setSelectedGroup(group)}
            >
              {group.initials}
            </div>
          ))}
        </div>
      )}

      {/* Show modal when user clicks the "Create Group" button */}
      {showModal && (
        <GroupModel
          addGroup={addGroup}
          setShowModal={setShowModal}
          existingGroups={groups}
        />
      )}

      {/* Button to open the group creation modal */}
      <button className="add-group-btn" onClick={() => setShowModal(true)}>
        + Create Group
      </button>
    </div>
  );
};

export default MainBody;
