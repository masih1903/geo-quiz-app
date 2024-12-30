import QuizOverview from "../layouts/QuizOverview";
import WorldIcon from "../assets/worlds.png";
import { useState, useEffect } from "react";

function Asia() {
  const [hover, setHover] = useState(false);
  const [text, setText] = useState(""); // State for the typed text

  const fullText = `
  - Did you know that Asia is the largest continent in the world, covering about 44.58 million square kilometers, which is almost 30% of the Earth's total land area?
  - Did you know that Japan has more than 6,800 islands, making it one of the countries with the most islands in the world?
  - Did you know that the world’s longest train route, the Trans-Siberian Railway, is located in Asia? It spans 9,289 kilometers (5,772 miles) across Russia.`.trim();

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < fullText.length) {
        // Only append if the current character is defined
        const nextChar = fullText[index];
        if (nextChar !== undefined) {
          setText((prev) => prev + nextChar);
        }
        index++;
      } else {
        clearInterval(interval); // Stop the interval when done
      }
    }, 30); // Adjust typing speed here

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [fullText]);

  const textStyle = {
    fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
    fontSize: "1.2rem",
    lineHeight: "1.8",
    color: "#333",
    textAlign: "left",
    margin: "0 0 1rem 0",
    whiteSpace: "pre-wrap", // Preserve line breaks
    wordWrap: "break-word", // Wrap text to fit smaller containers
  };

  const title = {
    fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
    fontSize: "3.5rem",
    fontWeight: "bold",
    letterSpacing: "0.1rem",
    color: hover ? "#f0f0f0" : "white",
    margin: "0",
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    background: "linear-gradient(90deg, #000, #333)",
    borderRadius: "12px",
    textAlign: "center",
    display: "inline-block",
    textShadow: hover
      ? "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)"
      : "1px 1px 2px rgba(0, 0, 0, 0.7)",
    transition: "all 0.3s ease",
  };

  const resizeImg = {
    width: "35%",
    height: "35%",
    marginBottom: "20px", // Adds space below the image
  };

  const parentStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    padding: "20px",
  };

  const leftStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "20px",
    width: "50%",
  };

  const centerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "50%",
  };

  return (
    <div style={parentStyle}>
      <div style={leftStyle}>
        <h2 className="fun-facts">Fun facts:</h2>
        <h2 style={textStyle}>{text}</h2>
      </div>
      <div style={centerStyle}>
        <h1
          style={title}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Asia quizzes
        </h1>
        <img style={resizeImg} src={WorldIcon} alt="world-icon" />

        <QuizOverview
          continent="Asia -"
          capitalPath="/asia-capital-quiz"
          countryPath="/asia-country-quiz"
          flagPath="/asia-flag-quiz"
        />
      </div>
    </div>
  );
}

export default Asia;
