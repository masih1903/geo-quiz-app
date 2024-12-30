import React from "react";
import AfricaMap from "../../components/AfricaMap";
import CountryAndCapitalQuiz from "../../components/CountryAndCapitalQuiz";

function AfricaCapitals() {
  return (
    <CountryAndCapitalQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries/region/africa"
      mapComponent={AfricaMap}
      quizType="capitals"
      title="African Capitals Quiz"
      mapType="africa"
    />
  );
}

export default AfricaCapitals;
