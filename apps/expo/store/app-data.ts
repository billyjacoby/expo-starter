import { create } from 'zustand';

export type AppDataState = {
  tabSearchValue: string;
};

const initialState: AppDataState = {
  tabSearchValue: '',
};

export type AppDataActions = {
  setTabSearchValue: (value: string) => void;
};

const createActions: (
  set: (state: AppDataState) => void,
  get: () => AppDataState,
) => AppDataActions = (set, _get) => ({
  setTabSearchValue: (value) => set({ tabSearchValue: value }),
});

export type AppDataStore = AppDataState & AppDataActions;

export const useAppStore = create<AppDataStore>((set, get) => ({
  ...initialState,
  ...createActions(set, get),
}));
