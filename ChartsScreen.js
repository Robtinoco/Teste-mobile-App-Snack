import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#555',
  },
  chart: {
    marginBottom: 30,
    borderRadius: 16,
  },
});

const { width } = Dimensions.get('window');

const ChartsScreen = () => {
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [50, 70, 80, 90, 100, 120],
        strokeWidth: 2,
      },
    ],
  };

  const pieData = [
    {
      name: 'JavaScript',
      population: 40,
      color: '#f39c12',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'Python',
      population: 30,
      color: '#2ecc71',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'Java',
      population: 20,
      color: '#3498db',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'C++',
      population: 10,
      color: '#9b59b6',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
  ];


  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#f5f5f5',
    backgroundGradientTo: '#e8e8e8',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, 
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#007bff',
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gráficos</Text>

      <Text style={styles.subtitle}>Gráfico de Linha</Text>
      <LineChart
        data={lineData}
        width={width - 40} 
        height={220} 
        chartConfig={chartConfig}
        bezier 
        style={styles.chart}
      />

      <Text style={styles.subtitle}>Gráfico de Pizza</Text>
      <PieChart
        data={pieData}
        width={width - 40}
        height={220} 
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute 
        style={styles.chart}
      />
    </ScrollView>
  );
};



export default ChartsScreen;
