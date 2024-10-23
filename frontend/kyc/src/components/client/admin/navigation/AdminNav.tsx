import { IconBuildingSkyscraper, IconGauge, IconUsers } from "@tabler/icons-react";

import { AdminRoutes} from "../../../../routes/Routes";
import Navigation from "../../../navigation/Navigation";
import AdminMenu from "./AdminMenu";
import AdminServices from "../services/AdminServices";
import axios from "axios";


const fetchNotifications = () => {
  axios.get('http://localhost:8080/api/notifications')
}


const adminNavData = [
  { label: "Dashboard", icon: IconGauge, iconColor: 'var(--mantine-color-blue-7)', links: '/admin' },
  { label: "Company", icon: IconBuildingSkyscraper, iconColor: 'var(--mantine-color-green-7)', links: 'company' },
  { label: "Users", icon: IconUsers, iconColor: 'var(--mantine-color-grape-7)', links: 'users' },
  // {
  //   label: "Companies",
  //   icon: IconBuilding,
  //   links: [
  //     { label: "Create", link: "company/create" },
  //     { label: "Manage", link: "company/manage" },
  //   ],
  // }
];

export default function AdminNav() {
  return (
    <Navigation 
      navdata={adminNavData} 
      routes={<AdminRoutes />} 
      actions={<AdminServices/>} 
      menu={<AdminMenu/>}
    />
  );
}