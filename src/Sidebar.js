import React, { useState, useEffect } from "react";
import image2 from "./images/image 1.2.png";
import GroupModel from "./GroupModel";
import Header from "./Header"; // Import Header directly here
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

  useEffect(() => {
    if (groups.length > 0 && !selectedGroup) {
      setSelectedGroup(groups[0]); // Set first group as selected
    }
  }, [groups]);

  // Function to add a new group
  const addGroup = (groupName, color, initials) => {
    const groupExists = groups.some(
      (group) => group.name.toLowerCase() === groupName.toLowerCase()
    );

    if (!groupExists) {
      const newGroups = [...groups, { name: groupName, color, initials, message: [] }];
      setGroups(newGroups);
      localStorage.setItem("groups", JSON.stringify(newGroups)); // Save to Local Storage
    }
  };

  return (
    <>
      {/* Render the Header directly inside Sidebar */}
      <Header selectedGroup={selectedGroup} />

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-heading">Pocket Notes</h2>
        <ul className="sidebar-list">
          {groups.map((group, index) => (
            <li key={index} onClick={() => setSelectedGroup(group)}>
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
        <a
          href="#modelOverlay"
          className="open-btn"
          onClick={() => setShowModal(true)}
        >
          <img src={image2} alt="Add Group" className="logo" />
        </a>
      </div>

      {/* Modal for creating a new group */}
      {showModal && (
        <GroupModel
          addGroup={addGroup}
          setShowModal={setShowModal}
          existingGroups={groups} // Pass the current list of groups for duplication check
        />
      )}

      {selectedGroup && (
        <Footer selectedGroup={selectedGroup} />
      )}





    </>
  );
};

export default SideBar;
