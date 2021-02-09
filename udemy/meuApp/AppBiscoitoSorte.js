import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      frase: '',
      img: require('./src/imagens/biscoito.png')
    };
    this.frases = [
      'A vida trará coisas boas se tiveres paciência.',
      'Demonstre amor e alegria em todas as oportunidades e verás que a paz nasce dentro de você.',
      'Não compense na ira o que lhe falta na razão.',
      'Defeitos e virtudes são apenas dois lados da mesma moeda.',
      'A maior de todas as torres começa no solo.',
      'Não há que ser forte. Há que ser flexível.',
      'Gente todo dia arruma os cabelos, por que não o coração?',
      'Há três coisas que jamais voltam; a flecha lançada, a palavra dita e a oportunidade perdida.',
      'A juventude não é uma época da vida, é um estado de espírito.',
      'Podemos escolher o que semear, mas somos obrigados a colher o que plantamos.',
      'Dê toda a atenção para a formação dos teus filhos, sobretudo por exemplos de tua própria vida.',
      'Siga os bons e aprenda com eles.'
    ]
    this.quebrarBiscoito = this.quebrarBiscoito.bind(this);
  }

  quebrarBiscoito() {
    let numeroAleatorio = Math.floor(Math.random() * this.frases.length);
    this.setState({
      frase: this.frases[numeroAleatorio],
      img: require('./src/imagens/biscoitoAberto.png')
    });
  }

  render() {


    return (

      <View style={styles.container}>
        <Image style={styles.img} source={this.state.img}></Image>
        <Text style={styles.textoFrase}>{this.state.frase}</Text>

        <TouchableOpacity style={styles.botao} onPress={this.quebrarBiscoito}>
          <View style={styles.btnArea}>
            <Text style={styles.btnTexto}>Abrir Biscoito</Text>

          </View>
        </TouchableOpacity>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' },
  img: { width: 150, height: 150 },
  textoFrase: { fontStyle: 'italic', fontSize: 20, color: '#dd7b22', margin: 30 },
  botao: {
    width: 230, height: 50, borderWidth: 2,
    borderColor: '#dd7b22', borderRadius: 20,
    alignContent: 'center', alignItems: 'center'
  },
  btnArea: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  btnTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dd7b22'
  }


});



export default App;