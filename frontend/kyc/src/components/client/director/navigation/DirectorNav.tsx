import { IconGauge } from "@tabler/icons-react";
import MpcbServices from "../services/DirectorServices";
import MpcbMenu from "./DirectorMenu";
import Navigation from "../../../navigation/Navigation";
import { DirectorRoutes } from "../../../../routes/Routes";


const directorNavData = [
  { label: "Dashboard", icon: IconGauge, links: '/mpcb' },
  { label: "Statistics", icon: IconGauge, links: 'statistics' },
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

export default function DirectorNav() {
  return (
    <Navigation 
      navdata={directorNavData} 
      routes={<DirectorRoutes />} 
      actions={<MpcbServices/>} 
      menu={<MpcbMenu/>}
    />
  );
}