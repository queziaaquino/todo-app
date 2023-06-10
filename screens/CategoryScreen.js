import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-elements';
import CustomInputDialogModal from './CustomInputDialogModal';
import { fetchListas, adicionarLista, removerLista } from '../actions/listActions';

const CategoryScreen = ({ navigation }) => {
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
    <View style={styles.container}>
      <Text style={styles.title}>Suas Listas</Text>
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
                  containerStyle={styles.buttonContainer}
                />
                <Button
                  title='x'
                  onPress={() => handleRemoverLista(lista.id)}
                />
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.noListText}>Nenhuma lista encontrada.</Text>
            </View>
          )}
          <Button
            title="Adicionar Lista"
            onPress={handleAdicionarLista}
            color="#f194ff"
            containerStyle={styles.buttonContainer}
          />
        </>
      )}
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
  title: {
    marginBottom: 30,
    fontSize: 40,
  },
  buttonContainer: {
    flex: 1,
    marginRight: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  noListText: {
    marginBottom: 20,
  },
});

export default CategoryScreen;
