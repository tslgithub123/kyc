import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';;
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../../auth/login/ProtectedRoute';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Collapse, Divider, useMediaQuery, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import logo from '/logo_small.png';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';;
import { getMenuItems } from './menuItems.jsx';
import AdminRoutes from './AdminRoutes.jsx';
import AdminMenu from './AdminMenu.jsx';

const menuItems = getMenuItems();
const drawerWidth = 240;

function AdminDrawer(props) {
    const [selectedSubIndices, setSelectedSubIndices] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const getInitialSelectedIndex = () => {
        const path = location.pathname;
        if (path.includes('company-profiles')) return 1;
        if (path.includes('user-profiles')) return 2;
        return 0;
    };

    const [selectedIndex, setSelectedIndex] = useState(getInitialSelectedIndex());
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleListItemClick = (event, index, path) => {
        setSelectedIndex(index);
        setSelectedSubIndices({});
        if (path != 'company-profiles' && path != 'user-profiles') {

            navigate(path);
        }
        if (isMobile) {
            setAnchorEl(null);
        }
        handleDrawerClose();
    };

    const handleSubOptionClick = (event, mainIndex, subIndex, path) => {
        setSelectedIndex(mainIndex);
        setSelectedSubIndices(prevState => ({
            ...prevState,
            [mainIndex]: subIndex
        }));
        navigate(path);
    };

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleDrawerClose = () => {
        setIsClosing(true);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openSubMenus, setOpenSubMenus] = useState({});

    const handleClick = (index) => {

        setOpenSubMenus(prevState => ({
            ...prevState,
            [index]: !prevState[index]

        }));

    };

    useEffect(() => {
        const path = location.pathname;
        let initialMainIndex = 0;
        let initialSubIndex = undefined;

        if (path.includes('company-profiles')) {
            initialMainIndex = 1;
            if (path.includes('create')) initialSubIndex = 0;
            else if (path.includes('manage')) initialSubIndex = 1;
        } else if (path.includes('user-profiles')) {
            initialMainIndex = 2;
            if (path.includes('create')) initialSubIndex = 0;
            else if (path.includes('manage')) initialSubIndex = 1;
        }

        setSelectedIndex(initialMainIndex);
        setSelectedSubIndices(prevState => ({
            ...prevState,
            [initialMainIndex]: initialSubIndex
        }));

        if (initialSubIndex !== undefined) {
            setOpenSubMenus(prevState => ({
                ...prevState,
                [initialMainIndex]: true
            }));
        }
    }, [location.pathname]);

    

    const drawer = (
        
        <div>
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        flexGrow: 1,
                        textAlign: 'center',
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '24px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'white',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        backgroundColor: 'error.light',
                        borderRadius: '8px',
                        padding: '8px',
                        marginTop: '32px',
                    }}
                >
                    admin
                </Typography>
            </Toolbar>

            <List sx={{ marginTop: '32px' }}>
                {menuItems.map((item, index) => (
                    <div key={item.text}>
                        <ListItem disablePadding sx={{ marginBottom: '8px' }}>
                            <ListItemButton
                                selected={selectedIndex === index && selectedSubIndices[index] === undefined}
                                onClick={(event) => {
                                    handleListItemClick(event, index, item.path);
                                    if (item.subOptions) {
                                        handleClick(index);
                                    }
                                    if (item.path === '.') {
                                        setMobileOpen(false);
                                    }
                                }}
                                sx={{
                                    mx: '12px',
                                    borderRadius: '12px',
                                    '&.Mui-selected, &:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                        color: 'error.main',
                                        '& .MuiListItemIcon-root': {
                                            color: 'error.main',
                                        },
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.15)',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: 'inherit' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                                {item.subOptions && (
                                    openSubMenus[index] ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />
                                )}
                            </ListItemButton>
                        </ListItem>

                        {item.subOptions && (
                            <Collapse in={openSubMenus[index]}>
                                <List sx={{ marginLeft: '8px' }}>
                                    {item.subOptions.map((subOption, subIndex) => (
                                        <ListItem key={subOption.text} disablePadding>
                                            <ListItemButton
                                                selected={selectedIndex === index && selectedSubIndices[index] === subIndex}
                                                onClick={function (event) { setMobileOpen(false); handleSubOptionClick(event, index, subIndex, subOption.path) }}
                                                sx={{
                                                    mx: '16px',
                                                    marginBottom: '8px',
                                                    borderRadius: '12px',
                                                    '&.Mui-selected, &:hover': {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                                        color: 'error.main',
                                                        '& .MuiListItemIcon-root': {
                                                            color: 'error.main',
                                                        },
                                                    },
                                                    '&.Mui-selected:hover': {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.15)',
                                                    },
                                                }}
                                            >
                                                <ListItemIcon sx={{ color: 'inherit' }}>
                                                    {subOption.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={subOption.text} />
                                            </ListItemButton>
                                        </ListItem>
                                        
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </div>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    boxShadow: 'none'
                }}
            >
                <Toolbar sx={{ color: 'black', backgroundColor: 'white' }}>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                            <img src={logo} alt="logo" style={{ width: 'auto', height: '64px', marginLeft: '8px' }} />
                        </Typography>
                    </div>
                    {auth && (
                        <div>
                            <AdminMenu/>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    backgroundColor: '#e2f7d4',
                    borderRadius: '10px',
                    margin: '0px 8px 0px 8px',
                    marginTop: '64px',
                    height: '100vh',
                }}
            >
                <ProtectedRoute>
                  <AdminRoutes/>
                </ProtectedRoute>
                <Toolbar />
            </Box>
        </Box>
    );
}


export default AdminDrawer;