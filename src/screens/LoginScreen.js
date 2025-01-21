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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import SignInWithGoogle from '../components/SignInWithGoogle';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (email && password) {
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Navigate to the onboarding screen after successful login
        navigation.replace('Onboarding');
      } catch (err) {
        console.log('Error:', err.message);
        Alert.alert('Error', 'Invalid email or password.');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Error', 'Please enter both email and password.');
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
            Welcome back to MentaCare!
          </Text>
          <Text className="text-gray-100 font-medium text-base w-3/4 text-center pb-4">
            Sign in to continue.
          </Text>
        </View>

        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
            Sign in Here
          </Text>
          <TextInput
            placeholder="Enter Email Address"
            className="mt-3 h-14 px-3 border border-gray-300 rounded-md text-lg"
            value={email}
            onChangeText={setEmail}
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
            className="mt-3 bg-[#101010] justify-center items-center w-full h-14 rounded-md"
            rippleColor={'#707070'}
            disabled={loading}
          >
            <View className="w-full justify-center items-center">
              <Text className="text-white text-xl font-semibold">Sign in</Text>
            </View>
          </TouchableRipple>

          <View className="flex-row justify-center items-center gap-2 w-full px-3 py-4">
            <View className="h-[1px] bg-gray-300 flex-1" />
            <Text className="text-gray-600 text-base">OR</Text>
            <View className="h-[1px] bg-gray-300 flex-1" />
          </View>

          <SignInWithGoogle />

          <View className="px-3 items-center w-full py-4">
            <View className="flex-row w-[90%] gap-2 justify-center items-center">
              <Text className="text-sm text-gray-500 text-center">
                Have no Account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text className="text-black font-semibold">Sign Up here</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-sm text-gray-500 text-center w-[90%]">
              By signing up, you agree to our Terms & Conditions, acknowledge
              our Privacy Policy, and confirm that you are over 18.
            </Text>
          </View>
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
          <Text style={{ color: '#ffffff', marginTop: 10 }}>Signing in...</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LoginScreen;
