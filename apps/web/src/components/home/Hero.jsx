import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Reveal } from './Reveal';
import { homeColors, sectionPadding, sectionTitleSx, primaryButtonSx, ghostYellowButtonSx } from './homeTokens';

export const Hero = ({ onLoginClick }) => {
  return (
    <Box
      id="home"
      component="section"
      sx={{
        py: { xs: 6, md: 8.5 },
        backgroundColor: '#f3f3fa',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" sx={{ minHeight: { md: 620 } }}>
          <Grid item xs={12} md={5.7} sx={{ zIndex: 2 }}>
            <Reveal>
              <Typography
                variant="h2"
                sx={{
                  ...sectionTitleSx,
                  fontSize: { xs: '2.2rem', md: '4rem' },
                  lineHeight: 1.06,
                  mb: 1,
                  letterSpacing: -1.2,
                }}
              >
                Best Food for
                <Box
                  component="span"
                  sx={{
                    color: '#101014',
                    display: 'inline-block',
                    mt: 0.8,
                    px: 1.2,
                    borderRadius: 4,
                    backgroundColor: '#ffd428',
                  }}
                >
                  Best Restaurants
                </Box>
              </Typography>
            </Reveal>

            <Reveal delay={120}>
              <Typography
                variant="body1"
                sx={{ color: '#5c5f68', mb: 3, lineHeight: 1.6, fontWeight: 700, letterSpacing: 0.8, fontSize: '1rem' }}
              >
                ARRIVING FROM PARIS IN 1986
              </Typography>
            </Reveal>

            <Reveal delay={190}>
              <Stack spacing={1.4} sx={{ maxWidth: 470 }}>
                <TextField
                  size="medium"
                  placeholder="No of Guest"
                  fullWidth
                  sx={{
                    backgroundColor: '#fff',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      '& fieldset': { borderColor: '#d9d9df' },
                    },
                  }}
                />

                <Grid container spacing={1.4}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      size="medium"
                      placeholder="Date"
                      fullWidth
                      sx={{
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1.5,
                          '& fieldset': { borderColor: '#d9d9df' },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      size="medium"
                      placeholder="Time"
                      fullWidth
                      sx={{
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1.5,
                          '& fieldset': { borderColor: '#d9d9df' },
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      ...primaryButtonSx,
                      borderRadius: 1.4,
                      px: 3.3,
                      py: 1.2,
                      border: '2px solid #fff',
                      boxShadow: '0 0 0 2px #ff3a69',
                    }}
                  >
                    Reserve a Table
                  </Button>
                </Box>
              </Stack>
            </Reveal>
          </Grid>

          <Grid item xs={12} md={6.3} sx={{ position: 'relative', overflow: 'visible' }}>
            <Reveal direction="left" delay={120}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 460, md: 620 },
                  overflow: 'visible',
                  isolation: 'isolate',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: 8, md: 26 },
                    right: { xs: 8, md: 36 },
                    backgroundColor: '#fff',
                    color: '#101014',
                    pl: 1.2,
                    pr: 1.8,
                    py: 1.1,
                    borderRadius: 8,
                    fontWeight: 800,
                    fontSize: '0.86rem',
                    zIndex: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    boxShadow: '0 14px 26px rgba(20,20,20,0.08)',
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      backgroundColor: '#ffd428',
                    }}
                  >
                    <LocalShippingOutlinedIcon sx={{ fontSize: 20 }} />
                  </Box>
                  Free Delivery 7
                  <br />
                  Days a Week
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    width: { xs: 270, md: 500 },
                    height: { xs: 170, md: 330 },
                    backgroundColor: '#ff1f57',
                    borderRadius: '200px 200px 0 0',
                    right: { xs: -44, md: -130 },
                    bottom: { xs: -12, md: -66 },
                    transform: 'rotate(0deg)',
                    zIndex: 0,
                    opacity: 1,
                  }}
                />

                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80"
                  alt="Food dish"
                  onError={(event) => {
                    event.currentTarget.src = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80'
                  }}
                  sx={{
                    width: { xs: 220, md: 320 },
                    height: { xs: 330, md: 520 },
                    borderRadius: '130px',
                    objectFit: 'cover',
                    boxShadow: '0 24px 56px rgba(0,0,0,0.18)',
                    zIndex: 2,
                    position: 'absolute',
                    left: { xs: 8, md: 18 },
                    top: { xs: 70, md: 36 },
                  }}
                />

                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1528607929212-2636ec44253e?auto=format&fit=crop&w=900&q=80"
                  alt="Secondary dish"
                  onError={(event) => {
                    event.currentTarget.src = 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80'
                  }}
                  sx={{
                    width: { xs: 180, md: 300 },
                    height: { xs: 280, md: 420 },
                    position: 'absolute',
                    right: { xs: 6, md: 20 },
                    bottom: { xs: 18, md: -14 },
                    borderRadius: '130px',
                    objectFit: 'cover',
                    border: '7px solid #f3f3fa',
                    zIndex: 3,
                    boxShadow: '0 12px 34px rgba(0,0,0,0.16)',
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    width: { xs: 66, md: 92 },
                    height: { xs: 66, md: 92 },
                    border: '3px solid rgba(72,72,72,0.35)',
                    borderRadius: '50%',
                    left: { xs: -20, md: -64 },
                    bottom: { xs: 90, md: 36 },
                    zIndex: -1,
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    width: { xs: 56, md: 74 },
                    height: { xs: 56, md: 74 },
                    border: '3px solid rgba(72,72,72,0.35)',
                    borderRadius: '50%',
                    left: { xs: 56, md: 160 },
                    bottom: { xs: 14, md: -24 },
                    zIndex: 1,
                  }}
                />
              </Box>
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
