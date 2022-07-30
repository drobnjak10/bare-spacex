import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../CustomNavigation';
import { ICrew } from '../interfaces';


interface IProps {
  item: ICrew;
  props: StackScreenProps<RootStackParamList, 'CrewMember'> 
}

function Crew({item, props}: IProps) {
	const navigation = props.navigation;

  console.log('props', props)
  
  return <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          <TouchableOpacity style={styles.button} onPress={() =>
          navigation.navigate('CrewMember', {item: item})
          }>
            <Text style={styles.text}>Read more...</Text>
          </TouchableOpacity>
        </View>
        <Image
        style={styles.image}
        source={{
          uri: item.image,
        }}
      />
  </View>
}

export default Crew;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    marginTop: 20,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
  },
  image: {
    width: '50%',
    height: 100
  },
  content: {
    width: '50%'
  },
  button: {
    backgroundColor: '#22A7F0',
    width: '80%',
    textTransform: 'uppercase',
    marginTop: 10
  },
  text: {
    color: '#fff', 
    fontSize: 12, 
    textAlign: 'center', 
    padding: 10
  }
})