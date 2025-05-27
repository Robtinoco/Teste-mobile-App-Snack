import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  progressBar: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  questionImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    maxWidth: 300,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

const questions = [
  {
    question: 'Qual a origem do nome Amazônia?',
    options: [
      'Os exploradores deram o nome em homenagem à força das tribos locais.',
      'O nome foi inspirado em uma lenda local sobre mulheres gigantes que habitavam a floresta.',
      'Francisco de Orellana relatou ter encontrado mulheres guerreiras indígenas e as comparou às Amazonas da mitologia grega.',
      'A região foi nomeada em homenagem a um rio europeu com o mesmo nome.',
    ],
    answer:
      'Francisco de Orellana relatou ter encontrado mulheres guerreiras indígenas e as comparou às Amazonas da mitologia grega.',
  },
  {
    question: 'Qual o significado do "Nego" na bandeira da Paraíba?',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Bandeira_da_Para%C3%ADba.svg/300px-Bandeira_da_Para%C3%ADba.svg.png',
    options: [
      'Representa uma negativa ao domínio estrangeiro sobre o Brasil.',
      'Refere-se à recusa de João Pessoa em apoiar um candidato político nas eleições de 1930.',
      'É uma homenagem às tradições africanas na cultura paraibana.',
      'Simboliza a luta pela abolição da escravatura no estado.',
    ],
    answer: 'Refere-se à recusa de João Pessoa em apoiar um candidato político nas eleições de 1930.',
  },
  {
    question: 'Qual o significado da palavra "Engenharia"?',
    options: [
      'Ciência de criar mecanismos por meio de trabalho manual.',
      'Habilidade de resolver problemas matemáticos complexos.',
      'Arte de aplicar conhecimentos científicos para inovar.',
      'Deriva de "engenho", ou seja, refere-se ao trabalho com invenções e máquinas.',
    ],
    answer: 'Deriva de "engenho", ou seja, refere-se ao trabalho com invenções e máquinas.',
  },
];

const QuizScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleAnswer = (selectedOption) => {
    const correctAnswer = questions[currentQuestion].answer;

    if (selectedOption === correctAnswer) {
      setFeedback('Correto!');
    } else {
      setFeedback('Incorreto!');
    }

    setModalVisible(true);

    setTimeout(() => {
      setModalVisible(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setProgress((currentQuestion + 1) / questions.length);
      } else {
        setProgress(1);
        alert('Quiz concluído!');
      }
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Progress.Bar
        progress={progress}
        width={300}
        height={20}
        color="blue"
        borderWidth={1}
        borderColor="black"
        style={styles.progressBar}
      />
      <Text style={styles.progressText}>
        Progresso: {Math.round(progress * 100)}%
      </Text>

      {questions[currentQuestion].image && (
        <Image
          source={{ uri: questions[currentQuestion].image }}
          style={styles.questionImage}
        />
      )}

      <Text style={styles.question}>
        {questions[currentQuestion].question}
      </Text>

      {questions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleAnswer(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{feedback}</Text>
        </View>
      </Modal>
    </View>
  );
};

export default QuizScreen;
