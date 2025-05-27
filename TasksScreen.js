import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  selectDate: {
    marginBottom: 10,
    color: Colors.blue500,
  },
  addTask: {
    backgroundColor: Colors.blue500,
    color: Colors.white,
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
  task: {
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
  },
  deadline: {
    fontSize: 14,
    color: Colors.grey500,
  },
  completed: {
    color: Colors.green500,
  },
  notCompleted: {
    color: Colors.red500,
  },
  delete: {
    color: Colors.red500,
    fontSize: 14,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.grey500,
    marginTop: 20,
  },
});

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTask = () => {
    if (newTaskName.trim() !== '') {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          name: newTaskName,
          deadline: selectedDate,
          color: 'blue',
          completed: false,
        },
      ]);
      setNewTaskName('');
      setSelectedDate(new Date().toISOString().split('T')[0]);
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filtrar tarefas com base na busca
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Tarefas</Text>

        {/* Campo de busca */}
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar tarefa..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <TextInput
          style={styles.input}
          placeholder="Nome de uma tarefa"
          value={newTaskName}
          onChangeText={setNewTaskName}
        />

        <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
          <Text style={styles.selectDate}>Selecionar Data: {selectedDate}</Text>
        </TouchableOpacity>

        {showCalendar && (
          <Calendar
            current={selectedDate}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              setShowCalendar(false);
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: Colors.blue500,
              },
            }}
          />
        )}

        <TouchableOpacity onPress={handleAddTask}>
          <Text style={styles.addTask}>Adicionar Tarefa</Text>
        </TouchableOpacity>

        <FlatList
          data={filteredTasks}
          renderItem={({ item }) => (
            <View style={[styles.task, { borderColor: item.color }]}>
              <Text style={styles.taskText}>{item.name}</Text>
              <Text style={styles.deadline}>{item.deadline}</Text>
              <TouchableOpacity onPress={() => handleToggleCompleted(item.id)}>
                <Text
                  style={item.completed ? styles.completed : styles.notCompleted}
                >
                  {item.completed ? 'Concluída' : 'Não concluída'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>}
        />
      </View>
    </ScrollView>
  );
};

export default App;
