import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../components/style/regeist_login_style';

const CreateAccountScreen = ({ navigation }) => {
  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [warningMessage, setWarningMessage] = useState('');
  const [warningMessagePwd, setWarningMessagePwd] = useState('');
  const [warningMessageEmail, setWarningMessageEmail] = useState('');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    // Username validation
    if (!USER_REGEX.test(username)) {
      setWarningMessage('Username must be 4-24 characters, start with a letter.');
      return;
    }

    // Password validation
    if (!PWD_REGEX.test(password)) {
      setWarningMessagePwd('Password must be 8-24 characters, include uppercase, lowercase, number, and a special character.');
      return;
    }

    // Email validation
    if (!EMAIL_REGEX.test(email)) {
      setWarningMessageEmail('Invalid email format');
      return;
    }

    // Confirm Password Validation
    if (password !== confirmPassword) {
      setWarningMessagePwd('Passwords do not match');
      return;
    }

    // Clear all warnings if successful
    setWarningMessage('');
    setWarningMessagePwd('');
    setWarningMessageEmail('');

    console.log('Registration successful!');
    // You can now proceed with the registration logic (API call, etc.)
  };

  return (
    <LinearGradient
      colors={['#FF204E', '#A0153E', '#5D0E41']} 
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 1 }} 
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>

        {/* Username */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color="white" />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#C3C3C3"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (!USER_REGEX.test(text)) {
                setWarningMessage('Username must be 4-24 characters, start with a letter.');
              } else {
                setWarningMessage('');
              }
            }}
          />
          {warningMessage ? <Text style={styles.warningText}>{warningMessage}</Text> : null}
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={24} color="white" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#C3C3C3"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (!EMAIL_REGEX.test(text)) {
                setWarningMessageEmail('Invalid email format');
              } else {
                setWarningMessageEmail('');
              }
            }}
          />
          {warningMessageEmail ? <Text style={styles.warningText}>{warningMessageEmail}</Text> : null}
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
            onChangeText={(text) => {
              setPassword(text);
              if (!PWD_REGEX.test(text)) {
                setWarningMessagePwd('Password must be 8-24 characters, include uppercase, lowercase, number, and a special character.');
              } else {
                setWarningMessagePwd('');
              }
            }}
          />
          <TouchableOpacity
            onPressIn={() => setShowPassword(true)}
            onPressOut={() => setShowPassword(false)}
          >
            <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={24} color="white" />
          </TouchableOpacity>
          {warningMessagePwd ? <Text style={styles.warningText}>{warningMessagePwd}</Text> : null}
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={24} color="white" />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#C3C3C3"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        {/* Terms and Privacy */}
        <Text style={styles.termsText}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link}>Terms of Use</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
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
          Have an account? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Login</Text>
        </Text>

        
      </View>
    </LinearGradient>
  );
};

export default CreateAccountScreen;
