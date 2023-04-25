import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, ListItem, Text, CheckBox } from 'react-native-elements';

export default function TodoListScreen({ route }) {
  const { category } = route.params;
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = () => {
    setTasks([...tasks, task]);
    setTask('');
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const renderTask = (task, index) => {
    const isTaskCompleted = completedTasks.includes(index);
    return (
      <ListItem key={index} bottomDivider>
        <CheckBox
          checked={isTaskCompleted}
          onPress={() => {
            if (isTaskCompleted) {
              setCompletedTasks(completedTasks.filter(i => i !== index));
            } else {
              setCompletedTasks([...completedTasks, index]);
            }
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={isTaskCompleted ? styles.completedTask : null}>{task}</ListItem.Title>
        </ListItem.Content>
        <Button title="Excluir" onPress={() => deleteTask(index)} />
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <Text h2 style={styles.title}>{category}</Text>
      <Input
        placeholder="Adicionar item"
        value={task}
        onChangeText={(value) => setTask(value)}
        containerStyle={styles.inputContainer}
      />
      <Button title="Adicionar" onPress={addTask} containerStyle={styles.button} />
      <View style={styles.listContainer}>
        {tasks.map((task, index) => renderTask(task, index))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
});
