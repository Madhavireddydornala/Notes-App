import React, { useState, useEffect } from "react";
import image3 from "./images/image 1.3.png";

const Footer = ({ selectedGroup,updateGroupMessages}) => {
  const [textValue, setTextValue] = useState(""); // State to track the text input
  const [messages, setMessages] = useState(selectedGroup.message || []); // State to track messages for the current group

  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem("groups");
    return savedGroups ? JSON.parse(savedGroups) : [];
  });

  // Update local messages state when the selectedGroup changes
  useEffect(() => {
    setMessages(selectedGroup.message || []);
  }, [selectedGroup]);

  // Function to handle text input change
  const handleChange = (event) => {
    setTextValue(event.target.value);
  };

  // Function to handle sending the message
  const handleSend = () => {
    if (textValue.trim() !== "") {
      // Get current date and time
      const currentDateTime = new Date();
      const formattedDate = currentDateTime.toLocaleDateString();
      const formattedTime = currentDateTime.toLocaleTimeString();

      // Create a new message object
      const newMessage = {
        text: textValue,
        date: formattedDate,
        time: formattedTime,
      };

      const updatedMessages = [...messages, newMessage]; // Add the new message to the array
      setMessages(updatedMessages); // Update local state
      setTextValue(""); // Clear the textarea after sending

      const updatedGroups = groups.map((group) => {
        if (group.name === selectedGroup.name) {
          return { ...group, message: updatedMessages };
        }
        return group;
      });
      setGroups(updatedGroups);
      localStorage.setItem("groups", JSON.stringify(updatedGroups));
      // Pass the updated messages to the parent component
      if (updateGroupMessages) {
        updateGroupMessages(selectedGroup.name, updatedMessages);
      }
    }
  };

  return (
    <div className="footers">
      {/* Display messages */}
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div>{message.text}</div>
            <div className="timestamp">
              <small>
                {message.date} at {message.time}
              </small>
            </div>
          </div>
        ))}
      </div>

      <div className="cont">
        <form>
          <textarea
            id="textInput"
            name="textInput"
            rows="5"
            cols="40"
            placeholder="Enter your message here..."
            value={textValue}
            onChange={handleChange} // Update state on text change
          ></textarea>
        </form>
      </div>
      <div>
        <img
          src={image3}
          className={`image3 ${textValue ? "active" : "disabled"}`}
          alt="Send Icon"
          onClick={handleSend} // Handle send when the image is clicked
        />
      </div>
    </div>
  );
};

export default Footer;
