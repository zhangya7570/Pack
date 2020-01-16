import React from 'react';
import { Button,Text,TouchableHighlight,Alert, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import TouchID from 'react-native-touch-id'
export class SignInScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign in'
    };

    static authConfigObject = {
        title: '权限申请', // Android
        imageColor: '#e00606', // Android
        imageErrorColor: '#ff0000', // Android
        sensorDescription: '指纹感应', // Android
        sensorErrorDescription: '失败', // Android
        cancelText: '取消', // Android
        fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
        unifiedErrors: false, // use unified error messages (default false)
        passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

    static supportConfigObject = {
        unifiedErrors: false, // use unified error messages (default false)
        passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    }

    _signInAsync =()=>{
        AsyncStorage.setItem('userToken', 'zhang');
        this.props.navigation.navigate('App');
    };

    _pressHandler=()=> {
        var that = this;
        that._signInAsync()
        // TouchID.isSupported(SignInScreen.supportConfigObject)
        //     .then(biometryType => {
        //         // Success code
        //         if (biometryType === 'FaceID') {
        //             console.log('FaceID is supported.');
        //         } else {
        //             console.log('authConfigObject是',SignInScreen.authConfigObject)
        //
        //             console.log('TouchID is supported.');
        //             TouchID.authenticate('指纹认证', SignInScreen.authConfigObject)
        //                 .then(success => {
        //                     Alert.alert('认证通过');
        //                     that._signInAsync()
        //                 })
        //                 .catch(error => {
        //                     console.log('错误',error)
        //                     Alert.alert('认证失败');
        //                 });
        //         }
        //     })
        //     .catch(error => {
        //         // Failure code
        //         console.log('不支持生物识别',error);
        //     });

    }


    render() {
        return (
            <View>
                {/*<Button title="Sign in!" onPress={this._signInAsync} />*/}
                <TouchableHighlight onPress={this._pressHandler}>
                    <Text>
                        Authenticate with Touch ID
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }


}


