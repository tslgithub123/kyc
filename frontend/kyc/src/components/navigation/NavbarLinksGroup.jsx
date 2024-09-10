import { useState, useEffect } from 'react';
import { Group, Box, Collapse, ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { NavLink, useLocation } from 'react-router-dom';
import classes from './NavbarLinksGroup.module.css';

export default function NavbarLinksGroup({ icon: Icon, label, initiallyOpened, links, onLinkClick }) {
  const hasLinks = Array.isArray(links);
  const isSingleLink = typeof links === 'string';
  const [opened, setOpened] = useState(initiallyOpened || false);
  const location = useLocation();

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  const items = (hasLinks ? links : []).map((link) => (
    <NavLink
      to={link.link}
      key={link.label}
      className={({ isActive }) =>
        `${classes.link} ${isActive ? classes.activeLink : ''}`
      }
      onClick={handleLinkClick}
    >
      {link.label}
    </NavLink>
  ));

  const content = (
    <Group justify="space-between" gap={0}>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <ThemeIcon variant="light" size={30}>
          <Icon style={{ width: rem(18), height: rem(18) }} />
        </ThemeIcon>
        <Box ml="md">{label}</Box>
      </Box>
      {hasLinks && (
        <IconChevronRight
          className={classes.chevron}
          stroke={1.5}
          style={{
            width: rem(16),
            height: rem(16),
            transform: opened ? 'rotate(-90deg)' : 'none',
          }}
        />
      )}
    </Group>
  );

  const isGroupActive = hasLinks && links.some(link => {
    return link.link && location.pathname.startsWith(link.link);
  });
  
  const isSingleLinkActive = isSingleLink && location.pathname === links;

  return (
    <>
      {isSingleLink ? (
        <NavLink
          to={links}
          style={{ textDecoration: 'none'}}
          className={`${classes.control} ${isSingleLinkActive ? classes.activeLink : ''}`}
          onClick={handleLinkClick}
        >
          {content}
        </NavLink>
      ) : (
        <UnstyledButton 
          onClick={() => setOpened((o) => !o)} 
          className={`${classes.control} ${isGroupActive ? classes.activeLink : ''}`}
        >
          {content}
        </UnstyledButton>
      )}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
