import Adduser from "./adduser/adduser";
import "./App.css";
import User from "./getuser/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateForm from "./updateuser/update";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <Adduser />,
    },
    {
      path: "/update/:id",
      element: <UpdateForm />,
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
