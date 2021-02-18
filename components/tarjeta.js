import React, {useContext, useState} from 'react';
import {Button, Card, Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {StoreContext} from '../context/storeContext';
import UsuariosModal from './usuariosModal';
import SeleccionarUsuario from './seleccionarUsuario';


const styles = StyleSheet.create({
  tituloContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold', // 100 - 200 - 300 - 400
  },
  precio: {
    fontSize: 15,
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

const Tarjeta = ({titulo, precio, onPressVerDetalles, onPressVerCompradores,producto}) => {

  const {obtenerUsuariosDelProducto} = useContext(StoreContext);
  const usuarios = obtenerUsuariosDelProducto(producto);
  const [usuariosModal, setUsuariosModal] = useState(false);

  return (
    <Card style={styles.card}>
      <View style={styles.tituloContainer}>
      <UsuariosModal
        visible={usuariosModal}
        onClosePressed={() => setUsuariosModal(false)}
        title="Seleccionar Usuario">
        <SeleccionarUsuario producto={producto} />
      </UsuariosModal>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.precio}>Precio: {precio}</Text>
      </View>
      <View style={styles.botonesContainer}>
        <Button appearance="outline" onPress={onPressVerDetalles}>
          Ver Detalles
        </Button>
        <Button 
          status="success"
          onPress={() => {
            setUsuariosModal(true);
          }}>
          COMPRAR
        </Button>
        <Button appearance="outline" onPress={onPressVerCompradores}>
          Ver Compradores
        </Button>
      </View>
    </Card>
  );
};

export default Tarjeta;
