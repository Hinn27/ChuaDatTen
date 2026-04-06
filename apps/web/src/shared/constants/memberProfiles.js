import { MEMBER_CATEGORY_BY_MEMBER } from './memberCategories.js'

export const MEMBER_PROFILES = {
  a: {
    label: MEMBER_CATEGORY_BY_MEMBER.a.memberLabel,
    displayName: MEMBER_CATEGORY_BY_MEMBER.a.categoryName,
    defaultCategory: MEMBER_CATEGORY_BY_MEMBER.a.categoryKey,
  },
  b: {
    label: MEMBER_CATEGORY_BY_MEMBER.b.memberLabel,
    displayName: MEMBER_CATEGORY_BY_MEMBER.b.categoryName,
    defaultCategory: MEMBER_CATEGORY_BY_MEMBER.b.categoryKey,
  },
  c: {
    label: MEMBER_CATEGORY_BY_MEMBER.c.memberLabel,
    displayName: MEMBER_CATEGORY_BY_MEMBER.c.categoryName,
    defaultCategory: MEMBER_CATEGORY_BY_MEMBER.c.categoryKey,
  },
  d: {
    label: MEMBER_CATEGORY_BY_MEMBER.d.memberLabel,
    displayName: MEMBER_CATEGORY_BY_MEMBER.d.categoryName,
    defaultCategory: MEMBER_CATEGORY_BY_MEMBER.d.categoryKey,
  },
  e: {
    label: MEMBER_CATEGORY_BY_MEMBER.e.memberLabel,
    displayName: MEMBER_CATEGORY_BY_MEMBER.e.categoryName,
    defaultCategory: MEMBER_CATEGORY_BY_MEMBER.e.categoryKey,
  },
}

export function getMemberProfile(member) {
  return MEMBER_PROFILES[member] || MEMBER_PROFILES.a
}

