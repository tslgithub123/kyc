import { IconBuildingFactory, IconBuildings, IconGauge, IconUser } from "@tabler/icons-react";
import Navigation from "../../../navigation/Navigation";
import { ManRoutes } from "../../../../routes/Routes";
import TslServices from "../../../tsl/services/TslServices";
import ManServices from "../services/ManServices";
import ManMenu from "./ManMenu";



const manNavData = [
  { label: "Dashboard", icon: IconGauge, links: '/man' },
  { label: "MPCB", icon: IconBuildingFactory, links: 'mpcb' },
  { label: "Companies", icon: IconBuildings, links: 'companies' },
  { label: "Users", icon: IconUser, links: 'users' },
  
];

export default function ManNav() {
  return (
    <Navigation 
      navdata={manNavData} 
      routes={<ManRoutes />} 
      actions={<ManServices/>} 
      menu={<ManMenu/>}
    />
  );
}