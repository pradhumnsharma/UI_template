import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import TableList from "views/TableList/TableList";
import Typography from "views/Typography/Typography";
import Icons from "views/Icons/Icons";
import Maps from "views/Maps/Maps";
import Notifications from "views/Notifications/Notifications";
import Upgrade from "views/Upgrade/Upgrade";
import Addproduct from '../add_products';
// import ProductList from 'views/TableList/ProductList';
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/add_product",
    name: "Add new product",
    icon: "pe-7s-user",
    component: Addproduct
  },

  {
    path: "/table",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList
  }
];

export default dashboardRoutes;
