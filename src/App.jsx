import { RouterProvider } from "react-router-dom";
import { mainRouter } from "./router/mainRouter";

function App() {
  return <RouterProvider router={mainRouter} />;
}

export default App;
