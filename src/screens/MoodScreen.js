// screens/MoodScreen.js
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Vibration,
  Modal,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MoodSelection from '../components/MoodSelection';
import MoodHistory from '../components/MoodHistory';
import MoodAnalysis from '../components/MoodAnalysis';
import TopBarTwo from '../components/TopBarTwo';
import { selectUser } from '../slices/navSlice';
import {
  fetchUserMoods,
  addMoodLogEntry,
  removeMoodLogEntry,
  selectMoodLog,
  setLoading,
  selectLoading,
} from '../slices/moodSlice';
import { moods } from '../hooks/Database';
import apiRequest from '../utils/api';
import { useTheme } from '../../themeContext';

const MoodScreen = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const user = useSelector(selectUser);
  const moodLog = useSelector(selectMoodLog);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const handleMoodSubmit = async () => {
    dispatch(setLoading(true)); // Set loading to true at the start
    try {
      const timestamp = new Date().toISOString(); // Convert to ISO string
      const response = await apiRequest.post('/moods/postMood', {
        mood: selectedMood,
        note: note.trim(),
        timestamp, // Store as ISO string
        uid: user.id,
      });

      if (response.status) {
        const newLog = {
          mood: selectedMood,
          note: note.trim(),
          timestamp, // Store as ISO string
          uid: user.id,
        };
        dispatch(addMoodLogEntry(newLog)); // Add new mood to global store
        setSelectedMood(null);
        setNote('');
      }
    } catch (error) {
      console.log('Error posting mood to Db!', error);
    } finally {
      dispatch(setLoading(false)); // Set loading to false at the end
    }
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserMoods(user.id)); // Fetch moods from the API
    }
  }, [dispatch, user]);

  const handleDeleteMood = async (id) => {
    try {
      await apiRequest.delete(`/moods/deleteMoodOfUser/${id}`);
      dispatch(removeMoodLogEntry(id)); // Remove mood from global store
      Vibration.vibrate(77);
    } catch (error) {
      console.log('Error deleting mood:', error.message);
    }
  };

  const handleMoodSelect = (moodValue) => {
    setSelectedMood(moodValue);
    Vibration.vibrate(77);
  };

  return (
    <SafeAreaView className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'} flex-1 `}>
    <StatusBar barStyle={`${theme === 'dark' ? 'light-content' : 'dark-content'}`} backgroundColor={`${theme === 'dark' ? '#101010' : '#ffffff'}`} />
     <View style={{ width: '100%', padding: 12, paddingTop: 24 }}>
        <TopBarTwo title="Mood Tracker" />
      </View>

      <ScrollView
        style={{
          paddingVertical: 12,
          width: '100%',
        }}
        className={`${theme === 'dark' ? 'bg-[#101010]' : 'bg-white'}`}
      >
        <MoodSelection
          theme={theme}
          moods={moods}
          selectedMood={selectedMood}
          setSelectedMood={handleMoodSelect}
          note={note}
          setNote={setNote}
          handleMoodSubmit={handleMoodSubmit}
        />
        <MoodAnalysis moods={moods} moodLog={moodLog} home={false} />
        <MoodHistory
          theme={theme}
          moodLog={moodLog}
          moods={moods}
          onDeleteMood={handleDeleteMood}
        />
      </ScrollView>

      {/* Fullscreen Loader Modal */}
      <Modal transparent={true} animationType="fade" visible={loading}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{ color: '#ffffff', marginTop: 10 }}>
            Please wait...
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MoodScreen;
