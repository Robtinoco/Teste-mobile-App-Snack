import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { Linking } from 'react-native';

const GeolocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'Permissão para acessar a localização foi negada.');
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    } finally {
      setLoading(false);
    }
  };

  const openInMaps = () => {
    if (location) {
      const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      Linking.openURL(url).catch(() => {
        Alert.alert('Erro', 'Não foi possível abrir o Google Maps.');
      });
    } else {
      Alert.alert('Erro', 'Localização não disponível.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geolocalização</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          <Button title="Obter Localização" onPress={getLocation} color="#007bff" />
          {location && (
            <View style={styles.locationContainer}>
              <Text style={styles.text}>
                Latitude: {location.latitude.toFixed(6)}
              </Text>
              <Text style={styles.text}>
                Longitude: {location.longitude.toFixed(6)}
              </Text>
              <Button
                title="Abrir no Google Maps"
                onPress={openInMaps}
                color="#28a745"
              />
            </View>
          )}
        </>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  locationContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default GeolocationScreen;
