import React from "react";
import ModernCapitalQuiz from "../../quizTypes/ModernCapitalQuiz";

function NorthAmericaCapitals() {
  return (
    <ModernCapitalQuiz
      continent="North America"
      apiUrl="https://atlasapi.cphmk.dk/api/countries/region/americas"
      title="North American Capitals Quiz"
    />
  );
}

export default NorthAmericaCapitals;
