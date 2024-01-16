import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PokemonList from "./components/ListPokemon/PokemonList";
import PokemonDetail from "./components/DetailPokemon/PokemonDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PokemonList />,
  },

  {
    path: "/pokemon/:id",
    element: <PokemonDetail />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
