import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import * as SMS from 'expo-sms';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Linking } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 10,
  },
});

const ContactScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsMessage, setSmsMessage] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const phoneRegex = /^\(\d{2}\) ?\d{4,5}-\d{4}$/;

  // Função para enviar SMS
  const sendSMS = async () => {
    if (phoneRegex.test(phoneNumber)) {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        await SMS.sendSMSAsync([phoneNumber.replace(/\D/g, '')], smsMessage);
        Alert.alert('Sucesso', 'SMS enviado com sucesso!');
      } else {
        Alert.alert('Erro', 'O envio de SMS não está disponível neste dispositivo.');
      }
    } else {
      Alert.alert('Número inválido', 'Formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX');
    }
  };

  // Função para enviar e-mail
  const sendEmail = () => {
    if (email === '' || emailMessage === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    const mailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailMessage)}`;

    Linking.openURL(mailUrl)
      .then(() => {
        setEmail('');
        setSubject('');
        setEmailMessage('');
        Alert.alert('Sucesso', 'E-mail enviado com sucesso!');
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível abrir o cliente de e-mail.');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Entre em Contato</Text>

      {/* Envio de SMS */}
      <Text style={styles.sectionTitle}>Envio de SMS</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu telefone (XX) XXXXX-XXXX"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a mensagem"
        value={smsMessage}
        onChangeText={setSmsMessage}
        multiline
      />
      <Button title="Enviar SMS" onPress={sendSMS} />

      {/* Envio de E-mail */}
      <Text style={styles.sectionTitle}>Envio de E-mail</Text>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email do destinatário"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Assunto"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.input}
        placeholder="Mensagem"
        value={emailMessage}
        onChangeText={setEmailMessage}
        multiline
      />
      <Button title="Enviar E-mail" onPress={sendEmail} />
    </ScrollView>
  );
};



export default ContactScreen;
