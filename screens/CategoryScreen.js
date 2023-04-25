import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

export default function CategoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text h2 style={styles.title}>Suas Listas</Text>
      <Button
        title="Lista de Compras"
        onPress={() => navigation.navigate('Lista', { category: 'Lista de Compras' })}
        containerStyle={styles.buttonContainer}
      />
      <Button
        title="ToDo List"
        onPress={() => navigation.navigate('Lista', { category: 'ToDo List' })}
        containerStyle={styles.buttonContainer}
      />
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
});
