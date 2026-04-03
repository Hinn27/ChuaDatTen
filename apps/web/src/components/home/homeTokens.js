export const homeColors = {
  primary: '#FF1654',
  primaryHover: '#E0134A',
  accent: '#FFD600',
  text: '#101014',
  muted: '#5F6470',
  softBg: '#F5F6F8',
  white: '#FFFFFF',
  dark: '#1F1F1F',
};

export const sectionPadding = { xs: 6, md: 9 };

export const sectionTitleSx = {
  fontWeight: 800,
  fontSize: { xs: '1.9rem', md: '2.4rem' },
  lineHeight: 1.15,
  color: homeColors.text,
};

export const primaryButtonSx = {
  backgroundColor: homeColors.primary,
  color: homeColors.white,
  fontWeight: 700,
  borderRadius: 2,
  px: 3,
  py: 1.25,
  '&:hover': {
    backgroundColor: homeColors.primaryHover,
  },
};

export const ghostYellowButtonSx = {
  backgroundColor: homeColors.accent,
  color: homeColors.text,
  fontWeight: 700,
  borderRadius: 2,
  px: 3,
  py: 1.25,
  '&:hover': {
    backgroundColor: '#f5cc00',
  },
};
