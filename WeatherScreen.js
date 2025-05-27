import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  tempText: {
    fontSize: 48,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
});

const App = () => {
  const [city, setCity] = useState('Rio de Janeiro');
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = 'f2403779dc72fb2bbd1d0114bbe96d2d';

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setTemperature(response.data.main.temp);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar dados do clima');
      setTemperature(null);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temperatura em {city}</Text>
      {temperature !== null ? (
        <Text style={styles.tempText}>{Math.round(temperature)}°C</Text>
      ) : (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Digite a cidade aqui"
      />

      <Button title="Buscar temperatura" onPress={fetchWeather} />
    </View>
  );
};

export default App;
