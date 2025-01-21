import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  mood: null,
  currentTab: { id: 1, title: 'Mood Tracker' },
  conversationId: null,
  chatHistory: [],
  professional: null,
  meditation: null,
  assessementResults: null,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setMood: (state, action) => {
      state.mood = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setConversationId: (state, action) => {
      state.conversationId = action.payload;
    },
    setChatHistory: (state, action) => {
      state.chatHistory = action.payload;
    },
    setMeditation: (state, action) => {
      state.meditation = action.payload;
    },
    setProfessional: (state, action) => {
      state.professional = action.payload;
    },
    setAssessementResults: (state, action) => {
      state.assessementResults = action.payload;
    },
  },
});

export const {
  setUser,
  setMood,
  setCurrentTab,
  setConversationId,
  setChatHistory,
  setMeditation,
  setProfessional,
  setAssessementResults,
} = navSlice.actions;

//Selectors
export const selectUser = (state) => state.nav.user;
export const selectMood = (state) => state.nav.mood;
export const selectCurrentTab = (state) => state.nav.currentTab;
export const selectConversationId = (state) => state.nav.conversationId;
export const selectChatHistory = (state) => state.nav.chatHistory;
export const selectMeditation = (state) => state.nav.meditation;
export const selectProfessional = (state) => state.nav.professional;
export const selectAssessementResults = (state) => state.nav.assessementResults;

export default navSlice.reducer;
