import ModernFlagQuiz from "../../quizTypes/ModernFlagQuiz";

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
  
