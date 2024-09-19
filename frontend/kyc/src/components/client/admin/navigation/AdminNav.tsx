import { IconBuilding, IconGauge, IconUser } from "@tabler/icons-react";

import { AdminRoutes} from "../../../../routes/Routes";
import Navigation from "../../../navigation/Navigation";
import AdminMenu from "./AdminMenu";
import AdminServices from "../services/AdminServices";


const adminNavData = [
  { label: "Dashboard", icon: IconGauge, links: '/admin' },
  { label: "Users", icon: IconUser, links: 'users' },
  {
    label: "Companies",
    icon: IconBuilding,
    links: [
      { label: "Create", link: "company/create" },
      { label: "Manage", link: "company/manage" },
    ],
  }
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