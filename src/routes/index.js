import { Route, Routes as Router } from "react-router-dom";
import Home from "../component/Home";
import Admin from "../component/admin/Admin";
import Management from "../component/management/Management";
import Delivery from "../component/delivery/Delivery";
import Helpdesk from "../component/helpdesk/Helpdesk";

const Routes = ()=>{
    return (
        <Router>
            <Route path="/" element={<Home/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/delivery" element={<Delivery/>}/>
            <Route path="/helpdesk" element={<Helpdesk/>}/>
            <Route path="/management" element={<Management/>}/>
        </Router>
    )
}

export default Routes;