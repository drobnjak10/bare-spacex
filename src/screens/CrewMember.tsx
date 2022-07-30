import * as React from 'react';
import { Image, PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import ErrorModal from '../components/ErrorModal';
import LinkButton from '../components/LinkButton';
import {useRoute, useNavigation} from '@react-navigation/native'
import { RootStackParamList } from '../CustomNavigation';
import type { StackScreenProps } from '@react-navigation/stack';


type Props = StackScreenProps<RootStackParamList, 'CrewMember'>;

function CrewMember(props: Props) {
  const {params} = props.route;
  const [isAllowed, setIsAllowed] = React.useState(false);
  const [error, setError] = React.useState(false);
  const navigation = props.navigation;

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        setIsAllowed(true)
        setError(false)
      } else {
        setIsAllowed(false)
        setError(true)
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
};

const onClose = () => {
  setError(false);
  navigation.navigate('CrewMembers')
}

  React.useEffect(() => {
    //requestCameraPermission()
  }, [])

  if(error) {
    return <ErrorModal visible={error} onClose={onClose} error={'Camera Permission denieed!'} />
  }
  
  return <View style={styles.container}>
    <View style={styles.card}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>{params.item.name}</Text>
       <Image
        style={styles.image}
        source={{
          uri: params.item.image,
        }}
      />
        <LinkButton url={params.item.wikipedia} title={'Read more'} />
    </View>
  </View>
}

export default CrewMember;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    height: '90%',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  image: {
    width: '80%',
    height: '40%'
  }
})