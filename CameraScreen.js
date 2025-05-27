import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { Camera } from 'expo-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  camera: {
    flex: 3,
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  switchCameraButton: {
    backgroundColor: '#ff7f00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  galleryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  capturedImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  previewImage: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
});

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back); 
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setCapturedPhotos([...capturedPhotos, photo.uri]);
      setIsPreview(true);
    }
  };

  const closePreview = () => {
    setIsPreview(false);
  };

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.capturedImage} />
  );

  if (hasPermission === null) {
    return <Text>Solicitando permissão para usar a câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Permissão negada. Não é possível acessar a câmera.</Text>;
  }

  return (
    <View style={styles.container}>
      {isPreview ? (
        <>
          <Image source={{ uri: capturedPhotos[capturedPhotos.length - 1] }} style={styles.previewImage} />
          <TouchableOpacity style={styles.closeButton} onPress={closePreview}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => setCamera(ref)}
          />
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={styles.buttonText}>Capturar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.switchCameraButton}
            onPress={() =>
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
            }
          >
            <Text style={styles.buttonText}>Trocar Câmera</Text>
          </TouchableOpacity>
        </>
      )}
      <Text style={styles.galleryTitle}>Galeria de Fotos</Text>
      <FlatList
        data={capturedPhotos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderImage}
        horizontal
      />
    </View>
  );
};



export default CameraScreen;
