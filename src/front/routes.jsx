import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Registro } from "./pages/Registro";
import { Login } from "./pages/Login";
import { FamiliaRutina } from "./pages/FamiliaRutina";
import { Menupadre } from "./pages/Menupadre";
import { Addhijo } from "./pages/Addhijo.jsx";
import { AddAutorizado } from "./pages/AddAutorizado.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { CrearRutina } from "./pages/CrearRutina.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/single/:theId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
        <Route path="/demo" element={<ProtectedRoute><Demo /></ProtectedRoute>} />
        <Route path="/CrearRutina" element={<ProtectedRoute><CrearRutina /></ProtectedRoute>} />
        <Route path="/familia" element={<ProtectedRoute><FamiliaRutina /></ProtectedRoute>} />
        <Route path="/Menupadre" element={<ProtectedRoute><Menupadre /></ProtectedRoute>} />
        <Route path="/addhijo" element={<ProtectedRoute><Addhijo /></ProtectedRoute>} />
        <Route path="/add-autorizado" element={<ProtectedRoute><AddAutorizado /></ProtectedRoute>} />

      </Route>
    )
);