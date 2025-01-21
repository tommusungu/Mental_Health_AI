import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setMeditation } from '../slices/navSlice';

const meditationTechniques = [
  {
    id: '1',
    title: 'Guided Meditation',
    image: require('./../../assets/meditationImage.jpg'),
    music: require('./../../assets/music/soothing-music-1.mp3'),
  },
  {
    id: '2',
    title: 'Mindfulness Meditation',
    image: require('./../../assets/meditationImage.jpg'),
    music: require('./../../assets/music/soothing-music-2.mp3'),
  },
  {
    id: '3',
    title: 'Breath Awareness',
    image: require('./../../assets/meditationImage.jpg'),
    music: require('./../../assets/music/soothing-music-1.mp3'),
  },
];

const MeditationComponent = () => {
  const dispatch = useDispatch();

  const handleTechniqueSelect = (technique) => {
    dispatch(setMeditation(technique)); // Dispatch the selected technique to Redux
  };

  const renderTechniqueItem = ({ item }) => (
    <TouchableOpacity
      className="bg-gray-800 rounded-lg m-2 w-32 items-center justify-center"
      onPress={() => handleTechniqueSelect(item)}
    >
      <Image source={item.image} className="w-32 h-32 rounded-lg" />
      <Text className="text-white text-center mt-2">{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 justify-center items-center bg-gray-900 p-4">
      <Text className="text-white text-2xl font-bold">Meditation Music</Text>
      <FlatList
        data={meditationTechniques}
        horizontal
        renderItem={renderTechniqueItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle="py-2"
      />
    </View>
  );
};

export default MeditationComponent;
