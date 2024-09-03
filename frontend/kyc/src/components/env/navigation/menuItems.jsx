// src/menuItems.jsx
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RoomPreferencesOutlinedIcon from '@mui/icons-material/RoomPreferencesOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

export const getMenuItems = () => [
    { text: "Home", icon: <HomeOutlinedIcon />, path: "." },
    {
        text: "Company Profiles",
        icon: <BusinessOutlinedIcon />,
        path: "company-profiles",
        subOptions: [
            { text: "Create Company Profile", icon: <AddCircleOutlineIcon />, path: "company-profiles/create" },
            { text: "Manage Companies", icon: <RoomPreferencesOutlinedIcon />, path: "company-profiles/manage" }
        ]
    },
    {
        text: "User Profiles",
        icon: <PeopleAltOutlinedIcon />,
        path: "user-profiles",
        subOptions: [
            { text: "Create Users", icon: <AddCircleOutlineIcon />, path: "user-profiles/create" },
            { text: "Manage Users", icon: <ManageAccountsOutlinedIcon />, path: "user-profiles/manage" }
        ]
    },
];
