import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Image, StyleSheet, Text as TextNative} from 'react-native';
import {Text, Button, Icon} from '@ui-kitten/components';
import {StoreContext} from '../context/storeContext';
import {FlatList} from 'react-native-gesture-handler';
import UsuariosModal from './usuariosModal';
import SeleccionarUsuario from './seleccionarUsuario';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  logo: {
    flex: 1,
    height: 240,
  },
  contenedorImgPrecio: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 2,
  },
  infoProducto: {
    borderLeftColor: 'grey',
    borderLeftWidth: 2,
    flexDirection: 'column',
    flex: 2,
    justifyContent: 'center',
  },
  form: {marginBottom: 30},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  btnVolver: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 10,
  },
  btnGuardar: {
    flex: 2,
    marginHorizontal: 5,
    marginTop: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: '200',
    fontStyle: 'italic',
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 10,
  },
  textPrice: {
    fontSize: 30,
    fontWeight: '300',
    fontStyle: 'italic',
    textAlign: 'left',
    marginTop: 'auto',
    marginLeft: 10,
  },
  textPriceDiscount: {
    fontSize: 20,
    color: '#00a650',
  },
  textEnvio: {
    fontSize: 18,
    fontWeight: '200',
    fontStyle: 'italic',
    textAlign: 'left',
    color: '#00a650',
    marginTop: 5,
    lineHeight: 32, // Mismo height que el icono para que el texto tenga la base en la misma linea
  },
  icon: {
    width: 32,
    height: 32,
  },
  chip: {
    height: 40,
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginRight: 5,
  },
});

export const Compradores = ({route: {params}, ...props}) => {
  const navigator = useNavigation();
  const {producto} = params;
  const {obtenerUsuariosDelProducto} = useContext(StoreContext);
  const usuarios = obtenerUsuariosDelProducto(producto);
  const [usuariosModal, setUsuariosModal] = useState(false);

  return (
    <View style={styles.container}>
      <UsuariosModal
        visible={usuariosModal}
        onClosePressed={() => setUsuariosModal(false)}
        title="Seleccionar Usuario">
        <SeleccionarUsuario producto={producto} />
      </UsuariosModal>
      <Text category="h4">{producto.title}</Text>
      <Text>Usuarios que han comprado el producto:</Text>
      <FlatList
        data={usuarios}
        horizontal
        renderItem={({item}) => (
          <View style={[styles.chip, {backgroundColor: item.color}]}>
            <Text>{item.nombre}</Text>
          </View>
        )}
      />
      <View style={styles.form}>
        <Button
          appearance="outline"
          style={styles.btnVolver}
          onPress={() => {
            setUsuariosModal(true);
          }}>
          MODIFICAR COMPRADORES
        </Button>
        <View style={styles.buttons}>
          <Button
            appearance="outline"
            style={styles.btnVolver}
            onPress={() => {
              navigator.goBack();
            }}>
            VOLVER
          </Button>
          <Button
            status="success"
            style={styles.btnGuardar}
            onPress={() => {
              navigator.goBack();
            }}>
            GUARDAR
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Compradores;