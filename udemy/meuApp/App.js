import React, { Component } from 'react';
import { View, Text,StyleSheet, TextInput } from 'react-native';
class App extends Component {
  constructor(props){
    super(props);
    this.state = { nome: ''};
    this.pegaNome = this.pegaNome.bind(this);
  }

  pegaNome(texto){
    this.setState({nome: texto});
  }

  render() {


    return (
      
      <View style={styles.container}>
        <TextInput style={styles.input}></TextInput>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: { flex:1 },
  input: {borderWidth:1, fontSize: 20, margin: 10, padding:10}
});



export default App;