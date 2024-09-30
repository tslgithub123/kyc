import { IconBuildingFactory, IconBuildings, IconGauge, IconUser } from "@tabler/icons-react";
import Navigation from "../../../navigation/Navigation";
import { ThpRoutes } from "../../../../routes/Routes";
import ThpServices from "../services/ThpServices";
import ThpMenu from "./ThpMenu";




const thpNavData = [
  { label: "Dashboard", icon: IconGauge, links: '/thp' },
  { label: "MPCB", icon: IconBuildingFactory, links: 'mpcb' },
  { label: "Companies", icon: IconBuildings, links: 'companies' },
  { label: "Users", icon: IconUser, links: 'users' },
  
];

export default function ThpNav() {
  return (
    <Navigation 
      navdata={thpNavData} 
      routes={<ThpRoutes />} 
      actions={<ThpServices/>} 
      menu={<ThpMenu/>}
    />
  );
}