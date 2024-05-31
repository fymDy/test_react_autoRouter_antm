// src/components/Layout.jsx
import { Link, Outlet } from "react-router-dom";
import { getRouteLevel } from "../routes";

const Layout = ({ route }: any) => {
  console.log('Layout---------route',route)
  return(
    <div>
    <main>
      <Outlet />
    </main>
    {  route?.routeLevel==2 &&
       <footer>
       <nav>
         <ul>
           <li>
             <Link to="/protected/home">Home</Link>
           </li>
           <li>
             <Link to="/protected/about">About</Link>
           </li>
           <li>
             <Link to="/protected/dashboard">Dashboard</Link>
           </li>
         </ul>
       </nav>
     </footer>
    }
</div>
  )
};

export default Layout;

