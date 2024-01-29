import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView } from "react-native"
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useState } from "react";

const SignInScreen = ()=>{
    const navigation = useNavigation()
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isPWSecure, setPWSecure] = useState(true);

    const displayPW = () => {
        setPWSecure(!isPWSecure);
    };
    const deleteTextPhone =()=>{
        setPhoneNumber('')
    };
    const handPhoneNumber = (phone)=>{
        setPhoneNumber(phone)
    }
    const handPressLogin = () => {
        // Thực hiện quá trình đăng nhập ở đây và kiểm tra thành công
      
        // Nếu đăng nhập thành công
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'InsideChat' },
            ],
          })
        );
      };
    return(
    <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.text}>Vui lòng nhập só điện thoại và mật khẩu để đăng nhập</Text>
        <View style={styles.input}>
            <TextInput style={styles.textInput} placeholder="Số điện thoại" keyboardType="number-pad" onChangeText={handPhoneNumber} value={phoneNumber}/> 
            <Text style={styles.icon} onPress={deleteTextPhone}>{phoneNumber===''?'':'x'}</Text>
        </View>
        <View style={styles.input}>
            <TextInput style={styles.textInput} placeholder="Mật khẩu" secureTextEntry={isPWSecure}/>
            <Text style={styles.icon} onPress={displayPW}>{isPWSecure?'Hiện':'Ẩn'}</Text>
        </View>
        <Text style={{color:"#0080FF", fontWeight:"bold", marginLeft:"2%"}}>Lấy lại mật khẩu</Text>
        <TouchableOpacity style={styles.button} onPress={handPressLogin}>
            <Text style={{color:"#FFFFFF", fontSize:20, textAlign: "center"}}>Đăng nhập</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    text: {
      fontSize: 15,
      textAlign:"center",
      backgroundColor:"#E0E0E0",
      paddingVertical:"3%"
    },
    input:{
        height:"8%",
        flexDirection:"row",
        borderBottomWidth:1,
        borderBottomColor:"#00FFFF",
        marginVertical:"2%",
        marginHorizontal:"2%",
    },
    textInput:{
        fontSize:20,
        alignSelf:"center",
        width:"90%"
    },
    icon:{
        alignSelf:"center",
        color:"#A0A0A0"
    },
    button:{
        width:"40%",
        height:"7%",
        alignSelf:"center",
        backgroundColor:"#FF8000",
        borderRadius:20,
        justifyContent:"center"
        
    }
  });

export default SignInScreen