import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Divider,
  Fab,
} from '@mui/material';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';
import { Reveal } from './Reveal';
import { homeColors, primaryButtonSx } from './homeTokens';

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    about: [
      { label: 'About Us', href: '#' },
      { label: 'Our Menu', href: '#' },
      { label: 'Features', href: '#' },
      { label: 'News & Blogs', href: '#' },
    ],
    menu: [
      { label: 'Burger', href: '#' },
      { label: 'Pizza', href: '#' },
      { label: 'Steak', href: '#' },
      { label: 'Pasta', href: '#' },
    ],
  };

  return (
    <>
      {showScrollTop && (
        <Fab
          color="error"
          onClick={handleScrollTop}
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: homeColors.primary,
            '&:hover': { backgroundColor: homeColors.primaryHover },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}

      <Box component="footer" sx={{ backgroundColor: homeColors.dark, color: '#fff', py: 6 }}>
        <Container maxWidth="lg">
          <Reveal>
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, fontSize: '1.2rem', fontWeight: 700 }}>
                <span>🍽️</span>
                <span style={{ color: homeColors.primary }}>F.A.T</span>
              </Box>
              <Typography sx={{ color: '#999', mb: 2, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Best Food for Best Restaurants in the world.
              </Typography>
              <Stack direction="row" spacing={1}>
                {['F', 'T', 'I', 'Y'].map((social) => (
                  <IconButton
                    key={social}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      width: 36,
                      height: 36,
                      fontSize: '0.9rem',
                      '&:hover': { backgroundColor: homeColors.primary },
                    }}
                  >
                    {social}
                  </IconButton>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '0.95rem' }}>
                About
              </Typography>
              <Stack spacing={0.8}>
                {footerLinks.about.map((link) => (
                  <Typography
                    key={link.label}
                    component="a"
                    href={link.href}
                    sx={{
                      color: '#999',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      '&:hover': { color: homeColors.primary },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '0.95rem' }}>
                Menu
              </Typography>
              <Stack spacing={0.8}>
                {footerLinks.menu.map((link) => (
                  <Typography
                    key={link.label}
                    component="a"
                    href={link.href}
                    sx={{
                      color: '#999',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      '&:hover': { color: homeColors.primary },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6} md={3.8}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '0.95rem' }}>
                Newsletter
              </Typography>
              <Typography sx={{ color: '#999', mb: 2, fontSize: '0.85rem' }}>
                Get recent news and updates.
              </Typography>
              <Stack spacing={1}>
                <TextField
                  size="small"
                  type="email"
                  placeholder="Email Address"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      '& fieldset': { borderColor: '#444' },
                      '&:hover fieldset': { borderColor: '#666' },
                      '&.Mui-focused fieldset': { borderColor: homeColors.primary },
                    },
                    '& .MuiOutlinedInput-input::placeholder': {
                      color: '#666',
                      opacity: 1,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  size="small"
                  sx={{ ...primaryButtonSx, fontSize: '0.85rem' }}
                >
                  Subscribe
                </Button>
              </Stack>
            </Grid>
          </Grid>
          </Reveal>

          <Divider sx={{ backgroundColor: '#333', mb: 3 }} />

          <Grid container spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item xs={12} sm="auto">
              <Typography sx={{ color: '#999', fontSize: '0.8rem' }}>
                &copy; 2024 F.A.T Restaurant. All Rights Reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} sm="auto">
              <Stack direction="row" spacing={2}>
                <Typography
                  component="a"
                  href="#"
                  sx={{
                    color: '#999',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    '&:hover': { color: homeColors.primary },
                  }}
                >
                  Terms & Conditions
                </Typography>
                <Typography
                  component="a"
                  href="#"
                  sx={{
                    color: '#999',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    '&:hover': { color: homeColors.primary },
                  }}
                >
                  Privacy Policy
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
