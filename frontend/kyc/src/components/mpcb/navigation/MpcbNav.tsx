import { IconGauge } from "@tabler/icons-react";
import Navigation from "../../navigation/Navigation";
import { MpcbRoutes, SuperAdminRoutes } from "../../../routes/Routes";
import MpcbServices from "../services/MpcbServices";
import MpcbMenu from "./MpcbMenu";


const mpcbNavData = [
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

export default function MpcbNav() {
  return (
    <Navigation 
      navdata={mpcbNavData} 
      routes={<MpcbRoutes />} 
      actions={<MpcbServices/>} 
      menu={<MpcbMenu/>}
    />
  );
}