import { DEFAULT_MEMBER, MEMBERS } from '../../shared/constants/members.js'

/**
 * @param {string} member
 * @returns {boolean}
 */
export function isValidMember(member) {
  return MEMBERS.includes(member)
}

/**
 * @param {string} member
 * @returns {string}
 */
export function getSafeMember(member) {
  return isValidMember(member) ? member : DEFAULT_MEMBER
}

/**
 * @param {string} member
 * @returns {{shop:string, products:string, productDetail:string, cart:string, checkout:string}}
 */
export function getMemberRoutes(member) {
  const safeMember = getSafeMember(member)

  return {
    shop: `/${safeMember}/shop`,
    products: `/${safeMember}/products`,
    productDetail: `/${safeMember}/products/:id`,
    cart: `/${safeMember}/cart`,
    checkout: `/${safeMember}/checkout`,
  }
}
