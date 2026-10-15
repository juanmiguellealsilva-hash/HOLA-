import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppProvider } from './src/context/AppContext';

import Informativa from './src/componentes/informativa';
import Capturados from './src/componentes/capturados';
import Favoritos from './src/componentes/favoritos';
import Lista from './src/componentes/lista';
import Usuario from './src/componentes/usuario';
import Pokemon from './src/componentes/pokemon';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Cada pestaña que puede abrir el detalle tiene su propio stack:
// así el botón "atrás" vuelve a la pestaña de origen.
function ListaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista" component={Lista} />
      <Stack.Screen name="Pokemon" component={Pokemon} />
    </Stack.Navigator>
  );
}

function FavoritosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favoritos" component={Favoritos} />
      <Stack.Screen name="Pokemon" component={Pokemon} />
    </Stack.Navigator>
  );
}

function CapturadosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Capturados" component={Capturados} />
      <Stack.Screen name="Pokemon" component={Pokemon} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        {/* headerShown: false en las pestañas con stack, para no duplicar el encabezado */}
        <Tab.Navigator>
          <Tab.Screen
            name="ListaTab"
            component={ListaStack}
            options={{ title: 'Lista', headerShown: false }}
          />
          <Tab.Screen name="Informativa" component={Informativa} />
          <Tab.Screen
            name="CapturadosTab"
            component={CapturadosStack}
            options={{ title: 'Capturados', headerShown: false }}
          />
          <Tab.Screen
            name="FavoritosTab"
            component={FavoritosStack}
            options={{ title: 'Favoritos', headerShown: false }}
          />
          <Tab.Screen name="Usuario" component={Usuario} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
