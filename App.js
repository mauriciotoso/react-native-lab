/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, StatusBar} from 'react-native';
import Listar from './components/listar';
import Detalle from './components/detalle';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {StoreProvider} from './context/storeContext';
import {Home} from './components/home';
import {ListaCategorias} from './components/listaCategorias';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {Registrarme} from './components/registrarme';
import {Compradores} from './components/compradores';

const Stack = createStackNavigator();

export const screens = {
  listar: 'Listado de Productos',
  detalle: 'Detalle de Producto',
  homeIniciado: 'Home',
  listaCategorias: 'Categorias',
  registrarme: 'Gestor de Usuarios',
  compradores: 'Compradores'
};

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <StoreProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator>
            <Stack.Screen           
              initial={true}
              options={{headerShown: false}}
              name={screens.homeIniciado} 
              component={Home} />
            <Stack.Screen 
              name={screens.registrarme}
              component={Registrarme} />
            <Stack.Screen 
              name={screens.compradores} 
              component={Compradores} />
            <Stack.Screen 
              name={screens.listar} 
              component={Listar} />
            <Stack.Screen 
              name={screens.detalle} 
              component={Detalle} />
            <Stack.Screen
              name={screens.listaCategorias}
              component={ListaCategorias}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </ApplicationProvider>
  );
};

export default App;
