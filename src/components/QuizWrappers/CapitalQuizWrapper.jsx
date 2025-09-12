import ModernCapitalQuiz from "../ModernCapitalQuiz";
import { API_ENDPOINTS } from "../../constants/apiConfig";

function CapitalQuizWrapper({ continent, region }) {
  const apiUrl = API_ENDPOINTS[region];
  const title = `${continent} Capitals Quiz`;

  return (
    <ModernCapitalQuiz
      continent={continent}
      apiUrl={apiUrl}
      title={title}
    />
  );
}

export default CapitalQuizWrapper;
