// slices/moodSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../utils/api';

// Thunk to fetch user's mood log from the server
export const fetchUserMoods = createAsyncThunk(
  'mood/fetchUserMoods',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiRequest.get(`/moods/getAllMoods/${userId}`);
      // Ensure the timestamp is stored as an ISO string
      const moodData = response.data.map((mood) => ({
        ...mood,
        timestamp: new Date(mood.timestamp).toISOString(), // Convert to ISO string
      }));
      return moodData; // Return data with ISO string timestamps
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const moodSlice = createSlice({
  name: 'mood',
  initialState: {
    moodLog: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMoodLogEntry: (state, action) => {
      state.moodLog.unshift(action.payload); // Add new mood at the beginning
    },
    removeMoodLogEntry: (state, action) => {
      state.moodLog = state.moodLog.filter((log) => log._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserMoods.fulfilled, (state, action) => {
        state.loading = false;
        state.moodLog = action.payload;
      })
      .addCase(fetchUserMoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addMoodLogEntry, removeMoodLogEntry, setLoading } =
  moodSlice.actions;
export const selectMoodLog = (state) => state.mood.moodLog;
export const selectLoading = (state) => state.mood.loading;
export default moodSlice.reducer;
