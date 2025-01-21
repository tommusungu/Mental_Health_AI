import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import apiRequest from '../utils/api';

const SignupScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Create user in Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // If user creation is successful, add user data to Firestore
      if (userCredential && userCredential.user) {
        // const newUser = {
        //   uid: userCredential.user.uid,
        //   firstName,
        //   lastName,
        //   email,
        // };

        // await addDoc(collection(db, 'Users'), newUser);
        // Alert.alert('Success', 'Account created successfully!');
        // navigation.navigate('Login');

        const userData = {
          id: userCredential?.user?.uid,
          firstName,
          lastName,
          name: userCredential?.user?.name,
          email,
          password,
          profilePicture: userCredential?.user.photoURL || null,
        };
        const response = await apiRequest.post(
          '/auth/recordLoggedInUser',
          userData
        );

        if (response.status) {
          Alert.alert('Success', 'Account created successfully!');
          navigation.navigate('Login');
        } else {
          Alert.alert('Error', 'Error creating account!');
        }
      }
    } catch (error) {
      console.error('Error creating user:', error);
      Alert.alert('Sign Up Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor="#101010" />

        <View className="bg-[#101010] justify-center items-center w-full">
          <Image
            className="w-64 h-64"
            resizeMode="contain"
            source={require('./../../assets/loginImage.png')}
          />
          <Text className="text-gray-100 font-medium text-base w-3/4 text-center pb-1">
            Join us to start your journey with
          </Text>
          <Text className="text-gray-100 font-medium text-base w-3/4 text-center pb-4">
            MentaCare!
          </Text>
        </View>

        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
            Create an Account
          </Text>
          <View className="flex-row justify-center items-center gap-3 w-full">
            <TextInput
              placeholder="Enter First Name"
              className="mt-3 h-14 px-3 w-[48%] border border-gray-300 rounded-md text-lg"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              placeholder="Enter Last Name"
              className="mt-3 h-14 px-3 w-[48%] border border-gray-300 rounded-md text-lg"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <TextInput
            placeholder="Enter Email Address"
            className="mt-3 h-14 px-3 border border-gray-300 rounded-md text-lg"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Enter Your Password"
            className="mt-3 h-14 px-3 border border-gray-300 rounded-md text-lg"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

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
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Text>
            </View>
          </TouchableRipple>
        </View>

        <View
          style={{
            paddingHorizontal: 16,
            alignItems: 'center',
            paddingVertical: 16,
          }}
        >
          <View className="flex-row w-[90%] gap-2 justify-center items-center">
            <Text className="text-sm text-gray-500 text-center">
              Already have an Account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-black font-semibold">Sign in here</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 14,
              color: '#606060',
              textAlign: 'center',
              width: '90%',
              marginTop: 8,
            }}
          >
            By signing up, you agree to our Terms & Conditions, acknowledge our
            Privacy Policy, and confirm that you are over 18.
          </Text>
        </View>
      </ScrollView>

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

export default SignupScreen;
