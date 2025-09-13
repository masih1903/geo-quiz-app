import React from "react";
import ModernCapitalQuiz from "../../components/QuizPages/ModernCapitalQuiz";

function EuropeCapitals() {
  return (
    <ModernCapitalQuiz
      continent="Europe"
      apiUrl="https://atlasapi.cphmk.dk/api/countries/region/europe"
      title="European Capitals Quiz"
    />
  );
}

export default EuropeCapitals;
