import EnhancedMapCountryQuiz from "../../components/EnhancedMapCountryQuiz";
import WorldMap from "../../components/WorldMap";

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
