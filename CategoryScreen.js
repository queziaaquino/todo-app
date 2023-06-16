import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Text } from '@rneui/base';
import CustomInputDialogModal from './CustomInputDialogModal';
import { fetchListas, adicionarLista, removerLista } from '../actions/listActions';
import { useDarkModeStore } from './store';

const CategoryScreen = ({ navigation }) => {
  const { darkMode, toggleDarkMode } = useDarkModeStore();
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const listasData = await fetchListas();
      setListas(listasData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleAdicionarLista = () => {
    setDialogVisible(true);
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
  };

  const handleDialogSubmit = async (nome) => {
    setDialogVisible(false);
    try {
      setLoading(true);
      const novaLista = await adicionarLista(nome);
      setListas([...listas, novaLista]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleRemoverLista = async (id) => {
    try {
      setLoading(true);
      await removerLista(id);
      setListas(listas.filter((lista) => lista.id !== id));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.topRightContainer}>
        <Button
          title={darkMode ? 'Light' : 'Dark'}
          onPress={toggleDarkMode}
          containerStyle={[styles.buttonContainer, styles.darkModeButton]}
          color="#808080"
        />
      </View>
      <View style={styles.middleContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {listas.length > 0 ? (
              listas.map((lista) => (
                <View style={styles.listItem} key={lista.id}>
                  <Button
                    title={lista.name}
                    onPress={() => navigation.navigate('Lista', { category: lista.name })}
                    containerStyle={[styles.buttonList]}
                    color="#008080"
                  />
                  <Button
                    title='x'
                    onPress={() => handleRemoverLista(lista.id)}
                    containerStyle={[styles.buttonContainer, styles.tealButton]}
                    color="#008080"
                  />
                </View>
              ))
            ) : (
              <View>
                <Text style={[styles.noListText, darkMode && styles.darkText]}>Nenhuma lista encontrada.</Text>
              </View>
            )}
          </>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <Button
          title="Adicionar Lista"
          onPress={handleAdicionarLista}
          color="#008080"
          containerStyle={[styles.buttonContainer, styles.tealButton]}
        />
      </View>
      <CustomInputDialogModal
        visible={dialogVisible}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  topRightContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 10,
  },
  buttonContainer: {
    marginRight: 10,
  },
  darkModeButton: {
    backgroundColor: 'teal',
  },
  tealButton: {
    backgroundColor: 'teal',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  noListText: {
    marginBottom: 20,
  },
  darkText: {
    color: '#fff',
  },
  buttonList: {
    minWidth: 300, 
    backgroundColor: 'teal',
    marginRight: 10
  }
});

export default CategoryScreen;
