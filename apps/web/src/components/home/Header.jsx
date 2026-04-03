import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Badge,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Close as CloseIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';

export const Header = ({ onLoginClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { label: 'Home', href: '/#home', hasMenu: true },
    { label: 'About Us', href: '/#about', hasMenu: false },
    { label: 'Shop', href: '/#menu', hasMenu: true },
    { label: 'Blog', href: '/#news', hasMenu: true },
    { label: 'Pages', href: '/#services', hasMenu: true },
    { label: 'Contact', href: '/#contact', hasMenu: false },
  ];

  const handleDrawerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component="a" href={item.href} onClick={handleDrawerToggle}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        background: '#ffffff',
        boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
        borderBottom: '1px solid #ececf2',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: { xs: 72, md: 82 }, justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <Box sx={{ fontSize: '1.4rem' }}>🍽️</Box>
            <Box>
              <Typography sx={{ fontSize: '1.9rem', lineHeight: 1, fontWeight: 900, color: '#111', letterSpacing: -0.8 }}>
                TasteNest
              </Typography>
              <Typography sx={{ fontSize: '0.62rem', color: '#686d79', fontWeight: 700, letterSpacing: 0.5 }}>
                Fast Food Restaurant
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  endIcon={item.hasMenu ? <KeyboardArrowDownIcon sx={{ fontSize: 16 }} /> : null}
                  sx={{
                    color: '#222',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    px: 1.4,
                    py: 0.8,
                    borderRadius: 1.5,
                    '& .MuiButton-endIcon': { ml: 0 },
                    '&:hover': {
                      color: '#FF1654',
                      backgroundColor: 'rgba(255, 22, 84, 0.06)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          )}

          {/* Right Actions */}
          <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              sx={{
                color: '#121212',
                '&:hover': { color: '#FF1654', backgroundColor: 'rgba(255, 22, 84, 0.06)' },
              }}
            >
              <Badge
                badgeContent={0}
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#5cc66a',
                    color: '#111',
                    fontWeight: 700,
                    fontSize: '0.66rem',
                    minWidth: 16,
                    height: 16,
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {!isMobile && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#f9bf1a',
                  color: '#fff',
                  fontWeight: 800,
                  px: 3.2,
                  py: 1.3,
                  borderRadius: 1.3,
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#eaaf08',
                    boxShadow: 'none',
                  },
                }}
              >
                Contact Us
              </Button>
            )}

            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: '#222',
                '&:hover': { color: '#FF1654', backgroundColor: 'rgba(255, 22, 84, 0.06)' },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};
