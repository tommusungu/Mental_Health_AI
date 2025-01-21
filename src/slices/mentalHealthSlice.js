// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     user: null,                     
//     moodLogs: [],                  
//     resources: [],                  
//     currentTab: 'View All',          
//     assessmentResults: null,        
// };

// export const navSlice = createSlice({
//     name: "nav",
//     initialState,
//     reducers: {
//         setUser: (state, action) => {
//             state.user = action.payload;
//         },
//         addMoodLog: (state, action) => {
//             state.moodLogs.push(action.payload);
//         },
//         setResources: (state, action) => {
//             state.resources = action.payload;
//         },
//         setCurrentTab: (state, action) => {
//             state.currentTab = action.payload;
//         },
//         setAssessmentResults: (state, action) => {
//             state.assessmentResults = action.payload;
//         },
//         // clearCurrentExercise: (state) => {
//         //     state.currentExercise = null;
//         // },
//     },
// });

// export const { 
//     setUser, 
//     addMoodLog, 
//     setResources, 
//     setCurrentTab, 
//     setAssessmentResults, 
//     // clearCurrentExercise 
// } = navSlice.actions;

// // Selectors
// export const selectUser = (state) => state.mentalHealth.user;
// export const selectMoodLogs = (state) => state.mentalHealth.moodLogs;
// export const selectResources = (state) => state.mentalHealth.resources;
// export const selectCurrentTab = (state) => state.mentalHealth.currentTab;
// export const selectAssessmentResults = (state) => state.mentalHealth.assessmentResults;

// export default navSlice.reducer;
