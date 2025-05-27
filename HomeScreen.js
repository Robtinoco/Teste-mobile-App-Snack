import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
const HomeScreen = ({ navigation }) => {
  const screens = [
    { name: 'Quiz', label: 'Quiz Interativo' },
    { name: 'Gallery', label: 'Galeria' },
    { name: 'Tasks', label: 'Lista de Tarefas' },
    { name: 'Geolocation', label: 'Geolocalização' },
    { name: 'Charts', label: 'Gráficos' },
    { name: 'Synthesizer', label: 'Sintetizador de Voz' },
    { name: 'Weather', label: 'Clima Atual' },
    { name: 'Contact', label: 'Contato' },
    { name: 'About', label: 'Sobre' },
    { name: 'Camera', label: 'Camera' },
    { name: 'Auth', label: 'Auth' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: 'https://i.redd.it/53kq0fos5o281.jpg',
        }}
        style={styles.image}
      />
      <Text style={styles.title}>Bem-vindo ao Pato App!</Text>
      <Text style={styles.subtitle}>O aplicativo que faz de tudo, mas com a graça de um pato.</Text>
      {screens.map((screen) => (
        <TouchableOpacity
          key={screen.name}
          style={styles.button}
          onPress={() => navigation.navigate(screen.name)}
        >
          <Text style={styles.buttonText}>{screen.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};



export default HomeScreen;
