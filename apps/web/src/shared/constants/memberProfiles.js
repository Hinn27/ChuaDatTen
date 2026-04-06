export const MEMBER_PROFILES = {
  a: { label: 'A', displayName: 'Com', defaultCategory: 'Com' },
  b: { label: 'B', displayName: 'BunPho', defaultCategory: 'BunPho' },
  c: { label: 'C', displayName: 'MonChien', defaultCategory: 'MonChien' },
  d: { label: 'D', displayName: 'DoUong', defaultCategory: 'DoUong' },
  e: { label: 'E', displayName: 'TrangMieng', defaultCategory: 'TrangMieng' },
}

export function getMemberProfile(member) {
  return MEMBER_PROFILES[member] || MEMBER_PROFILES.a
}

