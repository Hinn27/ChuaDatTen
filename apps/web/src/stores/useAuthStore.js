import { create } from 'zustand'
import { supabase } from '../services/supabaseClient.js'

/**
 * @typedef {Object} AuthUser
 * @property {string} id
 * @property {string} email
 * @property {string} [fullName]
 * @property {string} [phone]
 * @property {string} [avatarUrl]
 */

/**
 * Auth Store — quản lý trạng thái đăng nhập / đăng ký
 * Sử dụng Supabase Auth (JWT + session)
 */
const useAuthStore = create((set, get) => ({
  /** @type {AuthUser|null} */
  user: null,
  /** @type {string|null} */
  token: null,
  isLoggedIn: false,
  loading: false,
  /** @type {string|null} */
  error: null,

  /**
   * Đăng nhập bằng email + password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<boolean>} true nếu thành công
   */
  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      const user = {
        id: data.user.id,
        email: data.user.email,
        fullName: data.user.user_metadata?.full_name || '',
        phone: data.user.user_metadata?.phone || '',
        avatarUrl: data.user.user_metadata?.avatar_url || '',
      }
      const token = data.session.access_token

      localStorage.setItem('access_token', token)
      set({ user, token, isLoggedIn: true, loading: false })
      return true
    } catch (error) {
      set({ error: error.message, loading: false })
      return false
    }
  },

  /**
   * Đăng ký tài khoản mới
   * @param {string} email
   * @param {string} password
   * @param {Object} metadata - { fullName, phone }
   * @returns {Promise<boolean>} true nếu thành công
   */
  register: async (email, password, metadata = {}) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata.fullName || '',
            phone: metadata.phone || '',
          },
        },
      })
      if (error) throw error

      const user = {
        id: data.user.id,
        email: data.user.email,
        fullName: metadata.fullName || '',
        phone: metadata.phone || '',
      }

      // Nếu Supabase trả session ngay (không cần confirm email)
      if (data.session) {
        const token = data.session.access_token
        localStorage.setItem('access_token', token)
        set({ user, token, isLoggedIn: true, loading: false })
      } else {
        set({ user, loading: false })
      }
      return true
    } catch (error) {
      set({ error: error.message, loading: false })
      return false
    }
  },

  /**
   * Đăng xuất
   */
  logout: async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('access_token')
    set({ user: null, token: null, isLoggedIn: false, error: null })
  },

  /**
   * Khôi phục session từ Supabase (gọi khi app mount)
   */
  restoreSession: async () => {
    set({ loading: true })
    try {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        const user = {
          id: data.session.user.id,
          email: data.session.user.email,
          fullName: data.session.user.user_metadata?.full_name || '',
          phone: data.session.user.user_metadata?.phone || '',
          avatarUrl: data.session.user.user_metadata?.avatar_url || '',
        }
        localStorage.setItem('access_token', data.session.access_token)
        set({
          user,
          token: data.session.access_token,
          isLoggedIn: true,
          loading: false,
        })
      } else {
        set({ loading: false })
      }
    } catch {
      set({ loading: false })
    }
  },

  /**
   * Xóa lỗi
   */
  clearError: () => set({ error: null }),
}))

export default useAuthStore
