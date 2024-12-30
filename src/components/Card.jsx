import React, { useState } from "react";
import WorldLogo from "../assets/world.png";

function Card(props) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    border: "1px solid black",
    borderRadius: "5px",
    boxShadow: "5px 5px 5px black",
    padding: "20px",
    margin: "10px",
    marginLeft: "27px",
    textAlign: "center",
    maxWidth: "400px",
    display: "inline-block",
    cursor: "pointer",
    //backgroundColor: isHovered ? "#333333" : "black", // Only one backgroundColor
    backgroundColor: "black",
    width: "100%",
    transition: "background-color 0.3s ease", // Smooth hover transition
  };

  const imgStyle = {
    maxWidth: "60%",
    height: "auto",
    borderRadius: "50%",
    marginBottom: "10px",
    transition: "transform 0.3s ease, opacity 0.3s ease", // Smooth transition for scaling and opacity
    transform: isHovered ? "scale(1.1)" : "scale(1)", // Scale image on hover
    opacity: isHovered ? 0.8 : 1, // Slightly reduce opacity on hover
  };

  const titleStyle = {
    fontFamily: "Arial, sans-serif",
    textShadow: "2px 2px 2px blue",
    margin: "0",
    color: "white",
  };

  const descriptionStyle = {
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    lineHeight: "1.5",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img style={imgStyle} src={WorldLogo} alt="continent pic" />
      <h2 style={titleStyle}>{props.title}</h2>
      <p style={descriptionStyle}>{props.description}</p>
    </div>
  );
}

export default Card;
