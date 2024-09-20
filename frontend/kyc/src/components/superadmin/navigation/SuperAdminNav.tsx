import { IconBuildingFactory, IconBuildings, IconGauge, IconUser } from "@tabler/icons-react";
import Navigation from "../../navigation/Navigation";
import { SuperAdminRoutes } from "../../../routes/Routes";
import SuperAdminMenu from "./SuperAdminMenu";
import SuperAdminServices from "../services/SuperAdminServices";



const superAdminNavData = [
  { label: "Dashboard", icon: IconGauge, links: '/superadmin' },
  { label: "MPCB", icon: IconBuildingFactory, links: 'mpcb' },
  { label: "Companies", icon: IconBuildings, links: 'companies' },
  { label: "Users", icon: IconUser, links: 'users' },
  
//   {
//     label: "Users",
//     icon: IconUser,
//     initiallyOpened: true,
//     links: [
//       { label: "Create", link: "user/create" },
//       { label: "Manage", link: "user/manage" },
//     ],
//   },
//   {
//     label: "Companies",
//     icon: IconBuilding,
//     links: [
//       { label: "Create", link: "company/create" },
//       { label: "Manage", link: "company/manage" },
//     ],
//   }
];

export default function SuperAdminNav() {
  return (
    <Navigation 
      navdata={superAdminNavData} 
      routes={<SuperAdminRoutes />} 
      actions={<SuperAdminServices/>} 
      menu={<SuperAdminMenu/>}
    />
  );
}