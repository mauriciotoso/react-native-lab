import React, {useContext, useState} from 'react';
import {Button, Card, Icon, Text} from '@ui-kitten/components';
import {StyleSheet, View, FlatList, TextInput} from 'react-native';
import {StoreContext} from '../context/storeContext';
import {ColorPicker} from 'react-native-color-picker';
import useOrientation, {SCREEN} from '../hooks/useOrientation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BottomSheetModal from './bottomSheetModal';

const styles = StyleSheet.create({
  container: {flex: 1},
  card: {flex: 1, margin: 5},
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 999,
    borderRadius: 60,
    width: 60,
    height: 60,
  },
  modalView: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: '50%',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  textInput: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: 'lightgrey',
    marginVertical: 10,
  },
  modalButton: {
    marginVertical: 10,
  },
  cardText: {textAlign: 'center', fontWeight: 'bold'},
});


export const Registrarme = () => {
  const {usuarios, setUsuarios,} = useContext(StoreContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [primaraPantalla, setPrimeraPantalla] = useState(true);
  const [nombreNuevoUsuario, setNombreNuevoUsuario] = useState('');
  const [emailNuevoUsuario, setEmailNuevoUsuario] = useState('');
  const [colorNuevoUsuario, setColorNuevoUsuario] = useState('red');
  const screenDirection = useOrientation();

  const crearUsuario = () => {
    setUsuarios([
      ...usuarios,
      {
        nombre: nombreNuevoUsuario,
        color: colorNuevoUsuario,
        email: emailNuevoUsuario,
        id: Math.random().toString(10),
      },
    ]);
    setNombreNuevoUsuario('');
    setEmailNuevoUsuario('');
    setColorNuevoUsuario('red');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <BottomSheetModal
        visible={modalVisible}
        onClosePressed={() => setModalVisible(false)}
        title={primaraPantalla ? 'Crear un Usuario' : 'Elegir Color'}>
        <>
          {primaraPantalla && (
            <PrimeraPantalla
              nombreNuevoUsuario={nombreNuevoUsuario}
              setNombreNuevoUsuario={setNombreNuevoUsuario}
              emailNuevoUsuario={emailNuevoUsuario}
              setEmailNuevoUsuario={setEmailNuevoUsuario}
              colorNuevoUsuario={colorNuevoUsuario}
              setPrimeraPantalla={setPrimeraPantalla}
              crearUsuario={crearUsuario}
            />
          )}
          {!primaraPantalla && (
            <SegundaPantalla
              setPrimeraPantalla={setPrimeraPantalla}
              setColorNuevoUsuario={setColorNuevoUsuario}
            />
          )}
        </>
      </BottomSheetModal>
      <Button
        style={styles.button}
        accessoryLeft={PlusIcon}
        onPress={() => setModalVisible(true)}
      />
      <FlatList
        data={usuarios}
        key={screenDirection}
        numColumns={screenDirection === SCREEN.LANDSCAPE ? 4 : 2}
        renderItem={({item}) => {
          return (
            <Card
              style={{...styles.card, backgroundColor: item.color}}
              key={item.id}>
              <Text style={styles.cardText}>{item.nombre}</Text>
              <Text style={styles.cardText}>{item.email}</Text>
            </Card>
          );
        }}
      />
    </View>
  );
};

const PrimeraPantalla = ({
  nombreNuevoUsuario,
  setNombreNuevoUsuario,
  emailNuevoUsuario,
  setEmailNuevoUsuario,
  colorNuevoUsuario,
  setPrimeraPantalla,
  crearUsuario,
}) => {
  return (
    <>
      <TextInput
        placeholder="Nombre de Usuario"
        style={styles.textInput}
        value={nombreNuevoUsuario}
        onChangeText={(nuevoTexto) => {
          setNombreNuevoUsuario(nuevoTexto);
        }}
      />
      <TextInput
        placeholder="Email de Usuario"
        style={styles.textInput}
        value={emailNuevoUsuario}
        onChangeText={(nuevoTexto) => {
          setEmailNuevoUsuario(nuevoTexto);
        }}
      />
      <TouchableOpacity onPress={() => setPrimeraPantalla(false)}>
        <TextInput
          placeholder="Color de Usuario"
          editable={false}
          style={styles.textInput}
          value={colorNuevoUsuario}
        />
      </TouchableOpacity>
      <Button style={styles.modalButton} onPress={() => crearUsuario()}>
        Crear usuario
      </Button>
    </>
  );
};

const SegundaPantalla = ({setColorNuevoUsuario, setPrimeraPantalla}) => {
  return (
    <>
      <ColorPicker
        onColorSelected={(color) => {
          setPrimeraPantalla(true);
          setColorNuevoUsuario(color);
        }}
        hideSliders={true}
        style={styles.container}
      />
      <Button
        style={styles.modalButton}
        onPress={() => setPrimeraPantalla(true)}>
        Volver
      </Button>
    </>
  );
};

const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;
