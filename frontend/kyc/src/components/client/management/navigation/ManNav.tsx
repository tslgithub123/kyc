import { IconBuildings, IconGauge, IconUser } from "@tabler/icons-react";
import Navigation from "../../../navigation/Navigation";
import { ManRoutes } from "../../../../routes/Routes";
import ManServices from "../services/ManServices";
import ManMenu from "./ManMenu";

const manNavData = [
  { label: "Dashboard", icon: IconGauge, iconColor: 'blue', links: '/man' },
  { label: "Unit", icon: IconBuildings, iconColor: 'yellow', links: 'companies' },
  { label: "Users", icon: IconUser, iconColor: 'grape', links: 'users' },
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