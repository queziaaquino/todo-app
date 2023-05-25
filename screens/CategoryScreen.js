import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-elements';
import axios from 'axios';
import CustomInputDialogModal from './CustomInputDialogModal';

const instance = axios.create({
  baseURL: 'http://192.168.0.5:3000',
});

const CategoryScreen = ({ navigation }) => {
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    fetchListas();
  }, []);

  const fetchListas = async () => {
    try {
      const response = await instance.get('list');
      setListas(response.data);
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
      const response = await instance.post('list', { name: nome });
      const novaLista = response.data;
      setListas([...listas, novaLista]);
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
              <Button
                key={lista.id}
                title={lista.name}
                onPress={() => navigation.navigate('Lista', { category: lista.name })}
                containerStyle={styles.buttonContainer}
              />
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
      <CustomInputDialogModal style={styles.teste}
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
    fontSize: 40
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20,
  },
  noListText: {
    marginBottom: 20,
  },
  teste: {
    alignItems: 'center'
  }
});

export default CategoryScreen;
