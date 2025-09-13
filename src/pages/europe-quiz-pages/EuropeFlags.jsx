import ModernFlagQuiz from "../../components/QuizPages/ModernFlagQuiz";

function EuropeFlags() {
  return (
    <ModernFlagQuiz
      continent="Europe"
      apiUrl="https://atlasapi.cphmk.dk/api/countries/region/europe"
      title="Europe Flag Quiz"
    />
  );
}

export default EuropeFlags;