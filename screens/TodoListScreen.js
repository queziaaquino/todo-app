import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, ListItem, Text, CheckBox } from 'react-native-elements';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { fetchListIdByName, fetchItemsByListId, deleteItemById, updateItemById } from '../actions/listActions';

const instance = axios.create({
  baseURL: 'http://192.168.0.5:3000', // Altere para a URL correta da API
});

export default function TodoListScreen({ route }) {
  const { category } = route.params;
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const renderTask = (task, index) => {
    return (
      <ListItem key={index} bottomDivider>
        <CheckBox
          checked={task.is_checked}
          onPress={() => toggleTask(index, task.id, task.is_checked)}
        />
        <ListItem.Content>
          <ListItem.Title
            style={task.is_checked ? styles.completedTask : null}
          >
            {task.name}
          </ListItem.Title>
        </ListItem.Content>
        <Button title="Excluir" onPress={() => deleteTask(index, task.id)} />
      </ListItem>
    );
  };

  const addTaskAndSave = async () => {
    try {
      const listId = await fetchListIdByName(category);
      if (!listId) {
        console.error('Lista não encontrada');
        return;
      }

      const newItem = {
        id: uuidv4(),
        name: task,
      };

      await instance.post(`list/${listId}/item`, newItem);
      setTasks([...tasks, newItem]);
      setTask('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (index, itemId) => {
    await deleteItemById(itemId);
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleTask = async (index, itemId, isChecked) => {
    const check = Boolean(!isChecked);
    await updateItemById(itemId, check);
  
    const updatedTasks = tasks.map((task) => {
      if (task.id === itemId) {
        return { ...task, is_checked: check };
      }
      return task;
    });
  
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const getListItems = async () => {
      try {
        const listId = await fetchListIdByName(category);
        if (!listId) {
          console.error('Lista não encontrada');
          return;
        }

        const items = await fetchItemsByListId(listId);
        setTasks(items);
      } catch (error) {
        console.error(error);
      }
    };

    getListItems();
  }, [category]);

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
