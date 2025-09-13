import React from "react";
import ModernFlagQuiz from "../../components/QuizPages/ModernFlagQuiz";

function SouthAmericaFlags() {
  return (
    <ModernFlagQuiz
      continent="South America"
      apiUrl="https://atlasapi.cphmk.dk/api/countries/region/southamerica"
      title="South America Flag Quiz"
    />
  );
}

export default SouthAmericaFlags;
  