import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import { StateProvider } from "./context/StateContext";
import { initialState, reducer } from "./context/StateReducers";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>hiii</div>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/onboarding",
      element: <Onboarding />,
    },
  ]);
  // temporary declarations to avoid errors
  // let initialState, reducer;
  return (
    <>
      <RouterProvider router={router} />
      <StateProvider
        initialState={initialState}
        reducer={reducer}
      ></StateProvider>
    </>
  );
}
