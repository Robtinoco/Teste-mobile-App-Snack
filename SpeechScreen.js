{/*SLIDE4-Exemplo 10-Speech mult-language */}
import React,{useState} from 'react';
import {View,Text,StyleSheet,Button,TextInput} from 'react-native';
import * as Speech from 'expo-speech';
import {Picker} from '@react-native-picker/picker';

{/*CSS */}
const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 20,
    width: '80%',
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: 200,
  },
});

{/*App principal*/}
const App= () => {
  const [text,setText] = useState('');
  const [selectedVoice,setSelectedVoice] = useState('pt-BR');

  const voices=[
    {id: 'pt-BR', label: 'Português (Brasil)'},
    {id: 'pt-PT', label: 'Português (Portugal)'},
    {id: 'es-ES', label: 'Espanhol (Espanha)'},
    {id: 'es-MX', label: 'Espanhol (México)'},
    {id: 'fr-FR', label: 'Francês (França)'},
    {id: 'it-IT', label: 'Italiano (Itália)'},
    {id: 'ro-RO', label: 'Romeno (Romênia)'},
    {id: 'de-DE', label: 'Alemão (Alemanha)'},
    {id: 'en-GB', label: 'Inglês (Reino Unido)'},
    {id: 'en-US', label: 'Inglês (EUA)'},
  ];

  const speakText = () => {
    if(text){
      Speech.speak(text, {language: selectedVoice});
    }
  }

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Digite algo para sintetizar:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu texto aqui"
        value={text}
        onChangeText={setText}
      />
      <Picker
        selectedValue={selectedVoice}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedVoice(itemValue)}
      >
        {voices.map((voice) => (
          <Picker.Item key={voice.id} label={voice.label} value={voice.id} />
        ))}
      </Picker>
      <Button title="Sintetizar Texto" onPress={speakText} />
    </View>
  )
}

export default App;
