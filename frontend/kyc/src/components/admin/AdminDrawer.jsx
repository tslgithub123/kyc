import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Route, Routes } from 'react-router-dom';
import CompanyProfiles from './CompanyProfiles';
import UserProfiles from './UserProfiles';
import ProtectedRoute from '../auth/login/ProtectedRoute';
import AdminDashboard from './AdminDashboard';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutButton from '../ui/LogoutButton';
import { useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import logo from '../../../public/logo_small.png';

const drawerWidth = 260;

function AdminDrawer(props) {
    const theme = useTheme();

    const [selectedIndex, setSelectedIndex] = useState(0);
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        if (isMobile) {
            setAnchorEl(null);
        }
        handleDrawerClose();    
    };

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
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

    const drawer = (
        <div>
          <Toolbar>
                {/* <Typography variant="h6" noWrap>
                KYC
                </Typography> */}
            <img src={logo} alt="logo" style={{ width: '100px', height: 'auto', marginLeft: '8px' }} />

          </Toolbar>
      
          <List>
            {[
              { text: "Home", icon: <HomeOutlinedIcon />, path: "." },
              { text: "Company Profiles", icon: <BusinessOutlinedIcon />, path: "company-profiles" },
              { text: "User Profiles", icon: <PeopleAltOutlinedIcon />, path: "user-profiles" },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding sx={{ marginBottom: '8px' }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={selectedIndex === index}
                  onClick={(event) => handleListItemClick(event, index)}
                  sx={{
                    mx: '16px',
                    borderRadius: '12px',
                    '&.Mui-selected, &:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                      color: 'primary.main',
                      '& .MuiListItemIcon-root': {
                        color: 'primary.main',
                      },
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit' , marginLeft: '8px'}}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        
        <Box sx={{ display: 'flex'}}>
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
                    <Typography variant="h6" noWrap component="div">
                        Admin
                    </Typography>
                    <div style={{ flexGrow: 1 }}></div>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem><LogoutButton /></MenuItem>
                            </Menu>
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
                    backgroundColor: '#eff2f6',
                    borderRadius: '10px',
                    margin: '0px 8px 0px 8px',
                    marginTop: '64px',
                    height: '100vh',
                }}
            >

                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    {/* <Route path="company-profiles" element={<CompanyProfiles />} /> */}
                    <Route path="user-profiles" element={<UserProfiles />} />
                </Routes>
                <Toolbar /> {/* Ensure Toolbar takes up space */}

            </Box>
        </Box>
    );
}

export default AdminDrawer;
