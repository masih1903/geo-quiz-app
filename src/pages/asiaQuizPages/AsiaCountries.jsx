import EnhancedMapCountryQuiz from "../../quizTypes/EnhancedMapCountryQuiz";
import AsiaMap from "../../components/mapComponents/AsiaMap";

function AsiaCountries() {
  return (
    <EnhancedMapCountryQuiz
      regionApiUrl="https://atlasapi.cphmk.dk/api/countries/region/asia"
      mapComponent={AsiaMap}
      title="Asian Countries Quiz"
      mapType="asia"
    />
  );
}

export default AsiaCountries;
