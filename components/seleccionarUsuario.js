import {CheckBox, Divider, List, Text} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {StoreContext} from '../context/storeContext';

const styles = StyleSheet.create({
  chip: {width: 30, height: 10, borderRadius: 10},
  list: {backgroundColor: 'transparent', marginTop: 10},
  item: {paddingVertical: 20},
});

const SeleccionarUsuario = ({producto}) => {
  const {
    obtenerUsuariosDelProducto,
    usuarios,
    agregarProductoAUsuario,
    quitarProductoDeUsuario,
  } = useContext(StoreContext);
  const usuariosDelProducto = obtenerUsuariosDelProducto(producto);

  const renderItem = ({item, index}) => {
    const usuario = item;

    const renderColor = (color) => {
      return (
        <View
          style={[
            styles.chip,
            {
              backgroundColor: color,
            },
          ]}
        />
      );
    };

    const usuarioAsignada = usuariosDelProducto
      .map((c) => c.id)
      .includes(usuario.id);

    return (
      <View style={styles.item}>
        <CheckBox
          status="primary"
          checked={usuarioAsignada}
          onChange={() => {
            if (!usuarioAsignada) {
              agregarProductoAUsuario(usuario, producto);
            } else {
              quitarProductoDeUsuario(usuario, producto);
            }
          }}>
          <Text category="s1">
            {usuario.nombre}
            {'    '}
            {renderColor(usuario.color)}
          </Text>
        </CheckBox>
      </View>
    );
  };

  return (
    <List
      style={styles.list}
      data={usuarios}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

export default SeleccionarUsuario;