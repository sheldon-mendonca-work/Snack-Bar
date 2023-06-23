import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";

const AllRoutes = () => {
    return <Routes>
        <Route path="/" element={<HomePage />} />
    </Routes>
}

export default AllRoutes;