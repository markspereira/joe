/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Slider } from 'react-native-elements'

let { height, width } = Dimensions.get('window');


GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

export default class App extends Component<{}> {

  state = {
    value: null,
  }

  turnOnLight = async () => {
    try {
      let response = await fetch('http://localhost:3000/arduino/lightOn');

    } catch(error) {
      console.log(error)
    }
  }

  turnOffLight = async () => {
    try {
      let response = await fetch('http://localhost:3000/arduino/lightOff');

    } catch(error) {
      console.log(error)
    }
  }

  turnOnLaser = async () => {
    try {
      let response = await fetch('http://localhost:3000/arduino/on');

    } catch(error) {
      console.log(error)
    }
  }

  turnOffLaser = async () => {
    try {
      let response = await fetch('http://localhost:3000/arduino/off');

    } catch(error) {
      console.log(error)
    }
  };

  turnServo = async (val) => {

    let value = val * 360;
    this.setState({ value });

    // let data = new FormData();
    // data.append( "json", JSON.stringify( payload ) );

    try {
      const servoTurner = await fetch('http://localhost:3000/arduino/adjustServo', { method: "POST", body: { value }})

    } catch(error) {
      console.log(error)
    }
  };


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, {backgroundColor: 'blue'}]} onPress={() => this.turnOnLaser()}><Text style={[styles.text, {color: 'red'} ]}>Laser On</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: 'yellow'}]} onPress={() => this.turnOffLaser()}><Text style={[styles.text, {color: 'blue'} ]}>Laser Off</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: 'orange'}]} onPress={() => this.turnOnLight()}><Text style={[styles.text, {color: 'green'} ]}>Light On</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: 'green'}]} onPress={() => this.turnOffLight()}><Text style={[styles.text, {color: 'orange'} ]}>Light Off</Text></TouchableOpacity>
        </View>
        <View style={{width: width - 20, alignItems: 'stretch', justifyContent: 'center'}}>
          <Slider
            value={this.state.value}
            onValueChange={(value) => this.turnServo(value)} />
          <Text>Value: {this.state.value}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20
  },
  buttonContainer: {
    height: 400,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    height: 140,
    width: 140,
    borderRadius: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    color: 'white',

  }
});
