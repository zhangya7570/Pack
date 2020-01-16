import React from 'react';
import { Platform,Modal,View,Text } from 'react-native';

import { Provider } from 'mobx-react';
import stores from './src/store/stores';
// import CodePush from 'react-native-code-push'
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import MainScreen from './src/Home';
import LottieAnimatedExample from './src/Animated/LottieAnimatedExample';
import FlatListDemoScreen from './src/Lists/FlatListDemo'

import AuthLoadingScreen from './src/AuthLoading';
import {SignInScreen} from './src/AuthLoading/signIn';
import ProductsScreen from "./src/Message/Products";
import WebViewScreen from "./src/Lists/WebView";
import AsyncStorage from "@react-native-community/async-storage";
import SplashScreen from "react-native-splash-screen";

const Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;
const AppStack = createStackNavigator({
    Home: {
        screen:MainScreen,
        navigationOptions: {
            header: null,
        },
    },
    Other:LottieAnimatedExample,
    FlatList:FlatListDemoScreen,
    Products:ProductsScreen,
    WebView:WebViewScreen
}, {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));

const CODEPUSH_KEY = {
    Android:{
        Staging:'RlHM4Sl0_ScEPbT1fIn5JH0w4-bXc9ac54e5-346e-48a7-b46e-411d052c6000',
        Production:'2lahYxQnqoLN1WYg5K3yvOmJPrMcc9ac54e5-346e-48a7-b46e-411d052c6000'
    },
    Ios:{
        Staging:'YOUR_IOS_STAGING_KEY',
        Production:'YOUR_IOS_PRODUCTION_KEY'
    }
}

class App extends React.Component{
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            downloadProgress:0
        };
    }

    componentDidMount(){
        SplashScreen.hide();

        // CodePush.sync({
        //         deploymentKey:Platform.OS=='android'?CODEPUSH_KEY.Android.Production:CODEPUSH_KEY.Ios.Production,
        //         installMode: CodePush.InstallMode.IMMEDIATE,
        //         updateDialog : {
        //             //是否显示更新描述
        //             appendReleaseDescription : true ,
        //             //更新描述的前缀。 默认为"Description"
        //             descriptionPrefix : "\n\n更新说明:\n" ,
        //             //强制更新按钮文字，默认为continue
        //             mandatoryContinueButtonLabel : "立即更新" ,
        //             //强制更新时的信息. 默认为"An update is available that must be installed."
        //             mandatoryUpdateMessage : "发现重要更新,必須更新后才能使用!" ,
        //             //非强制更新时，按钮文字,默认为"ignore"
        //             optionalIgnoreButtonLabel : '稍后' ,
        //             //非强制更新时，确认按钮文字. 默认为"Install"
        //             optionalInstallButtonLabel : '立即更新' ,
        //             //非强制更新时，检查到更新的消息文本
        //             optionalUpdateMessage : '发现新版本，是否更新?' ,
        //             //Alert窗口的标题
        //             title : '更新提示'
        //         }
        //     },(status) => {
        //         switch(status) {
        //             case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        //                 // console.warn("Checking for updates.");
        //                 break;
        //             case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        //                 this.setState({ modalVisible:true })
        //                 // console.warn("Downloading package.");
        //                 break;
        //             case CodePush.SyncStatus.INSTALLING_UPDATE:
        //                 this.setState({ modalVisible:false })
        //                 // console.warn("Installing update.");
        //                 break;
        //             case CodePush.SyncStatus.UP_TO_DATE:
        //                 this.setState({ modalVisible:false });
        //                 // console.warn("Installing update.");
        //                 break;
        //             case CodePush.SyncStatus.UPDATE_INSTALLED:
        //                 this.setState({ modalVisible:false });
        //                 // console.warn("Update installed.");
        //                 break;
        //         }
        //     },(progress) => {
        //         let receivedBytes = progress.receivedBytes;
        //         let totalBytes = progress.totalBytes;
        //         let downloadProgress = (receivedBytes/totalBytes).toFixed(2) ;
        //         this.setState({ downloadProgress:downloadProgress });
        //         // console.warn(progress.receivedBytes + " of " + progress.totalBytes + " received.");
        //     }
        // )
    }
    render(){
        // let { modalVisible,downloadProgress } = this.state;
        // let percentProgess = String(parseInt(downloadProgress*100)) + '%';
        return(
            <View style={{flex:1}}>
                <Provider {...stores}>
                    <AppContainer/>
                </Provider>
                {/*<Modal*/}
                    {/*visible={modalVisible}*/}
                    {/*animated={'slide'}*/}
                    {/*transparent={true}*/}
                    {/*onRequestClose={()=>this.setState({ modalVisible:false })}*/}
                {/*>*/}
                    {/*<View style={{flex:1,backgroundColor:'rgba(0,0,0,0.4)',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>*/}
                        {/*<View style={{alignItems:'center',justifyContent:'center'}}>*/}
                            {/*<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>*/}
                                {/*<View style={{width:screenW*0.6,height:20,borderRadius:10,backgroundColor:'#e5e5e5'}}>*/}
                                    {/*<View style={{width:screenW*0.6*downloadProgress,height:20,borderRadius:10,backgroundColor:'#ff6952'}}></View>*/}
                                {/*</View>*/}
                                {/*<Text style={{color:'#fff',marginLeft:10,fontSize:14}}>{percentProgess}</Text>*/}
                            {/*</View>*/}
                            {/*<Text style={{color:'#fff',marginTop:12}}>{downloadProgress<1?'正在下载更新资源包,请稍候。。。':'下載完成,应用将重启'}</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</Modal>*/}
            </View>
        );
    }
}

// App=CodePush({checkFrequency: CodePush.CheckFrequency.ON_APP_START})(App);

export default App;
