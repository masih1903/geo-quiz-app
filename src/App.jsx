import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./components/uiComponents/ScrollToTop";
import Home from "./pages/regionPages/Home";
import World from "./pages/regionPages/World";
import Europe from "./pages/regionPages/Europe";
import Asia from "./pages/regionPages/Asia";
import Africa from "./pages/regionPages/Africa";
import NorthAmerica from "./pages/regionPages/NorthAmerica";
import SouthAmerica from "./pages/regionPages/SouthAmerica";
import WorldCapitals from "./pages/worldQuizPages/WorldCapitals";
import WorldCountries from "./pages/worldQuizPages/WorldCountries";
import WorldFlags from "./pages/worldQuizPages/WorldFlags";
import EuropeCapitals from "./pages/europeQuizPages/EuropeCapitals";
import EuropeCountries from "./pages/europeQuizPages/EuropeCountries";
import EuropeFlags from "./pages/europeQuizPages/EuropeFlags";
import AsiaCapitals from "./pages/asiaQuizPages/AsiaCapitals";
import AsiaCountries from "./pages/asiaQuizPages/AsiaCountries";
import AsiaFlags from "./pages/asiaQuizPages/AsiaFlags";
import AfricaCapitals from "./pages/africaQuizPages/AfricaCapitals";
import AfricaCountries from "./pages/africaQuizPages/AfricaCountries";
import AfricaFlags from "./pages/africaQuizPages/AfricaFlags";
import NorthAmericaCapitals from "./pages/northAmericaQuizPages/NorthAmericaCapitals";
import NorthAmericaCountries from "./pages/northAmericaQuizPages/NorthAmericaCountries";
import NorthAmericaFlags from "./pages/northAmericaQuizPages/NorthAmericaFlags";
import SouthAmericaCapitals from "./pages/southAmericaQuizPages/SouthAmericaCapitals";
import SouthAmericaCountries from "./pages/southAmericaQuizPages/SouthAmericaCountries";
import SouthAmericaFlags from "./pages/southAmericaQuizPages/SouthAmericaFlags";

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
    ),
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );

  return (
    <RouterProvider 
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
}

export default App;
