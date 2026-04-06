import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
} from '@mui/material';
import { Reveal } from './Reveal';
import { homeColors, sectionPadding, sectionTitleSx } from './homeTokens';

export const Services = () => {
  const services = [
    { 
      icon: '🍽️', 
      title: 'Afternoon Tea', 
      desc: 'Premium afternoon tea service with fresh pastries and tea selection' 
    },
    { 
      icon: '🚚', 
      title: 'Takeaway & Delivery', 
      desc: 'Quick delivery service with hot and fresh meals' 
    },
    { 
      icon: '🍷', 
      title: 'Wine & Cocktails', 
      desc: 'Extensive wine and cocktail menu curated by experts' 
    },
    { 
      icon: '👨‍🍳', 
      title: 'Affonso Dining', 
      desc: 'Premium dining experience by Chef Affonso' 
    },
  ];

  return (
    <Box component="section" id="services" sx={{ py: sectionPadding }}>
      <Container maxWidth="lg">
        <Reveal>
          <Typography variant="h3" sx={{ ...sectionTitleSx, textAlign: 'center', mb: 5 }}>
            We Provide Best
            <Box component="span" sx={{ display: 'block', color: homeColors.primary }}>
              Services
            </Box>
          </Typography>
        </Reveal>

        <Grid container spacing={3}>
          {services.map((service, idx) => (
            <Grid item xs={12} sm={6} lg={3} key={idx}>
              <Reveal delay={idx * 120}>
                <Card
                  sx={{
                    backgroundColor: idx === 1 ? homeColors.primary : homeColors.softBg,
                    border: 'none',
                    borderRadius: 3,
                    textAlign: 'center',
                    py: 3,
                    px: 2,
                    minHeight: 220,
                    transition: 'transform 240ms ease, box-shadow 240ms ease, background-color 240ms ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      backgroundColor: idx === 1 ? homeColors.primaryHover : homeColors.white,
                      boxShadow: '0 16px 28px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Box sx={{ fontSize: '2.2rem', mb: 1.5 }}>{service.icon}</Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: idx === 1 ? homeColors.white : homeColors.text,
                      fontSize: '1rem',
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: idx === 1 ? 'rgba(255,255,255,0.9)' : homeColors.muted,
                      fontSize: '0.86rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {service.desc}
                  </Typography>
                </Card>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
