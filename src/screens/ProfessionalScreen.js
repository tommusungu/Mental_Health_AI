import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // To pick images
import * as DocumentPicker from 'expo-document-picker'; // To pick documents
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/navSlice';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system'; // To handle file previews
import TopBarThree from '../components/TopBarThree';
import apiRequest from '../utils/api';

const ProfessionalScreen = () => {
  const [resume, setResume] = useState(null); // Resume file
  const [description, setDescription] = useState('');
  const [idFront, setIdFront] = useState(null); // ID front image
  const [idBack, setIdBack] = useState(null); // ID back image
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Get the logged-in user from Redux store
  const user = useSelector(selectUser);

  const handleSubmit = async () => {
    if (!resume || !description || !idFront || !idBack) {
      Alert.alert(
        'Error',
        'Please fill in all fields and upload the required files.'
      );
      return;
    }

    setLoading(true);
    try {
      // Helper function to upload files to Cloudinary
      const uploadToCloudinary = async (file, folder) => {
        const formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          type: file.mimeType || 'application/pdf', // Default to PDF for documents
          name: file.name || `${folder}_${Date.now()}`, // Ensure the file has a name
        });
        formData.append('upload_preset', 'serenityApp'); // Replace with your Cloudinary preset
        formData.append('folder', folder);

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/victorkib/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          const errorResponse = await response.text(); // Get detailed error response
          console.error('Cloudinary upload error:', errorResponse);
          throw new Error('Cloudinary upload failed');
        }

        const data = await response.json();
        return data.secure_url;
      };

      // Upload files to Cloudinary
      const idFrontUrl = await uploadToCloudinary({ uri: idFront }, 'id_front');
      const idBackUrl = await uploadToCloudinary({ uri: idBack }, 'id_back');
      const resumeUrl = await uploadToCloudinary(resume, 'resumes');

      // Create new professional profile data
      const newProfessional = {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl:user.profilePicture,
        email: user.email,
        resume: resumeUrl,
        description,
        idFront: idFrontUrl,
        idBack: idBackUrl,
      };

      // Send data to MongoDB through the backend server
      const response = await apiRequest.post(
        '/professional/postProfessional',
        newProfessional
      );

      console.log('responseFromDb:', response.data);
      if (response.status) {
        Alert.alert(
          'Success',
          'Your professional profile details have been submitted successfully! Your details are under review, and you will receive a notification once approved.'
        );
       navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Could not create professional profile.');
      }
    } catch (error) {
      console.error('Error adding professional:', error);
      Alert.alert('Error', 'Could not create professional profile.');
    } finally {
      setLoading(false);
    }
  };

  // Pick an image
  const pickImage = async (setImage) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickDocument = async (setDocument) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Accept all file types
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const document = result.assets[0]; // Access the first file from the assets array
        setDocument(document); // Save document details to state
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick a document.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor="#101010" />
        <View className="w-full p-3 pt-6 bg-[#101010]">
          <TopBarThree title="Become a Professional" />
        </View>
        <View className="bg-[#101010] justify-center items-center w-full p-3">
          <View className="p-4 bg-[#202020] rounded-lg mt-3 w-full">
            <View className="justify-center items-center">
              {user?.profilePicture ? (
                <Image
                  resizeMode="cover"
                  source={{ uri: user.profilePicture }}
                  className="w-32 h-32 rounded-full"
                />
              ) : (
                <View className="w-32 h-32 rounded-full bg-[#303030] justify-center items-center">
                  <Ionicons name="person-outline" size={40} color={'#e5e7eb'} />
                </View>
              )}
              <Text className="text-gray-400 text-xl mt-1">
                {user?.firstName} {user?.lastName}
              </Text>
              <Text className="text-gray-400">{user?.email}</Text>
            </View>
          </View>

          <Text className="text-gray-100 font-medium text-lg text-center pt-8">
            Create Your Professional Profile
          </Text>
        </View>

        <View style={{ padding: 16 }}>
          <Text className="my-3 font-semibold text-lg">Tell us about you</Text>

          <TextInput
            placeholder="Enter Professional Description"
            className=" h-32 px-3 py-2 border border-gray-300 rounded-md text-lg"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />

          <Text className="my-3 font-semibold text-lg">
            Upload all documents
          </Text>
          <TouchableRipple
            onPress={() => pickDocument(setResume)}
            className="border border-gray-300  items-center justify-center h-32 w-full rounded-lg"
          >
            <View className="items-center justify-center">
              <Ionicons
                name="cloud-upload-outline"
                color={'#4b5563'}
                size={28}
              />
              <Text className="text-gray-600">
                {resume ? 'Resume Uploaded' : 'Upload Resume'}
              </Text>
            </View>
          </TouchableRipple>
          {resume && (
            <View className="mt-2">
              <Text className="text-gray-400">File Name: {resume.name}</Text>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Open Document',
                    'Document preview not supported in-app'
                  )
                }
              >
                <Text className="text-blue-500 underline">View Document</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableRipple
            onPress={() => pickImage(setIdFront)}
            className="border border-gray-300 items-center justify-center h-64 w-full rounded-lg mt-3"
          >
            {idFront ? (
              <Image
                source={{ uri: idFront }}
                className="w-full h-full rounded-lg"
              />
            ) : (
              <View className="items-center justify-center">
                <Ionicons
                  name="cloud-upload-outline"
                  color={'#4b5563'}
                  size={28}
                />
                <Text className="text-gray-600">Upload ID Front</Text>
              </View>
            )}
          </TouchableRipple>

          <TouchableRipple
            onPress={() => pickImage(setIdBack)}
            className="border border-gray-300 items-center justify-center h-64 w-full rounded-lg mt-3"
          >
            {idBack ? (
              <Image
                source={{ uri: idBack }}
                className="w-full h-full rounded-lg"
              />
            ) : (
              <View className="items-center justify-center">
                <Ionicons
                  name="cloud-upload-outline"
                  color={'#4b5563'}
                  size={28}
                />
                <Text className="text-gray-600">Upload ID Back</Text>
              </View>
            )}
          </TouchableRipple>

          <TouchableRipple
            onPress={handleSubmit}
            style={{
              marginTop: 12,
              backgroundColor: '#101010',
              justifyContent: 'center',
              alignItems: 'center',
              height: 56,
              borderRadius: 8,
            }}
            rippleColor={'#707070'}
            disabled={loading}
          >
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{ color: '#ffffff', fontSize: 18, fontWeight: '600' }}
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </Text>
            </View>
          </TouchableRipple>
        </View>

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfessionalScreen;
