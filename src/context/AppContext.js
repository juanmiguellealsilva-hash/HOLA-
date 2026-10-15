// src/context/AppContext.js
import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);
  // Evita que el estado inicial vacío ([]) sobrescriba lo guardado antes de cargarlo
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    // Cargar favoritos al iniciar
    const cargarFavoritos = async () => {
      try {
        const datos = await AsyncStorage.getItem('favoritos');
        if (datos) {
          setFavoritos(JSON.parse(datos));
        }
      } catch (error) {
        console.log('Error al cargar favoritos', error);
      } finally {
        setCargado(true);
      }
    };
    cargarFavoritos();
  }, []);

  useEffect(() => {
    if (!cargado) return;
    // Guardar favoritos cuando cambien
    const guardarFavoritos = async () => {
      try {
        await AsyncStorage.setItem('favoritos', JSON.stringify(favoritos));
      } catch (error) {
        console.log('Error al guardar favoritos', error);
      }
    };
    guardarFavoritos();
  }, [favoritos, cargado]);

  return (
    <AppContext.Provider value={{ favoritos, setFavoritos }}>
      {children}
    </AppContext.Provider>
  );
}
