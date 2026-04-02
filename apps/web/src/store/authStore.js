import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null, // Sẽ chứa thông tin user khi đã đăng nhập: { name: '...', email: '...' }
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
