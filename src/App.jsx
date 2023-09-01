import "./App.css";
import AdminAppRoutes from "./admin/adminroutes";
import AppRoutes from "./routes/routes";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/*" element={<AppRoutes />} />
        <Route exact path="/admin/*" element={<AdminAppRoutes />} />
      </Routes>
    </>
  );
}
export default App;
