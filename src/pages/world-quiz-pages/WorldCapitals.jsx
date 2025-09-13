import ModernCapitalQuiz from "../../components/QuizPages/ModernCapitalQuiz";

function WorldCapitals() {
  return (
    <ModernCapitalQuiz
      continent="World"
      apiUrl="https://atlasapi.cphmk.dk/api/countries"
      title="World Capitals Quiz"
    />
  );
}

export default WorldCapitals;
