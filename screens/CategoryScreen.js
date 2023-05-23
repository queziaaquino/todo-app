import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { Button, Text } from 'react-native-elements';
import axios from "axios";

const instance = axios.create({
  baseURL: "https://todo-app-wx01.onrender.com",
});

export default function CategoryScreen({ navigation }) {
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListas();
  }, []);

  const fetchListas = async () => {
    try {
      const response = await instance.get("list");
      setListas(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleAdicionarLista = () => {
    Alert.prompt('Adicionar Lista', 'Digite o nome da nova lista:', (nome) => {
      if (nome) {
        criarLista(nome);
      }
    });
  };

  const criarLista = async (name) => {
    try {
      setLoading(true);
      const response = await instance.post("list", { name });
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
      <Text h2 style={styles.title}>Suas Listas</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20,
  },
  noListText: {
    marginBottom: 20,
  },
});
