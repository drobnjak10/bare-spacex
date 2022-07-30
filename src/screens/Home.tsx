import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Home() {
  return <View style={styles.container}>
    <Text>
      Welcome to SpaceX App
    </Text>
  </View>
}

export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})