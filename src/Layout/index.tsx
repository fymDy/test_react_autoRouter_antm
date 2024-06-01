// src/components/Layout.jsx
import { Link, Outlet } from "react-router-dom";
import { getRouteLevel } from "../routes";
import Styles from "./index.module.scss";
const Layout = ({ route }: any) => {
  console.log('Layout---------route',route)
  return(
    <div className={Styles.layoutPage}>
      {/* <header>
        
      </header> */}
    <main className={Styles.layoutMain}>
      <Outlet />
    </main>
    {  route?.routeLevel==2 &&
    
         <ul className={Styles.footerBar}>
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
  
    }
</div>
  )
};

export default Layout;

