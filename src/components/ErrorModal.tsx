import React from 'react';
import {
  Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';


interface IProps {
	visible: boolean;
	onClose?: () => void;
	error: string;
}

const ErrorModal = ({ visible, onClose, error }: IProps) => {
  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
          <Text style={styles.title}>{error}</Text>
         {onClose &&  <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={{ color: '#fff' }}>Close Modal</Text>
          </TouchableOpacity>}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    color: 'red'
  },
   button: {
    backgroundColor: 'red',
    width: '50%',
    textTransform: 'uppercase',
    marginTop: '10px',
    padding: 10,
    textAlign: 'center'
  },
});

export default ErrorModal;