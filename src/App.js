//CSS
import "./Sass/main.scss";

//Router
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

//Components
import Layout from "./Components/Layout";

//Pages
import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

//context
import { createContext, useState } from "react";

//Authentication
import AuthVerification from "./AuthVerification";

// redux
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />

            <Route path="/signup" element={<Signup />} />

            <Route element={<AuthVerification />}>
              <Route index element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

