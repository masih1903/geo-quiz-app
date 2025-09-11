import React from "react";
import ModernFlagQuiz from "../../components/ModernFlagQuiz";

function AfricaFlags() {
  return (
    <ModernFlagQuiz
      continent="Africa"
      apiUrl="https://atlasapi.cphmk.dk/api/countries/region/africa"
      title="🌍 Africa Flag Quiz"
    />
  );
}

export default AfricaFlags;
  