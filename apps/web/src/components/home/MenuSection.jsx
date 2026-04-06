import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { Reveal } from './Reveal';
import { homeColors, sectionPadding, sectionTitleSx } from './homeTokens';

export function MenuSection() {
  const menuCategories = [
    {
      name: 'Breakfast',
      items: [
        { name: 'Bánh Mì Ốp La', price: '25,000đ', desc: 'Bánh mì giòn, trứng ốp la, đồ chua' },
        { name: 'Xôi Mặn', price: '20,000đ', desc: 'Xôi dẻo, hành phi, chả lụa, trứng muối' },
        { name: 'Phở Bò', price: '45,000đ', desc: 'Phở bò truyền thống, nước dùng hầm xương' }
      ]
    },
    {
      name: 'Lunch',
      items: [
        { name: 'Cơm Tấm Sườn', price: '40,000đ', desc: 'Sườn nướng, bì, chả, trứng ốp la' },
        { name: 'Bún Chả Hà Nội', price: '35,000đ', desc: 'Chả viên, chả miếng, bún, rau sống' },
        { name: 'Cá Kho Tộ', price: '50,000đ', desc: 'Cá lóc kho tộ, canh chua, cơm trắng' }
      ]
    },
    {
      name: 'Dinner',
      items: [
        { name: 'Lẩu Thái', price: '120,000đ', desc: 'Lẩu hải sản chua cay kiểu Thái' },
        { name: 'Gà Nướng Mật Ong', price: '85,000đ', desc: 'Gà ta nướng mật ong, kèm rau xanh' },
        { name: 'Bò Lúc Lắc', price: '95,000đ', desc: 'Thịt bò Úc xào với rau củ, nước sốt đặc biệt' }
      ]
    }
  ];

  return (
    <Box component="section" id="menu" sx={{ py: sectionPadding, backgroundColor: homeColors.softBg }}>
      <Container maxWidth="lg">
        <Reveal>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h3" sx={sectionTitleSx}>
              Delicious
              <Box component="span" sx={{ display: 'block', color: homeColors.primary }}>
                Menus
              </Box>
            </Typography>
          </Box>
        </Reveal>

        <Grid container spacing={4}>
          {menuCategories.map((category, categoryIdx) => (
            <Grid item xs={12} md={4} key={category.name}>
              <Reveal delay={categoryIdx * 100}>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 2, color: homeColors.text }}>
                    {category.name}
                  </Typography>

                  <Stack spacing={1.5}>
                    {category.items.map((item) => (
                      <Card
                        key={item.name}
                        sx={{
                          backgroundColor: homeColors.white,
                          border: '1px solid #ececf2',
                          borderRadius: 2,
                          transition: 'transform 220ms ease, box-shadow 220ms ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 10px 28px rgba(13, 17, 23, 0.09)',
                          },
                        }}
                      >
                        <CardContent sx={{ pb: 1.5, pt: 1.5, px: 1.5, '&:last-child': { pb: 1.5 } }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: homeColors.text, fontSize: '0.95rem' }}>
                              {item.name}
                            </Typography>
                            <Typography sx={{ color: homeColors.primary, fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap', ml: 1 }}>
                              {item.price}
                            </Typography>
                          </Box>
                          <Typography variant="caption" sx={{ color: homeColors.muted, fontSize: '0.8rem', lineHeight: 1.4 }}>
                            {item.desc}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </Box>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
