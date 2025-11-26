import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home (page d'accueil)
import Home from "./components/Home/Home";

// Login / Register
import Login from "./components/SignIn/Login";
import Register from "./components/SignUp/Register";

// Dashboard
import Dashboard from "./components/Dashboard/Dashboard";

// Protected Route
import ProtectedRoute from "./components/Route/ProtectedRoute";

// CRUD Comptes
import CompteList from "./components/Get/CompteList";
import AddCompte from "./components/Add/AddCompte";
import EditCompte from "./components/Update/EditCompte";
import UploadXml from "./components/UploadXml/UploadXml";

function App() {
  return (
    <BrowserRouter>
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
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* CRUD Comptes */}
        <Route
          path="/comptes"
          element={
            <ProtectedRoute>
              <CompteList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/comptes/add"
          element={
            <ProtectedRoute>
              <AddCompte />
            </ProtectedRoute>
          }
        />

        <Route
          path="/comptes/edit/:id"
          element={
            <ProtectedRoute>
              <EditCompte />
            </ProtectedRoute>
          }
        />

        <Route
          path="/comptes/import"
          element={
            <ProtectedRoute>
              <UploadXml />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
