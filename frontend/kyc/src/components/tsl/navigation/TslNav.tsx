import { IconBuildingFactory, IconBuildings, IconBuildingSkyscraper, IconGauge, IconUser, IconUsers } from "@tabler/icons-react";
import Navigation from "../../navigation/Navigation";
import { TslRoutes } from "../../../routes/Routes";
import SuperAdminMenu from "./TslMenu";
import SuperAdminServices from "../services/TslServices";



const superAdminNavData = [
  { label: "Dashboard", icon: IconGauge, iconColor: 'var(--mantine-color-blue-7)', links: '/tsl' },
  { label: "Companies", icon: IconBuildingSkyscraper, iconColor: 'var(--mantine-color-yellow-7)', links: 'companies' },
  { label: "Users", icon: IconUsers, iconColor: 'var(--mantine-color-grape-7)', links: 'users' },
  
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