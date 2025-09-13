import React from "react";
import ModernFlagQuiz from "../../components/QuizPages/ModernFlagQuiz";

function AsiaFlags() {
  return (
    <ModernFlagQuiz
      continent="Asia"
      apiUrl="https://atlasapi.cphmk.dk/api/countries/region/asia"
      title="Asia Flag Quiz"
    />
  );
}

export default AsiaFlags;