import EnhancedMapCountryQuiz from "../../quizTypes/EnhancedMapCountryQuiz";
import WorldMap from "../../components/MapComponents/WorldMap";

function WorldCountries() {
  return (
    <EnhancedMapCountryQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries"
      mapComponent={WorldMap}
      title="World Countries Quiz"
      mapType="world"
    />
  );
}

export default WorldCountries;
