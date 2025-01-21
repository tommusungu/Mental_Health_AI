import { configureStore } from '@reduxjs/toolkit';
import navReducer from './src/slices/navSlice';

import moodReducer from './src/slices/moodSlice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    mood: moodReducer,
  },
});
