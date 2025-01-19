import React from "react";

const Header = ({ selectedGroup }) => {
  return (
    <div className="heading">
      {selectedGroup && (
        <div className="group-info">
          <div
            className="initials-container"
            style={{ backgroundColor: selectedGroup.color }}
          >
            {selectedGroup.initials} {/* Display the selected group's initials */}
          </div>
          <h1>{selectedGroup.name}</h1> {/* Display the selected group's name */}
        </div>
      )}
    </div>
  );
};

export default Header;


