import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SignInWithGoogle = () => {
  // const navigation = useNavigation()
  return (
    <View className='w-full py-4'>
      <TouchableRipple 
      style={styles.button}
      // onPress={()=>navigation.navigate('Onboarding')}
      onPress={()=>[]}
      rippleColor={'#606060'}
      className='w-full border border-gray-300 '
      >
        <View className='w-full flex-row justify-start items-center '>
        <Image
            source={require('./../../assets/google.png')}
            resizeMode='contain'
            className='absolute left-2 w-9 h-9'
        />
        <View className='w-full py-3.5'>
            <Text className='text-black text-center font-medium text-lg'>Sign in with Google</Text>
        </View>
        </View>
      </TouchableRipple>
    </View>
  )
}
const styles = StyleSheet.create({
    
    button: {
      borderRadius:5,
     
    }
  });
  
export default SignInWithGoogle