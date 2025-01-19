import React, { useState, useEffect } from "react";
import EmptyData from "./EmptyData";
import GroupModel from "./GroupModel";

const MainBody = () => {
  const [groups, setGroups] = useState([]); // State to track groups
  const [selectedGroup, setSelectedGroup] = useState(null); // State to track the selected group

  // Load groups from localStorage when the component mounts
  useEffect(() => {
    loadGroupsFromLocalStorage();
  }, []);

  // Function to load groups from localStorage
  const loadGroupsFromLocalStorage = () => {
    const savedGroups = localStorage.getItem("groups");
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups)); // Parse and set the groups
    } else {
      setGroups([]); // No groups found, reset state
    }
  };

  // Function to add a new group (or simulate group creation)
  const addGroup = (newGroup) => {
    const updatedGroups = [...groups, newGroup]; // Add new group to the current list
    setGroups(updatedGroups); // Update state
    localStorage.setItem("groups", JSON.stringify(updatedGroups)); // Save updated groups to localStorage
  };

  return (
    <div>
      <div className="main">
        {/* If no groups are available, show EmptyData */}
        {groups.length === 0 ? (
          <EmptyData />
        ) : selectedGroup ? (
          <GroupModel selectedGroup={selectedGroup} />
        ) : (
          ''
        )}

        {/* Example button to add a new group (for testing purposes) */}
        
      </div>
    </div>
  );
};

export default MainBody;
