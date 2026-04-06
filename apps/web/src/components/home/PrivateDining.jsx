import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { Reveal } from './Reveal';
import { homeColors, sectionPadding, sectionTitleSx, primaryButtonSx } from './homeTokens';

export const PrivateDining = () => {
  return (
    <Box component="section" sx={{ py: sectionPadding, backgroundColor: homeColors.softBg }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Reveal>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Restaurant"
                    sx={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 3 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="Food"
                    sx={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 3 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="Dining"
                    sx={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 3 }}
                  />
                </Grid>
              </Grid>
            </Reveal>
          </Grid>

          <Grid item xs={12} md={6}>
            <Reveal>
              <Typography variant="h4" sx={{ ...sectionTitleSx, mb: 1.5 }}>
                Private Dining and
                <Box component="span" sx={{ display: 'block', color: homeColors.primary }}>
                  Events
                </Box>
              </Typography>
            </Reveal>

            <Reveal delay={120}>
              <Typography sx={{ color: homeColors.muted, mb: 3, lineHeight: 1.72 }}>
                Quisque ullamcorper mattis elit, euismod feugiat tellus varius vel. Vestibulum ac ante finibus.
              </Typography>
            </Reveal>

            <Reveal delay={200}>
              <Button variant="contained" sx={primaryButtonSx}>
                Book Now
              </Button>
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
