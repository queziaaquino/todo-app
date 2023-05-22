import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, ListItem, Text, CheckBox } from 'react-native-elements';
import create from 'zustand';

const useTodoStore = create((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  deleteTask: (index) =>
    set((state) => ({ tasks: state.tasks.filter((_, i) => i !== index) })),
  toggleTask: (index) =>
    set((state) => {
      const tasks = [...state.tasks];
      tasks[index].completed = !tasks[index].completed;
      return { tasks };
    }),
}));

export default function TodoListScreen({ route }) {
  const { category } = route.params;
  const { tasks, addTask, deleteTask, toggleTask } = useTodoStore();

  const renderTask = (task, index) => {
    return (
      <ListItem key={index} bottomDivider>
        <CheckBox
          checked={task.completed}
          onPress={() => toggleTask(index)}
        />
        <ListItem.Content>
          <ListItem.Title
            style={task.completed ? styles.completedTask : null}
          >
            {task.title}
          </ListItem.Title>
        </ListItem.Content>
        <Button title="Excluir" onPress={() => deleteTask(index)} />
      </ListItem>
    );
  };

  const addTaskAndSave = () => {
    addTask({ title: task, completed: false });
    setTask('');
  };

  const [task, setTask] = React.useState('');

  return (
    <View style={styles.container}>
      <Text h2 style={styles.title}>
        {category}
      </Text>
      <Input
        placeholder="Adicionar item"
        value={task}
        onChangeText={(value) => setTask(value)}
        containerStyle={styles.inputContainer}
      />
      <Button
        title="Adicionar"
        onPress={addTaskAndSave}
        containerStyle={styles.button}
      />
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
