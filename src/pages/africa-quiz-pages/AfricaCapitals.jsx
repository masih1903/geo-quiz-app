import React from "react";
import ModernCapitalQuiz from "../../components/ModernCapitalQuiz";

function AfricaCapitals() {
  return (
    <ModernCapitalQuiz
      continent="Africa"
      apiUrl="https://atlasapi.cphmk.dk/api/countries/region/africa"
      title="African Capitals Quiz"
    />
  );
}

export default AfricaCapitals;
