import React from "react";
import ModernFlagQuiz from "../../components/ModernFlagQuiz";

function NorthAmericaFlags() {
  return (
    <ModernFlagQuiz
      continent="North America"
      apiUrl="https://atlasapi.cphmk.dk/api/countries/region/northamerica"
      title="🌎 North America Flag Quiz"
    />
  );
}

export default NorthAmericaFlags;
  