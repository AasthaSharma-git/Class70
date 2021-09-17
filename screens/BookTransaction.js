import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image,TextInput} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

class BookTransaction extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedStudentID: '',
      scannedBookID:'',
      buttonState: 'normal',
    };
  }

  getCameraPermission = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: id,
      scanned:false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    var id=this.state.buttonState
    if(id==='studentID'){
       this.setState({
      scanned: true,
      scannedStudentID: data,
      buttonState: 'normal',
    });
    }
    else if(id==='bookID'){
      this.setState({
      scanned: true,
      scannedBookID: data,
      buttonState: 'normal',
    });
    }
    
    
    
  };

  render() {
    const cp = this.state.hasCameraPermissions;
    const bs = this.state.buttonState;
    const scanned = this.state.scanned;

    if (bs !== 'normal' && cp) {
      console.log(bs)
      return (
        
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
      );
    } else if (bs === 'normal') {
      return (
        <View >
        
        
        <View style={[styles.scan1,{marginTop:150,alignSelf:'center'}]}>
            <TextInput style={styles.input}
            placeholder='Book Id'
             value={this.state.scannedBookID}
            >
          </TextInput>
           <TouchableOpacity
            style={styles.button}
            onPress= {()=>this.getCameraPermission('bookID')}>
            <Text>Scan</Text>
          </TouchableOpacity>
        </View>
          <View style={[styles.scan1,{marginTop:-150,alignSelf:'center'}]}>
          <TextInput style={styles.input}
          placeholder='Student Id'
          value={this.state.scannedStudentID}>
          </TextInput>
          <TouchableOpacity
            style={styles.button}
            onPress= {()=>this.getCameraPermission('studentID')}>
            <Text>Scan</Text>
          </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'gray',
    width:100,
    height: 50,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 200,
    alignSelf:'center'
  },
  
  input:{
    marginLeft:20,
    marginTop:200,
    border:10,
    borderColor:'black',
    width:200,
    height:50,
    backgroundColor:'skyblue'
  },

  scan1:{
    flexDirection:'row'
  },
});

export default BookTransaction;
