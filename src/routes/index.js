import { Route, Routes as Router } from "react-router-dom";
import Home from "../component/Home";
import Admin from "../component/admin/Admin";
import Management from "../component/management/Management";

const Routes = ()=>{
    return (
        <Router>
            <Route path="/" element={<Home/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/management" element={<Management/>}/>
        </Router>
    )
}

export default Routes;