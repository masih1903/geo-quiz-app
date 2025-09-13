import React from "react";
import ModernCapitalQuiz from "../../quizTypes/ModernCapitalQuiz";

function SouthAmericaCapitals() {
  return (
    <ModernCapitalQuiz
      continent="South America"
      apiUrl="https://atlasapi.cphmk.dk/api/countries/region/americas"
      title="South American Capitals Quiz"
    />
  );
}

export default SouthAmericaCapitals;
