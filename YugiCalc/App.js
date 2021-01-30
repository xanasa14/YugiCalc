var Sound = require('react-native-sound');

import React, { Component, useRef, useState, useEffect } from 'react';
import {StyleSheet,Text,View,TextInput,Button,TouchableOpacity,Animated,Image} from 'react-native';
import * as Progress from 'react-native-progress';
import ReactDice from 'react-dice-roller';


export default class App extends Component {

constructor(props) {
super();

this.rollADice = this.rollADice.bind(this);
this.changeToBlue = this.changeToBlue.bind(this);
this.suma = this.suma.bind(this);
this.changeToRed = this.changeToRed.bind(this);
this.substract = this.substract.bind(this);
this.getRandomNumber = this.getRandomNumber.bind(this);
this.setDiceImage = this.setDiceImage.bind(this);
this.state = {
  resultText: "",calculationTextA: 4000,
  calculationTextB: 4000,player: "A",dado: 1,randomNumber: 1,
  uri: require('YugiCalc/assets/diceImages/dice1.png'),
};
this.operations = ['DEL', '+', '-', 'Blue', "Red"];
}
getRandomNumber = () => {
    let randomNumber = Math.floor((Math.random() * 6) + 1);
    this.setState({
      randomNumber: randomNumber
    })
    return randomNumber;
  }

setDiceImage = () => {

  randNum = this.getRandomNumber();

  switch(randNum) {
    case 1:
      this.setState({
        uri: require('YugiCalc/assets/diceImages/dice1.png')})
        break;
    case 2:
      this.setState({
        uri: require('YugiCalc/assets/diceImages/dice2.png')})
        break;
      case 3:
      this.setState({
        uri: require('YugiCalc/assets/diceImages/dice3.png')})
        break;
      case 4:
      this.setState({
        uri: require('YugiCalc/assets/diceImages/dice4.png')})
        break;
      case 5:
      this.setState({
        uri: require('YugiCalc/assets/diceImages/dice5.png')})
      break;
      case 6:
      this.setState({
        uri: require('YugiCalc/assets/diceImages/dice6.png')})
      break;
      default:
    }

    Sound.setCategory('Ambient', true);
    const buttonPress = new Sound(require('YugiCalc/assets/audios/YuGiOhLifePointSoundEffect.mp3'), error => console.log(error));
    buttonPress.play((success) => buttonPress.reset());
}
suma(){
  if (this.state.player === "A"){
    let resultTextLength = this.state.resultText.length;
    if (resultTextLength > 0) {
      if(this.state.resultText.slice(0)==="0"){
        myString = this.state.resultText;
        myString = myString.replace('/^0/','')
        this.setState({resultText: myString })
        }
      var temp = this.state.resultText
      var tempNumber = parseInt(temp)
      this.setState({calculationTextA : (this.state.calculationTextA + tempNumber),
        resultText: ""
        });
      }
    }
  else if (this.state.player ==="B"){
    let resultTextLength = this.state.resultText.length;
    if (resultTextLength > 0) {
      if(this.state.resultText.slice(0)==="0"){
        myString = this.state.resultText;
        myString = myString.replace('/^0/','')
        this.setState({resultText: myString })
        }
      var temp = this.state.resultText
      var tempNumber = parseInt(temp)
      this.setState({calculationTextA : (this.state.calculationTextA + tempNumber),
        resultText: ""});
      }
    }
}
substract(){
  if (this.state.player === "A"){
    let resultTextLength = this.state.resultText.length;
    if (resultTextLength > 0) {
    if(this.state.resultText.slice(0)==="0"){
      myString = this.state.resultText;
      myString = myString.replace('/^0/','')
      this.setState({resultText: myString })
    }
    var temp = this.state.resultText;
    var tempNumber = parseInt(temp)
    this.setState({calculationTextA : (this.state.calculationTextA - tempNumber),
      resultText: ""});
  }
  }
  else if (this.state.player==="B"){
    let resultTextLength = this.state.resultText.length;
    if (resultTextLength > 0) {
    if(this.state.resultText.slice(0)==="0"){
      myString = this.state.resultText;
      myString = myString.replace('/^0/','')
      this.setState({resultText: myString })
    }
    var temp = this.state.resultText;
    var tempNumber = parseInt(temp)
    this.setState({calculationTextB : (this.state.calculationTextB - tempNumber),
      resultText: ""
      });
  }
  }
}
changeToBlue(){
      this.setState({
        player: "A"});
    };
rollADice(){
      this.setDiceImage();
    };
changeToRed () {
      this.setState({
        player: "B"});
    };
calculationResult() {
  const text = this.state.resultText;
  this.setState({
  calculationTextA: eval(text)})
  }
validate(){
const text=this.state.resultText

switch(text.slice(0)){
  case '+':
    this.suma(text);
  case '-':
    this.substract(text);
  case '1':
    this.setState({resultText: this.state.resultText + "1"})
  case '2':
    this.setState({resultText: this.state.resultText + "2"})
  case '3':
    this.setState({resultText: this.state.resultText + "3"})
  case '4':
    this.setState({resultText: this.state.resultText + "4"})
  case '5':
    this.setState({resultText: this.state.resultText + "5"})
  case '6':
    this.setState({resultText: this.state.resultText + "6"})
  case '7':
    this.setState({resultText: this.state.resultText + "7"})
  case '8':
    this.setState({resultText: this.state.resultText + "8"})
  case '9':
      this.setState({resultText: this.state.resultText + "9"})
  case '0':
      this.setState({resultText: this.state.resultText + "0"})
  return false
  }
return true
}

_onPressButton(text) {
  if (text == 'Reset') {
    this.setState({
      calculationTextA: 4000,calculationTextB: 4000,resultText: ""})
  }
  else if (text == 'Dice') {
    this.rollADice();
    var tem=this.state.resultText
    tem = tem.replace('.','')
    this.setState({
      resultText: tem
      })

  }
  else{
    this.setState({
      resultText: this.state.resultText + text
      });
    }
}
operate(operation) {
  switch (operation) {
    case 'DEL':
      let text = this.state.resultText.split("");
      text.pop();
      this.setState({resultText: text.join("")});
      break
    case 'Blue':
      this.changeToBlue();
      break;
    case 'Red':
      this.changeToRed();
      break;
    case '+':
      this.suma();
      break;
    case '-':
      this.substract();
      break;
  }
}

render() {
  let rows = [];
  let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['Dice', 0, 'Reset']];
  for (let i = 0; i < 4; i++) {
  let row = [];
  for (let j = 0; j < 3; j++) {
  row.push(
  <TouchableOpacity
  key={nums[i][j]}
  style={styles.btn}
  onPress={() => this._onPressButton(nums[i][j])}
  >
  <Text style={styles.btnText}>{nums[i][j]}</Text>
  </TouchableOpacity>
  );
  }
  rows.push(<View key={i} style={styles.row}>{row}</View>);
  }

  let ops = [];
  for (let i = 0; i < 5; i++) {
  ops.push(
  <TouchableOpacity
  key={this.operations[i]}
  style={styles.btn}
  onPress={() => this.operate(this.operations[i])}  >
  <Text style={[styles.btnText, styles.white]}>
  {this.operations[i]}
  </Text>
  </TouchableOpacity>
  );
  }

  return (

  <View style={styles.container}>

  <View style={{
    marginTop: 60, jusifyContent: "center", alignItems: "center",

  }}>

<Text style={{marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1F38'}}>You Rolled a {this.state.randomNumber}</Text>
  <Image
       style={{ width: 66, height: 58 , marginBottom:10 }}
       source={this.state.uri}
       />


   </View>
   <View style={styles.progressBarA}>
   <Progress.Bar progress={this.state.calculationTextA/4000}
   width={200} color={'blue'} height={45} borderWidth={0}
   animated={true}/>
   <Progress.Bar progress={this.state.calculationTextB/4000} width={200} color={'red'}
   animated={true} height={45} borderWidth={0}
   style={{ transform: [{ rotate: '180deg'}]}}/>



   </View>
    <View style={styles.result}>
      <Text style={styles.resultText}>{this.state.resultText}</Text>
    </View>

    <View style={styles.calculationA}>
      <Text style={styles.calculationTextA}>{this.state.calculationTextA} </Text>
      <Text style={styles.calculationTextB}>{this.state.calculationTextB} </Text>
    </View>

    <View style={styles.buttons}>
      <View style={styles.numbers}>{rows}</View>
      <View style={styles.operations}>{ops}</View>

    </View>
  </View>
  );
  }
}

const styles = StyleSheet.create({
container: {
flex: 1
},
row: {
flexDirection: 'row',
flex: 1,
justifyContent: 'space-around',
alignItems:'stretch'
},
resultText: {
fontSize: 25,
paddingRight:10,
color: 'green'
},
btnText: {
fontSize: 40,
color: 'white'
},
texto: {
marginTop: 60,
color: 'pink'
},
white: {
color: 'white'
},
btn: {
flex: 1,
alignItems: 'center',
alignSelf: 'stretch',
justifyContent: 'center'
},
devider:{
borderRightColor:'yellow',
borderBottomColor:'yellow',
borderRightWidth : 0.5,
borderBottomWidth : 0.5
},
result: {
flex: 2,
backgroundColor: 'white',
justifyContent: 'center',
alignItems:'flex-end'
},
calculationA: {
flexDirection: 'row',
backgroundColor: 'white',
alignItems:'flex-start',
justifyContent: 'space-between',

},

calculationTextA: {
fontSize: 50,
paddingRight:10,
color: 'blue'
},
calculationTextB: {
fontSize: 50,
color: 'red'
},
buttons: {
flex: 7,
flexDirection: 'row'
},
numbers: {
flex: 3,
padding :1,
backgroundColor: '#1e2326'
},
operations: {
flex: 1,
justifyContent: 'space-around',
alignItems:'stretch',
backgroundColor: '#454e54'
},
progressBarA: {
   flexDirection: 'row',
   justifyContent:'space-between',
   alignItems:'center',
 },

});
