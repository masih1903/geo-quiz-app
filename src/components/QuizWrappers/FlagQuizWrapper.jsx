import ModernFlagQuiz from "../QuizPages/ModernFlagQuiz";
import { API_ENDPOINTS } from "../../constants/apiConfig";

function FlagQuizWrapper({ continent, region }) {
  const apiUrl = API_ENDPOINTS[region];
  const title = `${continent} Flag Quiz`;

  return (
    <ModernFlagQuiz
      continent={continent}
      apiUrl={apiUrl}
      title={title}
    />
  );
}

export default FlagQuizWrapper;
