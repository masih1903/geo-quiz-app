import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import World from "./pages/World";
import Europe from "./pages/Europe";
import Asia from "./pages/Asia";
import Africa from "./pages/Africa";
import NorthAmerica from "./pages/NorthAmerica";
import SouthAmerica from "./pages/SouthAmerica";
import WorldCapitals from "./pages/world-quiz-pages/WorldCapitals";
import WorldCountries from "./pages/world-quiz-pages/WorldCountries";
import WorldFlags from "./pages/world-quiz-pages/WorldFlags";
import EuropeCapitals from "./pages/europe-quiz-pages/EuropeCapitals";
import EuropeCountries from "./pages/europe-quiz-pages/EuropeCountries";
import EuropeFlags from "./pages/europe-quiz-pages/EuropeFlags";
import AsiaCapitals from "./pages/asia-quiz-pages/AsiaCapitals";
import AsiaCountries from "./pages/asia-quiz-pages/AsiaCountries";
import AsiaFlags from "./pages/asia-quiz-pages/AsiaFlags";
import AfricaCapitals from "./pages/africa-quiz-pages/AfricaCapitals";
import AfricaCountries from "./pages/africa-quiz-pages/AfricaCountries";
import AfricaFlags from "./pages/africa-quiz-pages/AfricaFlags";
import NorthAmericaCapitals from "./pages/north-america-quiz-pages/NorthAmericaCapitals";
import NorthAmericaCountries from "./pages/north-america-quiz-pages/NorthAmericaCountries";
import NorthAmericaFlags from "./pages/north-america-quiz-pages/NorthAmericaFlags";
import SouthAmericaCapitals from "./pages/south-america-quiz-pages/SouthAmericaCapitals";
import SouthAmericaCountries from "./pages/south-america-quiz-pages/SouthAmericaCountries";
import SouthAmericaFlags from "./pages/south-america-quiz-pages/SouthAmericaFlags";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/world" element={<World />} />
        <Route path="/europe" element={<Europe />} />
        <Route path="/asia" element={<Asia />} />
        <Route path="/africa" element={<Africa />} />
        <Route path="/north-america" element={<NorthAmerica />} />
        <Route path="/south-america" element={<SouthAmerica />} />
        <Route path="/world-capital-quiz" element={<WorldCapitals />} />
        <Route path="/world-country-quiz" element={<WorldCountries />} />
        <Route path="/world-flag-quiz" element={<WorldFlags />} />
        <Route path="/europe-capital-quiz" element={<EuropeCapitals />} />
        <Route path="/europe-country-quiz" element={<EuropeCountries />} />
        <Route path="/europe-flag-quiz" element={<EuropeFlags />} />
        <Route path="/asia-capital-quiz" element={<AsiaCapitals />} />
        <Route path="/asia-country-quiz" element={<AsiaCountries />} />
        <Route path="/asia-flag-quiz" element={<AsiaFlags />} />
        <Route path="/africa-capital-quiz" element={<AfricaCapitals />} />
        <Route path="/africa-country-quiz" element={<AfricaCountries />} />
        <Route path="/africa-flag-quiz" element={<AfricaFlags />} />
        <Route
          path="/north-america-capital-quiz"
          element={<NorthAmericaCapitals />}
        />
        <Route
          path="/north-america-country-quiz"
          element={<NorthAmericaCountries />}
        />
        <Route
          path="/north-america-flag-quiz"
          element={<NorthAmericaFlags />}
        />
        <Route
          path="/south-america-capital-quiz"
          element={<SouthAmericaCapitals />}
        />
        <Route
          path="/south-america-country-quiz"
          element={<SouthAmericaCountries />}
        />
        <Route
          path="/south-america-flag-quiz"
          element={<SouthAmericaFlags />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
