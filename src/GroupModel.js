import React, { useState } from "react";

const GroupModel = ({ addGroup, setShowModal, existingGroups }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState('#B38BFA');
  const [errorMessage, setErrorMessage] = useState("");

  // List of available colors
  const colorOptions = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  // Function to generate initials from the first and last word
  const generateInitials = (name) => {
    const nameParts = name.split(" "); // Split the name by spaces
    const firstWord = nameParts[0]; // First word
    const lastWord = nameParts[nameParts.length - 1]; // Last word
    const initials = `${firstWord[0].toUpperCase()}${lastWord[0].toUpperCase()}`; // Join the first letter of the first and last word
    return initials;
  };

  // Check if the group name already exists
  const isGroupNameDuplicate = (name) => {
    return existingGroups.some((group) => group.name.toLowerCase() === name.toLowerCase());
  };

  // Handle group creation
  const handleCreate = () => {
    if (groupName.trim()) {
      // Check if the group name already exists
      if (isGroupNameDuplicate(groupName)) {
        setErrorMessage("Group name is already taken, please choose another.");
        return; // Do not proceed if duplicate
      }

      // Reset error message if the name is valid
      setErrorMessage("");

      if (!selectedColor) {
        // If no color selected, pick a random color
        const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        setSelectedColor(randomColor);
      }

      // Generate initials for the group name (only from the first and last words)
      const initials = generateInitials(groupName);

      // Create the new group
      addGroup(groupName, selectedColor, initials);

      // Reset form fields and close modal after successful creation
      setGroupName(""); 
      setSelectedColor(null);
      setShowModal(false); // Close the modal after successful creation
    } else {
      setErrorMessage("Please enter a group name.");
    }
  };

  return (
    <div className="overlay" id="modelOverlay">
      <div className="model">
        <div className="group">
          Create New Group
          <a href="#" className="close-btn" onClick={() => setShowModal(false)}>
            &times;
          </a>
        </div>
        <div className="content">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label className="groupName">Group Name</label>
              <input
                type="text"
                className="text-group"
                placeholder="Enter Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            {/* Show error message if it's set */}
            {errorMessage && <p className="error">{errorMessage}</p>}

            <div className="dot">
              <label className="color">Choose Color</label>
              {colorOptions.map((color) => (
                <div
                  key={color}
                  className="color-circle"
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
            <div className="create-btn">
              <input
                type="button"
                className="button"
                value="Create"
                onClick={handleCreate}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupModel;
