import { IconBuildingFactory, IconBuildings, IconGauge, IconUser } from "@tabler/icons-react";
import Navigation from "../../navigation/Navigation";
import { TslRoutes } from "../../../routes/Routes";
import SuperAdminMenu from "./TslMenu";
import SuperAdminServices from "../services/TslServices";



const superAdminNavData = [
  { label: "Dashboard", icon: IconGauge, links: '/tsl' },
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

export default function TslNav() {
  return (
    <Navigation 
      navdata={superAdminNavData} 
      routes={<TslRoutes />} 
      actions={<SuperAdminServices/>} 
      menu={<SuperAdminMenu/>}
    />
  );
}