import "./App.css";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import ProtectRoute from "./component/protectRoute";
import Register from "./pages/register";
import Verifikasi from "./pages/verifikasi";
import AddOfficer from "./pages/addOfficer";
import ListOfficer from "./pages/list/listOfficer";
import ListUsers from "./pages/list/listUsers";
import ListItems from "./pages/list/listItems";
import AddAuction from "./pages/addAuction";
import Schedule from "./pages/schedule";
import DetailSchedule from "./pages/detailSchedule";
import UpdateItems from "./pages/updateItems";
import Penawaran from "./pages/penawaran";
import Laporan from "./pages/laporan";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={<ProtectRoute children={<Dashboard />} />}
      />
      <Route
        path="/verifikasi"
        element={<ProtectRoute children={<Verifikasi />} />}
      />
      <Route
        path="/list-user"
        element={<ProtectRoute children={<ListUsers />} />}
      />
      <Route
        path="/list-items"
        element={<ProtectRoute children={<ListItems />} />}
      />
      <Route
        path="/list-items/update/:id"
        element={<ProtectRoute children={<UpdateItems />} />}
      />
      <Route
        path="/list-items/add-auction"
        element={<ProtectRoute children={<AddAuction />} />}
      />
      <Route
        path="/penawaran/:id"
        element={<ProtectRoute children={<Penawaran />} />}
      />
      <Route
        path="/list-laporan"
        element={<ProtectRoute children={<Laporan />} />}
      />
      <Route
        path="/schedule"
        element={<ProtectRoute children={<Schedule />} />}
      />
      <Route
        path="/schedule/detail/:id"
        element={<ProtectRoute children={<DetailSchedule />} />}
      />
      <Route
        path="/list-officer"
        element={<ProtectRoute children={<ListOfficer />} />}
      />
      <Route
        path="/list-officer/add-officer"
        element={<ProtectRoute children={<AddOfficer />} />}
      />
      <Route path="/" element={<Navigate replace to={"/dashboard"} />} />
    </Routes>
  );
}

export default App;
