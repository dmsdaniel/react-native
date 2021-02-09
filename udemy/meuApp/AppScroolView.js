import React, { Component } from 'react';
import { View,  StyleSheet, ScrollView } from 'react-native';
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.box1}></View>
          <View style={styles.box2}></View>
          <View style={styles.box3}></View>
          <View style={styles.box4}></View>
        </ScrollView>   

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aeff'
  },
  box1: {
    height: 250,
    backgroundColor: 'red'
  },
  box2: {
    height: 250,
    backgroundColor: 'green'
  },
  box3: {
    height: 250,
    backgroundColor: 'yellow'
  },
  box4: {
    height: 250,
    backgroundColor: 'blue'
  },


});



export default App;