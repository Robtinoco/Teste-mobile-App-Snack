import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  success: {
    backgroundColor: 'green',
  },
  error: {
    backgroundColor: 'red',
  },
  text: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
});

const AuthScreen = ({ navigation }) => {
  const [authenticated, setAuthenticated] = useState(null);

  const authenticateUser = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert('Erro', 'Seu dispositivo não suporta autenticação biométrica.');
        setAuthenticated(false);
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert('Erro', 'Nenhuma biometria cadastrada no dispositivo.');
        setAuthenticated(false);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Use sua biometria para acessar',
      });

      setAuthenticated(result.success);

      if (result.success) {
        navigation.replace('Home');
      }
    } catch (error) {
      Alert.alert('Erro', 'Algo deu errado durante a autenticação.');
      setAuthenticated(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        authenticated === null
          ? null
          : authenticated
          ? styles.success
          : styles.error,
      ]}
    >
      <Text style={styles.text}>
        {authenticated === null
          ? 'Autenticando...'
          : authenticated
          ? 'Acesso autorizado'
          : 'Acesso negado'}
      </Text>
      <Button
        title={authenticated === null ? 'Iniciar Autenticação' : 'Tentar novamente'}
        onPress={authenticateUser}
      />
    </View>
  );
};



export default AuthScreen;
