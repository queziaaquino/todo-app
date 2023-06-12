import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { fetchUser } from '../actions/listActions'

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const instance = axios.create({
    baseURL: 'http://192.168.0.5:3000', // Altere para a URL correta da API
  });

  const handleLogin = async () => {
    try {
      const response = await fetchUser( username, password );

      if (response.name) {
        navigation.navigate('Suas Listas');
      } else {
        setError('Usuário ou senha inválidos');
      }
    } catch (error) {
      console.error(error);
      setError('Ocorreu um erro ao fazer login');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});

export default LoginScreen;
