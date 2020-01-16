import React, {Component, PureComponent} from "react";
import { View, WebView, FlatList, ActivityIndicator,Alert,Platform } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

class WebViewScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            userToken:null
        };
        this.webView=null
        this.webViewRef = element => {
            this.webView = element;
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('userToken',(err, result)=>{
            if(!err){
                this.setState({userToken:result})
            }
        });

    }


    render() {
       let {userToken}=this.state;
        return (
            <View style={{flex:1,borderTopWidth: 0, borderBottomWidth: 0 }}>
               <WebView
                   source={require('./webViewPage.html')}
                   ref={this.webViewRef}
                   // injectedJavaScript={`sendToWeb('${userToken}')`}
                   style={{marginTop: 20,height:500,flex:1}}
                   onMessage={(m) => {
                       var string_data = m.nativeEvent.data;
                       if(Platform.OS === "ios"){
                           // IOS returns the data url encoded/percent-encoding twice
                           // unescape('%257B') -> %7B
                           // unescape(%7B) -> {
                           string_data = unescape(unescape(string_data));
                       }
                       Alert.alert('接收的消息',string_data);

                   }}

                   // onLoadEnd={() => {
                   //     this.webView.postMessage('RN向H5发送的消息------');
                   // }}

               />
            </View>
        );
    }
}

export default WebViewScreen;