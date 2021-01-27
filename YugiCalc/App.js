import React, { Component } from 'react';
import {
StyleSheet,
Text,
View,
TextInput,
Button,
TouchableOpacity
} from 'react-native';

export default class App extends Component {
constructor(props) {
super();
this.rollADice = this.rollADice.bind(this);

this.changeToBlue = this.changeToBlue.bind(this);
this.suma = this.suma.bind(this);
this.changeToRed = this.changeToRed.bind(this);
this.substract = this.substract.bind(this);
this.state = {
  resultText: "",
  calculationTextA: 4000,
  calculationTextB: 4000,
  player: "A"
};
this.operations = ['DEL', '+', '-', 'Blue', "Red"];
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
    resultText: ""
    });
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
    resultText: ""
    });
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
        player: "A"
      });
      console.log(this.state.player)
    };
rollADice(){
      console.log("ROLL A DICE")
    };
changeToRed () {
      this.setState({
        player: "B"
      });
      console.log(this.state.player)
    };
calculationResult() {
  const text = this.state.resultText;
  this.setState({
  calculationTextA: eval(text)
  })
  }


validate(){
const text=this.state.resultText
lastChar = text.slice(-1);
firstChar = text.slice(0);

switch(text.slice(0)){
case '+':
  console.log("first char is " + text)
  this.suma(text);

case '-':
  console.log("resta")
  this.substract(text);
case '1':
  console.log("1 is pressed" )

  this.setState({resultText: this.state.resultText + "1"})
case '2':
  console.log("2 is pressed" )
  this.setState({resultText: this.state.resultText + "2"})
case '3':
  console.log("3 is pressed" )
  this.setState({resultText: this.state.resultText + "3"})
case '4':
  console.log("4 is pressed" )

  this.setState({resultText: this.state.resultText + "4"})
case '5':
  console.log("5 is pressed" )
  this.setState({resultText: this.state.resultText + "5"})
case '6':
  console.log("6 is pressed" )
  this.setState({resultText: this.state.resultText + "6"})
case '7':
  console.log("7 is pressed" )

  this.setState({resultText: this.state.resultText + "7"})
case '8':
  console.log("8 is pressed" )
  this.setState({resultText: this.state.resultText + "8"})
case '9':
  console.log("9 is pressed" )
  this.setState({resultText: this.state.resultText + "9"})
case '0':
  console.log("0 is pressed" )
  this.setState({resultText: this.state.resultText + "0"})



return false
}
return true
}





_onPressButton(text) {


if (text == 'Reset') {
  this.setState({
    calculationTextA: 4000,
    calculationTextB: 4000,
    resultText: ""
    })

}
else if (text == '.') {
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
  console.log(this.state.resultText);
  let text = this.state.resultText.split("");
  text.pop();
  this.setState({
  resultText: text.join("")
  });
  break

case 'Blue':
  this.changeToBlue();
  console.log("ITS BLUE 100");
  break;
case 'Red':
  this.changeToRed();
  console.log("its red 104")
  break;
case '+':
  this.suma();
  console.log("Suma")
  break;
case '-':
  this.substract();
  console.log("REsta")
  break;
}
}

render() {
let rows = [];
let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, 'Reset']];
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
onPress={() => this.operate(this.operations[i])} >
<Text style={[styles.btnText, styles.white]}>
{this.operations[i]}
</Text>
</TouchableOpacity>
);
}

return (
<View style={styles.container}>
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
}
});
