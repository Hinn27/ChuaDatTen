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

const mockProducts = [
  {
    id: 1,
    name: 'Classic Steak',
    oldPrice: '$45.00',
    currentPrice: '$35.00',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    sales: 125,
    tagline: 'HOT SALE 20% OFF',
    ingredients: ['🥩 Premium Beef', '🥦 Veggies', '🥔 Potato', '🍷 Sauce']
  },
  {
    id: 2,
    name: 'Truffle Pasta',
    oldPrice: '$32.00',
    currentPrice: '$25.00',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    sales: 310,
    tagline: 'HOT SALE 15% OFF',
    ingredients: ['🍝 Pasta', '🍄 Truffle', '🧀 Parmesan', '🌿 Herbs']
  },
  {
    id: 3,
    name: 'Chicken Bacon Burger',
    oldPrice: '$29.99',
    currentPrice: '$19.90',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    sales: 850,
    tagline: 'HOT SALE 33% OFF',
    ingredients: ['🍗 Meat', '🥬 Lettuce', '🧀 Cheese', '🍞 Bun']
  }
];

export const DealOfTheWeek = () => {
  const bestSeller = mockProducts.reduce((prev, current) =>
    (prev.sales > current.sales) ? prev : current
  );

  return (
    <Box component="section" sx={{ py: sectionPadding, backgroundColor: homeColors.softBg }}>
      <Container maxWidth="lg">
        <Reveal>
          <Typography variant="h4" sx={{ ...sectionTitleSx, mb: 4 }}>
            Deal of the
            <Box component="span" sx={{ display: 'block', color: homeColors.primary }}>
              Week
            </Box>
          </Typography>
        </Reveal>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Reveal>
            <Box>
              <Box
                sx={{
                  backgroundColor: homeColors.accent,
                  color: homeColors.text,
                  px: 2,
                  py: 0.75,
                  borderRadius: 1.5,
                  display: 'inline-block',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  mb: 2,
                }}
              >
                {bestSeller.tagline}
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  color: homeColors.text,
                  fontSize: { xs: '1.6rem', md: '1.8rem' },
                }}
              >
                {bestSeller.name}
              </Typography>

              <Typography
                sx={{
                  color: homeColors.muted,
                  fontWeight: 500,
                  mb: 2,
                  fontSize: '0.95rem',
                }}
              >
                🔥 {bestSeller.sales} people bought this recently!
              </Typography>

              <Stack spacing={0.5} sx={{ mb: 3 }}>
                {['Fresh Ingredients', 'Tasty Meals', 'Quick Delivery'].map((item) => (
                  <Typography key={item} sx={{ color: homeColors.muted, fontSize: '0.9rem' }}>
                    ✓ {item}
                  </Typography>
                ))}
              </Stack>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography
                  sx={{
                    color: '#999',
                    textDecoration: 'line-through',
                    fontSize: '1rem',
                  }}
                >
                  {bestSeller.oldPrice}
                </Typography>
                <Typography
                  sx={{
                    color: homeColors.primary,
                    fontSize: '1.6rem',
                    fontWeight: 800,
                  }}
                >
                  {bestSeller.currentPrice}
                </Typography>
              </Box>

              <Button variant="contained" sx={primaryButtonSx}>
                Order Now
              </Button>
            </Box>
            </Reveal>
          </Grid>

          <Grid item xs={12} md={7} sx={{ position: 'relative' }}>
            <Reveal direction="left" delay={150}>
              <Box
                component="img"
                src={bestSeller.image}
                alt={bestSeller.name}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 3,
                  objectFit: 'cover',
                }}
              />

              {bestSeller.ingredients.map((ing, idx) => (
                <Box
                  key={idx}
                  sx={{
                    position: 'absolute',
                    backgroundColor: homeColors.accent,
                    color: homeColors.text,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1.2,
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    zIndex: 10,
                    top: `${15 + idx * 20}%`,
                    right: 10,
                  }}
                >
                  {ing}
                </Box>
              ))}
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
