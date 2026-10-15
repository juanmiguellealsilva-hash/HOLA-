import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from "./Componentes/inicio";
import Usuario from "./Componentes/usuario";
import Pokemon from "./Componentes/pokemon";
import Coleccion from "./Componentes/coleccion";
import Favoritos from "./Componentes/favoritos";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Coleccion" component={Coleccion} />
        <Stack.Screen name="Favoritos" component={Favoritos} />
        <Stack.Screen name="Pokemon" component={Pokemon} />
        <Stack.Screen name="Usuario" component={Usuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}