import React from "react";
import NorthAmericaMap from "../../components/NorthAmericaMap";
import CountryAndCapitalQuiz from "../../components/CountryAndCapitalQuiz";

function NorthAmericaCapitals() {
  return (
    <CountryAndCapitalQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries/region/northamerica"
      mapComponent={NorthAmericaMap}
      quizType="capitals"
      title="North American Capitals Quiz"
      mapType="northamerica"
    />
  );
}

export default NorthAmericaCapitals;
