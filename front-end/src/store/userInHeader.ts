'use client'

import { create } from 'zustand';

interface UserInHeaderState {
  username: string;
  setUsername: (username: string) => void;
}

export const useUserInHeaderStore = create<UserInHeaderState>((set) => ({
  username: '',
  setUsername: (username) => set({ username }),
}));