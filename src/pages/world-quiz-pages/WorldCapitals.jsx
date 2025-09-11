import React from "react";
import ModernCapitalQuiz from "../../components/ModernCapitalQuiz";

function WorldCapitals() {
  return (
    <ModernCapitalQuiz
      continent="World"
      apiUrl="https://atlasapi.cphmk.dk/api/countries/all"
      title="World Capitals Quiz"
    />
  );
}

export default WorldCapitals;
