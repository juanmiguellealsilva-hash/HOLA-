import { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { AppContext } from '../context/AppContext';

export default function Pokemon({ route }) {
  const { nombre } = route.params; // Nombre del Pokémon recibido desde la navegación

  const [pokemon, setPokemon] = useState(null);
  const { favoritos, setFavoritos } = useContext(AppContext);

  const esFavorito = favoritos.some((p) => p.id === pokemon?.id);

  const toggleFavorito = () => {
    if (!pokemon) return;

    if (esFavorito) {
      setFavoritos(favoritos.filter((p) => p.id !== pokemon.id));
    } else {
      setFavoritos([...favoritos, { id: pokemon.id, nombre: pokemon.name }]);
    }
  };

  useEffect(() => {
    const obtenerPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        const data = await res.json();
        setPokemon(data);
      } catch (error) {
        console.log('Error al cargar el Pokémon', error);
      }
    };
    obtenerPokemon();
  }, [nombre]);

  if (!pokemon) return <Text style={styles.cargando}>Cargando...</Text>;

  const stat = (indice) => pokemon.stats[indice].base_stat;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titulo}>
          #{pokemon.id} {pokemon.name}
        </Text>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
          }}
          style={styles.imagen}
        />
        <Text>Tipo(s): {pokemon.types.map((t) => t.type.name).join(', ')}</Text>
        <Text>
          Altura: {pokemon.height / 10} m / Peso: {pokemon.weight / 10} kg
        </Text>

        <View style={styles.stats}>
          <Text>HP: {stat(0)}</Text>
          <Text>Velocidad: {stat(5)}</Text>
          <Text>
            Ataque: {stat(1)} / Defensa: {stat(2)}
          </Text>
          <Text>
            Ataque Especial: {stat(3)} / Defensa Especial: {stat(4)}
          </Text>
        </View>

        <TouchableOpacity onPress={toggleFavorito} style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 32 }}>{esFavorito ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cargando: {
    padding: 20,
    textAlign: 'center',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  imagen: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  stats: {
    marginTop: 10,
    alignItems: 'center',
    gap: 4,
  },
});
