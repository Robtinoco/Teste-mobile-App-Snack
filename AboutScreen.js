import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdna.artstation.com/p/assets/images/images/017/032/760/large/henrique-alves-patolino-mago.jpg?1554379807',
        }}
        style={styles.image}
      />
      <Text style={styles.title}>Sobre o Pato App</Text>
      <Text style={styles.text}>
        O Pato App é um aplicativo multifuncional, inspirado na ideia de um pato: 
        ele faz várias coisas, mas nenhuma com perfeição. Aqui você encontrará 
        diversas funcionalidades , como quizzes, gráficos, mapas e mais
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});

export default AboutScreen;
