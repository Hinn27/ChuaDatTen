import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { Reveal } from './Reveal';
import { homeColors, sectionPadding, sectionTitleSx, primaryButtonSx } from './homeTokens';

const benefitItems = [
  'Natural ingredients from trusted farms',
  'Healthy food with balanced nutrition',
  'Hand-crafted recipes by expert chefs',
];

const aboutStats = [
  { value: '14+', label: 'Years Experience' },
  { value: '120+', label: 'Menu Variations' },
  { value: '50K+', label: 'Happy Customers' },
];

export const Features = () => {
  return (
    <Box component="section" id="about" sx={{ py: sectionPadding, backgroundColor: homeColors.white }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" sx={{ mb: { xs: 6, md: 8 } }}>
          <Grid item xs={12} md={5}>
            <Reveal>
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 22, 84, 0.12)',
                    top: -20,
                    left: -20,
                    zIndex: 0,
                  }}
                />

                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80"
                  alt="Chef preparing"
                  onError={(event) => {
                    event.currentTarget.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80'
                  }}
                  sx={{
                    width: '100%',
                    height: { xs: 300, md: 360 },
                    objectFit: 'cover',
                    borderRadius: 4,
                    position: 'relative',
                    zIndex: 1,
                    boxShadow: '0 20px 44px rgba(0,0,0,0.12)',
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    px: 1.5,
                    py: 0.8,
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    border: '1px solid #ececf2',
                    zIndex: 2,
                  }}
                >
                  <Typography sx={{ fontSize: '0.72rem', color: homeColors.primary, fontWeight: 800, letterSpacing: 0.4 }}>
                    WELCOME TO FOODIO
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: homeColors.text, fontWeight: 700 }}>
                    Since 2012
                  </Typography>
                </Box>
              </Box>
            </Reveal>
          </Grid>

          <Grid item xs={12} md={7}>
            <Reveal delay={40}>
              <Typography
                sx={{
                  color: homeColors.primary,
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  mb: 1,
                }}
              >
                WELCOME TO FOODIO
              </Typography>
            </Reveal>

            <Reveal delay={90}>
              <Typography variant="h4" sx={{ ...sectionTitleSx, fontSize: { xs: '1.9rem', md: '2.2rem' }, mb: 1.5 }}>
                Feel The Taste
                <Box component="span" sx={{ display: 'block', color: homeColors.primary }}>
                  of Foods
                </Box>
              </Typography>
            </Reveal>

            <Reveal delay={170}>
              <Typography sx={{ color: homeColors.muted, mb: 2.4, lineHeight: 1.72 }}>
                We combine premium ingredients, warm service, and chef-driven techniques to create memorable dishes
                for families, friends, and food lovers every day.
              </Typography>
            </Reveal>

            <Reveal delay={220}>
              <Stack spacing={0.9} sx={{ mb: 2.2 }}>
                {benefitItems.map((item) => (
                  <Typography key={item} sx={{ color: homeColors.text, fontSize: '0.94rem' }}>
                    ✓ {item}
                  </Typography>
                ))}
              </Stack>
            </Reveal>

            <Reveal delay={280}>
              <Grid container spacing={1.2}>
                {aboutStats.map((stat) => (
                  <Grid item xs={4} key={stat.label}>
                    <Box
                      sx={{
                        border: '1px solid #ececf2',
                        borderRadius: 2.5,
                        px: 1.5,
                        py: 1.25,
                        textAlign: 'center',
                        backgroundColor: '#fff',
                      }}
                    >
                      <Typography sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 800, color: homeColors.text }}>
                        {stat.value}
                      </Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: homeColors.muted }}>{stat.label}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Reveal>
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Reveal>
              <Typography variant="h4" sx={{ ...sectionTitleSx, fontSize: { xs: '1.9rem', md: '2.2rem' }, mb: 1.5 }}>
                Good Food Steak &
                <Box component="span" sx={{ display: 'block', color: homeColors.primary }}>
                  Great Restaurant
                </Box>
              </Typography>
            </Reveal>

            <Reveal delay={90}>
              <Typography sx={{ color: homeColors.muted, mb: 2.5, lineHeight: 1.72 }}>
                Quisque ullamcorper mattis elit, euismod feugiat tellus varius vel. Vestibulum ac ante finibus.
              </Typography>
            </Reveal>

            <Reveal delay={170}>
              <Stack spacing={0.8} sx={{ mb: 2.5 }}>
                {['Fresh Food', 'Premium Quality', 'Best Chef'].map((item) => (
                  <Typography key={item} sx={{ color: homeColors.text, fontSize: '0.95rem' }}>
                    ✓ {item}
                  </Typography>
                ))}
              </Stack>
            </Reveal>

            <Reveal delay={240}>
              <Button variant="contained" sx={primaryButtonSx}>
                Discover More
              </Button>
            </Reveal>
          </Grid>

          <Grid item xs={12} md={5} sx={{ position: 'relative' }}>
            <Reveal direction="left" delay={120}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  backgroundColor: homeColors.accent,
                  color: homeColors.text,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  textAlign: 'center',
                  fontWeight: 700,
                  zIndex: 2,
                }}
              >
                <Box sx={{ fontSize: '1.2rem', fontWeight: 800 }}>20%</Box>
                <Box sx={{ fontSize: '0.7rem' }}>Discount</Box>
              </Box>

              <Box
                component="img"
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Steak"
                sx={{ width: '100%', height: 'auto', borderRadius: 3, objectFit: 'cover' }}
              />
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
