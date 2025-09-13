import React from "react";
import ModernCapitalQuiz from "../../quizTypes/ModernCapitalQuiz";

function AsiaCapitals() {
  return (
    <ModernCapitalQuiz
      continent="Asia"
      apiUrl="https://atlasapi.cphmk.dk/api/countries/region/asia"
      title="Asian Capitals Quiz"
    />
  );
}

export default AsiaCapitals;
