import React, { useState, useEffect } from "react";
import image2 from "./images/image 1.2.png";
import GroupModel from "./GroupModel";
import Header from "./Header";
import Footer from "./Footer";

const SideBar = () => {
  const [groups, setGroups] = useState([]); // Holds all groups
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedGroup, setSelectedGroup] = useState(null); // Currently selected group

  // Load groups from Local Storage when the component mounts
  useEffect(() => {
    const savedGroups = localStorage.getItem("groups");
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups)); // Parse and set the groups
    }
  }, []);

  // Automatically select the first group when groups change
  useEffect(() => {
    if (groups.length > 0 && !selectedGroup) {
      setSelectedGroup(groups[0]); // Set first group as selected
    }
  }, [groups]); // Removed 'selectedGroup' from dependencies to avoid unnecessary re-renders

  // Function to add a new group
  const addGroup = (groupName, color, initials) => {
    const groupExists = groups.some(
      (group) => group.name.toLowerCase() === groupName.toLowerCase()
    );

    if (!groupExists) {
      const newGroups = [...groups, { name: groupName, color, initials, messages: [] }];
      setGroups(newGroups);
      localStorage.setItem("groups", JSON.stringify(newGroups)); // Save to Local Storage
    }
  };

  return (
    <>
      {/* Render the Header */}
      <Header selectedGroup={selectedGroup} />

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-heading">Pocket Notes</h2>
        <ul className="sidebar-list">
          {groups.map((group, index) => (
            <li 
              key={index} 
              onClick={() => setSelectedGroup(group)}
              className={selectedGroup?.name === group.name ? "selected-group" : ""}
            >
              <div
                className="initials-container"
                style={{ backgroundColor: group.color }}
              >
                {group.initials} {/* Display the group initials */}
              </div>
              {group.name} {/* Display the full group name */}
            </li>
          ))}
        </ul>

        {/* Button to Open GroupModel Modal */}
        <button className="open-btn" onClick={() => setShowModal(true)}>
          <img src={image2} alt="Add Group" className="logo" />
        </button>
      </div>

      {/* Modal for Creating a New Group */}
      {showModal && (
        <GroupModel
          addGroup={addGroup}
          setShowModal={setShowModal}
          existingGroups={groups} // Pass the current list of groups for duplication check
        />
      )}

      {/* Footer with Selected Group */}
      {selectedGroup && <Footer selectedGroup={selectedGroup} />}
    </>
  );
};

export default SideBar;
