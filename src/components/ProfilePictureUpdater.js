import React, { useState } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../slices/navSlice';
import apiRequest from '../utils/api';

const ProfilePictureUpdater = ({theme}) => {
  const [loading, setLoading] = useState(false); // Track loading state
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // Function to pick an image and upload it automatically
  const pickImageAndUpload = async () => {
    // Request camera roll permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission denied',
        'Please allow access to your photo library.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      uploadImageToCloudinary(imageUri);
    }
  };

  // Function to upload the selected image to Cloudinary
  const uploadImageToCloudinary = async (imageUri) => {
    setLoading(true); // Show loader when upload starts

    const data = new FormData();
    const fileType = imageUri.split('.').pop(); // Get file extension
    const mimeType = `image/${fileType}`; // Set mimeType dynamically based on extension

    // Prepare the file object for Cloudinary upload
    data.append('file', {
      uri: imageUri,
      type: mimeType,
      name: `profile_${Date.now()}.${fileType}`,
    });
    data.append('upload_preset', 'serenityApp');
    data.append('cloud_name', 'victorkib');
    data.append('folder', 'profile_pictures'); // Specify folder in Cloudinary

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/victorkib/upload',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const imageUrl = response.data.secure_url;

      // Update the user's profile picture URL in the backend
      const backendResponse = await apiRequest.patch(
        `/auth/updateUser/${user?._id}`,
        {
          profilePicture: imageUrl,
        }
      );

      if (backendResponse.status) {
        // Save the new profile picture URL in Redux
        dispatch(
          setUser({
            ...user,
            profilePicture: imageUrl,
          })
        );
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      Alert.alert('Error', 'There was an error uploading the image');
    } finally {
      setLoading(false); // Hide loader after upload finishes
    }
  };

  return (
    <View>
      {/* Button to pick an image and upload automatically */}
      {loading ? (
        <ActivityIndicator size={22} color="#000000" />
      ) : (
        <TouchableOpacity
          onPress={pickImageAndUpload}
          
          className={`${theme === 'dark' ? 'bg-white' : 'bg-black'}  rounded-full w-8 h-8 justify-center items-center`}
        >
          <MaterialIcons name="edit" color={`${theme==='dark' ? '#000000' : '#ffffff'}`} size={15} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfilePictureUpdater;
