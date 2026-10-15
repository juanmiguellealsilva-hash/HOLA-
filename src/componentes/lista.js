import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Filtro from './filtro';

const idDesdeUrl = (url) => url.split('/')[6];

export default function Lista() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('All');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      setCargando(true);
      try {
        if (tipoSeleccionado === 'All') {
          const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
          const json = await res.json();
          setData(json.results ?? []);
        } else {
          const res = await fetch(`https://pokeapi.co/api/v2/type/${tipoSeleccionado}`);
          const json = await res.json();
          const listaFiltrada = (json.pokemon ?? []).map((p) => p.pokemon);
          setData(listaFiltrada);
        }
      } catch (error) {
        console.log('Error al cargar pokemones', error);
      } finally {
        setCargando(false);
      }
    };
    obtenerDatos();
  }, [tipoSeleccionado]);

  // Buscador: por nombre (3+ letras) o por número
  let resultados = data;
  if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = data.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  } else if (!isNaN(busqueda) && busqueda !== '') {
    resultados = data.filter((pokemon) => idDesdeUrl(pokemon.url) === busqueda.trim());
  }

  // Se pasa como elemento (no como componente) para que el TextInput no pierda el foco
  const encabezado = (
    <View>
      <TextInput
        style={styles.buscador}
        placeholder="Buscar Pokémon"
        value={busqueda}
        onChangeText={setBusqueda}
        autoCapitalize="none"
      />
      <Filtro onTipoChange={setTipoSeleccionado} tipoSeleccionado={tipoSeleccionado} />
      {cargando && <ActivityIndicator style={{ marginVertical: 20 }} size="large" />}
      {!cargando && resultados.length === 0 && (
        <Text style={styles.vacio}>No se encontraron Pokémon.</Text>
      )}
    </View>
  );

  return (
    <FlatList
      data={cargando ? [] : resultados}
      keyExtractor={(pokemon) => pokemon.name}
      numColumns={2}
      ListHeaderComponent={encabezado}
      keyboardShouldPersistTaps="handled"
      columnWrapperStyle={styles.fila}
      initialNumToRender={10}
      windowSize={7}
      renderItem={({ item: pokemon }) => {
        const id = idDesdeUrl(pokemon.url);
        return (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Pokemon', { nombre: pokemon.name })}
          >
            <Text>{id}</Text>
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
              }}
              style={styles.imagen}
            />
            <Text>{pokemon.name}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  fila: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  item: {
    backgroundColor: 'aliceblue',
    width: '48%',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagen: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  buscador: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  vacio: {
    textAlign: 'center',
    marginVertical: 20,
  },
});
