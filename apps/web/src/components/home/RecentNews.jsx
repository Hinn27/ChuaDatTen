import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { Reveal } from './Reveal';
import { homeColors, sectionPadding, sectionTitleSx } from './homeTokens';

const newsItems = [
  {
    img: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    date: 'Dec 01, 2023',
    title: 'Discover Unique Menu',
    author: 'Admin'
  },
  {
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    date: 'Dec 03, 2023',
    title: 'A Fine Baker',
    author: 'Admin'
  },
  {
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    date: 'Dec 05, 2023',
    title: 'Excellent Food Promo',
    author: 'Admin'
  }
];

export const RecentNews = () => {
  return (
    <Box component="section" id="news" sx={{ py: sectionPadding, backgroundColor: homeColors.white }}>
      <Container maxWidth="lg">
        <Reveal>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h3" sx={sectionTitleSx}>
              Recent
              <Box component="span" sx={{ display: 'block', color: homeColors.primary }}>
                News
              </Box>
            </Typography>
          </Box>
        </Reveal>

        <Grid container spacing={3}>
          {newsItems.map((news, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Reveal delay={idx * 120}>
                <Card
                  sx={{
                    backgroundColor: homeColors.white,
                    border: '1px solid #ececf2',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'transform 240ms ease, box-shadow 240ms ease',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0 12px 30px rgba(16,16,20,0.12)',
                      transform: 'translateY(-6px)',
                    },
                  }}
                >
                  <CardMedia component="img" height={200} image={news.img} alt={news.title} sx={{ objectFit: 'cover' }} />
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="caption" sx={{ color: '#9aa0ac', fontSize: '0.85rem', mb: 0.75, display: 'block' }}>
                      {news.date}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: homeColors.text, fontSize: '1rem', lineHeight: 1.4 }}>
                      {news.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Typography sx={{ fontSize: '1rem' }}>👤</Typography>
                      <Typography sx={{ color: homeColors.muted, fontSize: '0.85rem' }}>{news.author}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
