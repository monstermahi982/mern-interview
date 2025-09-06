import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster, toast } from "react-hot-toast";

// Lazy imports for pages
const Home = lazy(() => import("./pages/Home"));
const Create = lazy(() => import("./pages/Create"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Setting = lazy(() => import("./pages/Setting"));
const Starter = lazy(() => import("./pages/Starter"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/starter" element={<Starter />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </Suspense>
  );
}

export default App;
