import ModernFlagQuiz from "../../components/QuizPages/ModernFlagQuiz";

function WorldFlags() {
  return (
    <ModernFlagQuiz
      continent="World"
      apiUrl="https://atlasapi.cphmk.dk/api/countries"
      title="World Flag Quiz"
    />
  );
}

export default WorldFlags;
  