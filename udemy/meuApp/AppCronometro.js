import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numero: 0,
      botao: 'Iniciar',
      ultimo: null
    };
    this.timer = null;
    this.limpar = this.limpar.bind(this);
    this.iniciar = this.iniciar.bind(this);

  }

  iniciar() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
      this.setState({ botao: 'Iniciar' })
    } else {
      this.timer = setInterval(() => {
        this.setState({ numero: this.state.numero + 0.1 })
      }, 100)
      this.setState({ botao: 'Parar' })
    }
  }

  limpar() {
    clearInterval(this.timer)
    this.timer = null;
    this.setState({ 
      ultimo: this.state.numero,
      numero: 0, 
      botao: 'Iniciar' });
  }

  render() {


    return (

      <View style={styles.container}>
        <Image style={styles.cronometro} source={require('./src/imagens/cronometro.png')}></Image>
        <Text style={styles.timer}>{this.state.numero.toFixed(1)}</Text>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={this.iniciar}>
            <Text style={styles.btnTexto}>{this.state.botao}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.limpar}>
            <Text style={styles.btnTexto}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.areaUltimo}>
          <Text style={styles.textoUltimo}>
            {this.state.ultimo ? 'Ultimo tempo: ' + this.state.ultimo.toFixed(1) + 's': ''} </Text>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeff'
  },
  timer: {
    marginTop: -160,
    color: '#FFF',
    fontSize: 65,
    fontWeight: 'bold'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 70,
    height: 40
  },
  btn: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 10,
    borderRadius: 9
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeff'
  },
  areaUltimo: {
    marginTop: 40
  },
  textoUltimo: {
    fontStyle: 'italic',
    fontSize: 30,
    color: '#FFF'
  }


});



export default App;