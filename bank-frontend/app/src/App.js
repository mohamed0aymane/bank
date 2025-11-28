import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";


import Login from "./components/SignIn/Login";
import Register from "./components/SignUp/Register";


import Dashboard from "./components/Dashboard/Dashboard";

import ProtectedRoute from "./components/Route/ProtectedRoute";


import CompteList from "./components/Get/CompteList";
import AddCompte from "./components/Add/AddCompte";
import EditCompte from "./components/Update/EditCompte";
import UploadXml from "./components/UploadXml/UploadXml";
import CompteDetail from "./components/CompteDetail/CompteDetail";


import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
    <div className="app-container">
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* Dashboard Protégé */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["manager", "agent"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Détail compte */}
        <Route
          path="/comptes/:id"
          element={
            <ProtectedRoute roles={["manager", "agent"]}>
              <CompteDetail />
            </ProtectedRoute>
          }
        />

        {/* Liste des comptes */}
        <Route
          path="/comptes"
          element={
            <ProtectedRoute roles={["manager", "agent"]}>
              <CompteList />
            </ProtectedRoute>
          }
        />

        {/* Ajouter un compte (manager seulement) */}
        <Route
          path="/comptes/add"
          element={
            <ProtectedRoute roles={["manager"]}>
              <AddCompte />
            </ProtectedRoute>
          }
        />

        {/* Modifier un compte (manager seulement) */}
        <Route
          path="/comptes/edit/:id"
          element={
            <ProtectedRoute roles={["manager"]}>
              <EditCompte />
            </ProtectedRoute>
          }
        />

        {/* Import XML (manager seulement) */}
        <Route
          path="/comptes/import"
          element={
            <ProtectedRoute roles={["manager"]}>
              <UploadXml />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
