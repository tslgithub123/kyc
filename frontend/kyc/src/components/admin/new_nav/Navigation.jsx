import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppShell, Burger, Group, NavLink, Skeleton } from "@mantine/core";
import Home from "./Home";
import Page1 from "./Page1";
import Page2 from "./Page2";
import SubPage1 from "./SubPage1";
import SubPage2 from "./SubPage2";
import { useDisclosure } from "@mantine/hooks";
import AdminRoutes from "../navigation/AdminRoutes";
import { IconBrandMantine } from "@tabler/icons-react";

export default function Navigation() {
  const [opened, { toggle }] = useDisclosure();

  return (
      <AppShell
        header={{ height: { base: 60, md: 70, lg: 80 } }}
        navbar={{
          width: { base: 200, md: 300, lg: 250 },
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        {/* Header */}
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <IconBrandMantine size={30}/>
          </Group>
        </AppShell.Header>

        {/* Navbar with Links */}
        <AppShell.Navbar p="md">
          <NavLink label="Home" component={Link} to="/" />
          
          {/* Option 1 with Suboptions */}
          <NavLink label="Company">
            <NavLink label="Create" component={Link} to="admin/company/profile" />
            <NavLink label="Manage" component={Link} to="admin/company/manage" />
          </NavLink>

          {/* Option 2 with Suboptions */}
          <NavLink label="User">
            <NavLink label="Create" component={Link} to="admin/user/create" />
            <NavLink label="Manage" component={Link} to="admin/user/manage" />
          </NavLink>

          {/* {Array(5).fill(0).map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))} */}
        </AppShell.Navbar>

        {/* Main content - Routes */}
        <AppShell.Main>
          <AdminRoutes/>
        </AppShell.Main>
      </AppShell>
  );
}
