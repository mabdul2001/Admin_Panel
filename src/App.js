import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List_users from "./pages/list/List_users";
import List_projects from "./pages/list/List_projects";
import List_reported_users from "./pages/list/List_reported_users";
import List_reported_projects from "./pages/list/List_reported_projects";
import List_blocked_users from "./pages/list/List_blocked_users";
import List_blocked_projects from "./pages/list/List_blocked_projects";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Profile from "./pages/new/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, profileValue, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import TokenContext from "./pages/login/TokenContext";
import AddInterest from "./pages/new/AddInterest";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [token, setToken] = useState(null);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <TokenContext.Provider value={token}>

      
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login setToken={setToken} />} />
            <Route path="users">
              <Route index element={<List_users />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="/admin-profile">
            <Route index element={<Profile inputs={profileValue} title="Admin Profile" />} />
            </Route>
            <Route path="products">
              <Route index element={<List_projects />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                
              />
            </Route>
            <Route
                path="add-interest"
                element={<AddInterest inputs={[{
                  id: "interestName",
                  label: "Interest",
                  type: "text",
                  placeholder: "Enter Interest Name",
                },]} title="Add New Interest" />}
              />
            <Route path="reported_projects">
              <Route index element={<List_reported_projects />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Project" />}
              />
            </Route>
            <Route path="reported_users">
              <Route index element={<List_reported_users />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New User" />}
              />
            </Route>
            <Route path="blocked_projects">
              <Route index element={<List_blocked_projects />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Project" />}
              />
            </Route>
            <Route path="blocked_users">
              <Route index element={<List_blocked_users />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New User" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
