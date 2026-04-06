import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
} from '@mui/material';
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import { Reveal } from './Reveal';
import { homeColors } from './homeTokens';

export const HighlightFeatures = () => {
  const images = [
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  ];

  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 7, md: 10 },
        background: `linear-gradient(135deg, ${homeColors.primary} 0%, #ff4f83 100%)`,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={5}>
            <Reveal>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.85rem', md: '2.55rem' },
                  fontWeight: 800,
                  mb: 3,
                  color: '#fff',
                  lineHeight: 1.22,
                }}
              >
                Highlighting Its
                <Box component="span" sx={{ display: 'block' }}>Unique Features and</Box>
                Experiences
              </Typography>
            </Reveal>

            <Reveal delay={140}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  sx={{
                    backgroundColor: homeColors.accent,
                    color: homeColors.primary,
                    width: 60,
                    height: 60,
                    '&:hover': {
                      backgroundColor: '#f5cc00',
                    },
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: '1.8rem' }} />
                </IconButton>
                <Typography sx={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>
                  Watch Video
                </Typography>
              </Box>
            </Reveal>
          </Grid>

          <Grid item xs={12} md={7}>
            <Reveal direction="left" delay={120}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    component="img"
                    src={images[0]}
                    alt="Highlight 1"
                    sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.22)' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    component="img"
                    src={images[1]}
                    alt="Highlight 2"
                    sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.22)' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    component="img"
                    src={images[2]}
                    alt="Highlight 3"
                    sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.22)' }}
                  />
                </Grid>
              </Grid>
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
