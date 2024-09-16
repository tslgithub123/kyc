import { memo, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { NavLink, useLocation } from 'react-router-dom';
import classes from './NavbarLinksGroup.module.css';

interface Link {
  link: string;
  label: string;
}

interface NavbarLinksGroupProps {
  icon: React.ComponentType<{ style: React.CSSProperties }>;
  label: string;
  initiallyOpened?: boolean;
  links?: Link[] | string;
  onLinkClick?: () => void;
}

const NavbarLinksGroup = ({
  icon: Icon,
  label,
  initiallyOpened = false,
  links,
  onLinkClick,
}: NavbarLinksGroupProps) => {
  const hasLinks = Array.isArray(links);
  const isSingleLink = (typeof links === 'string');
  const [opened, setOpened] = useState(initiallyOpened);
  const location = useLocation();

  const handleLinkClick = useCallback(() => {
    if (onLinkClick) {
      onLinkClick();
    }
  }, [onLinkClick]);

  const items = (hasLinks ? links : []).map((link: Link) => (
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

  return (
    <>
      {isSingleLink ? (
        <NavLink
          to={links as string}
          style={{ textDecoration: 'none' }}
          className={`${classes.control} ${location.pathname === links ? classes.activeLink : ''}`}
          onClick={handleLinkClick}
        >
          {content}
        </NavLink>
      ) : (
        <UnstyledButton 
          onClick={() => setOpened((o) => !o)} 
          className={`${classes.control} ${isSingleLink ? classes.activeLink : ''}`}
        >
          {content}
        </UnstyledButton>
      )}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

export default memo(NavbarLinksGroup);
