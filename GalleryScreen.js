import React, { useRef, useState } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');

const mediaItems = [
  {
    id: 1,
    uri: 'https://i1.sndcdn.com/artworks-000090951763-y6dfms-t500x500.jpg',
    title: 'Patolino O Mago',
    type: 'image',
  },
  {
    id: 2,
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    title: 'O Mago',
    type: 'video',
  },
  {
    id: 3,
    uri: 'https://blackcompany.com.br/wp-content/uploads/2024/11/mele-1920x1080p.jpg.adapt_.crop16x9.1920w.jpg',
    title: 'Jogo Mass Effect',
    type: 'image',
  },
  {
    id: 4,
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    title: 'Trailer do jogo Mass Effect',
    type: 'video',
  },
  {
    id: 5,
    uri: 'https://providencevethospital.com/wp-content/uploads/2024/03/cat-staring-at-me-in-Alameda-CA.jpg',
    title: 'Gato Laranja',
    type: 'image',
  },
  {
    id: 6,
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    title: 'Vídeo de Gatos Laranjas',
    type: 'video',
  },
  {
    id: 7,
    uri: 'https://s2-techtudo.glbimg.com/U-djrmeL0Mmhr1rjtn5hVAPRu88=/0x0:1920x1080/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2019/J/f/IY697dSgejr3wbPYLA8w/dmc1.jpg',
    title: 'Jogo Devil May Cry 5',
    type: 'image',
  },
  {
    id: 8,
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    title: 'Vídeo de Devil May Cry 5',
    type: 'video',
  },
  {
    id: 9,
    uri: 'https://upload.wikimedia.org/wikipedia/pt/7/7b/Sekiro_Shadows_Die_Twice_capa.png',
    title: 'Jogo Sekiro',
    type: 'image',
  },
  {
    id: 10,
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    title: 'Vídeo de Sekiro',
    type: 'video',
  },
  {
    id: 11,
    uri: 'https://image.api.playstation.com/vulcan/ap/rnd/202311/2812/ae84720b553c4ce943e9c342621b60f198beda0dbf533e21.jpg',
    title: 'Cyberpunk 2077',
    type: 'image',
  },
  {
    id: 12,
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'Vídeo de Cyberpunk 2077',
    type: 'video',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaContainer: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 20,
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  video: {
    width: '100%',
    height: '80%',
  },
  mediaTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    margin: 5,
  },
  activeIndicator: {
    backgroundColor: '#000',
  },
});

const GalleryScreen = () => {
  const ScrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        ref={ScrollViewRef}
      >
        {mediaItems.map((item) => (
          <View style={styles.mediaContainer} key={item.id}>
            {item.type === 'image' ? (
              <Image source={{ uri: item.uri }} style={styles.image} />
            ) : (
              <Video
                source={{ uri: item.uri }}
                style={styles.video}
                resizeMode="contain"
                useNativeControls
                isLooping
              />
            )}
            <Text style={styles.mediaTitle}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.indicatorContainer}>
        {mediaItems.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentIndex && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default GalleryScreen;
