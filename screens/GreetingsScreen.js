import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { primaryColor, secondaryColor } from '../utils/colors'

const GreetingsScreen = ({navigation}) => {


 setTimeout(() => {
    navigation.navigate('Login')
  }, 3000)

  return (
    <View style={styles.container} >
      <Text style={styles.greetingText}>Hangout</Text>
    </View>
  )
}

export default GreetingsScreen

const styles = StyleSheet.create({

container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primaryColor,
    padding: 10
  },
  greetingText: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    // fontFamily: 'SuperFunky',
    color: secondaryColor
  },


})