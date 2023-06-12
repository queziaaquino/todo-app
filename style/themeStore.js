import create from 'zustand';

const useThemeStore = create((set) => ({
    themeColor: '#f194ff', 

    setThemeColor: (color) => {
      set({ themeColor: color });
    },
}));

export default useThemeStore;
