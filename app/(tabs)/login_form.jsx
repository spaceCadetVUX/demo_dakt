// CreateAccountScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../components/style/regeist_login_style'; // Adjust the path as necessary

const CreateAccountScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [warningMessagePwd, setWarningMessagePwd] = useState('');

  return (
    <LinearGradient
      colors={['#FF204E', '#A0153E', '#5D0E41']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        {/* Username */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color="white" />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#C3C3C3"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        {/* Password */}
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={24} color="white" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#C3C3C3"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPressIn={() => setShowPassword(true)}
            onPressOut={() => setShowPassword(false)}
          >
            <FontAwesome
              name={showPassword ? 'eye' : 'eye-slash'}
              size={24}
              color="white"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Sign In</Text>
        </TouchableOpacity>
        {/* Forgot Password */}
        <Text style={styles.termsText}>
          <Text style={styles.link}>Forgot Password</Text>.
        </Text>
        {/* Social Buttons */}
        <TouchableOpacity style={styles.facebookButton}>
          <FontAwesome name="facebook" size={24} color="white" />
          <Text style={styles.facebookButtonText}>Sign In with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
          <FontAwesome name="google" size={24} color="red" />
          <Text style={styles.googleButtonText}>Sign In with Google</Text>
        </TouchableOpacity> 
        {/* Sign In Link */}
        <Text style={styles.signInText}>
          Don't have an account? <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Create One</Text>
        </Text>
        {/* test */}
      </View>
    </LinearGradient>
  );
};

export default CreateAccountScreen;
