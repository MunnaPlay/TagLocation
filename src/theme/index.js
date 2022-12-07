import {StyleSheet, Dimensions, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('screen');
const Theme = StyleSheet.create({
    //Splash Screen
    container:{
        flex:1,
        // alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#F4F4F4',
        padding:25
    },
    mainContainer:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    logo:{
        width:width/2.5,
        height:width/5.5,
        alignSelf:'center'
    },
    splashCard:{
        marginTop:40,
        backgroundColor:'#FFFFFF',
        borderRadius:6,
        padding:32,
        alignItems:'center'
    },
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    helloText:{
        fontSize:14,
        fontWeight:'bold',
        color:'#434040',
        backgroundColor:"#E8E7E7",
        padding:10,
        borderRadius:100,
        width:100,
        textAlign:'center'
    },
    splashTitle:{
        color:'#434040',
        fontSize:36,
        fontWeight:'bold',
        margin:10,
        textAlign:'center'
    },
    splashSubTitle:{
        color:'#434040',
        fontSize:18,
        textAlign:'center',
        width:width/1.6,
        lineHeight:30,
        alignSelf:'center'
    },
    splashButton:{
        marginTop:20,
        backgroundColor:"#F4A120",
        padding:10,
        borderRadius:6,
        width:width/2,
        alignSelf:'center'
    },
    getStartedText:{
        color:'#FFFFFF',
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center'
    },
    //OnBoarding Screen
    FarmerImage:{
        height:height/3,
        width:width-50,
        borderRadius:10
    },
    SignInButton:{
        marginTop:20,
        backgroundColor:"#F4A120",
        padding:10,
        borderRadius:6,
        width:width/1.3,
        alignSelf:'center'
    },
    //Mobile Screen
    titleBar:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        borderBottomColor:'#E8E7E7',
        borderBottomWidth:1,
        paddingTop:StatusBar.currentHeight
    },
    backButton:{
        flexDirection:'row',
        flex:2
    },
    backText:{
        fontSize:16,
        marginLeft:5,
        marginTop:-3,
        color:'#F4A120'
    },
    titleBarText:{
        fontSize:16,
        fontWeight:'bold',
        flex:12,
        textAlign:'center',
        color:'#434040',
        marginLeft:-20
    },
    SendOTP:{
        flex:1,
        justifyContent:'center'
    },
    mobileInput:{
        backgroundColor:'#F8F8F8',
        marginTop:20,
        borderRadius:9,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15
    },
    otpContent:{
        width:width/1.3,
        alignSelf:'center'
    }
});

export default Theme;