import { StyleSheet, Text, View } from 'react-native';

export default function Usuario() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Usuario</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 20,
  },
});
