import { StyleSheet, Text, View } from 'react-native';

export default function Informativa() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Informativa</Text>
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
