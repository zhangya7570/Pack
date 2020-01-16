import React from 'react';
import {View, Text, TextInput, StyleSheet, Image, PanResponder, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Swiper from 'react-native-swiper'

import { createBottomTabNavigator } from 'react-navigation';
import {observer,inject} from 'mobx-react';
import MessageScreen from "../Message";
import ListsScreen from '../Lists';
// import CarouselMessage from '../components/carouselMsg';

import { Card, ListItem, Button, Icon,CheckBox,Divider,Header } from 'react-native-elements';

const users = [
    {
        name: 'brynn',
        avatar: 'http://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
]



const Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;
const topCtnHeight = 340;

const curriculumArr=[
    {source:require('../Img/early-edu.png'),name:'早教'},
    {source:require('../Img/arts.png'),name:'美术'},
    {source:require('../Img/music.png'),name:'音乐'},
    {source:require('../Img/kongfu.png'),name:'武术'},
    {source:require('../Img/go.png'),name:'围棋'},
    {source:require('../Img/sports.png'),name:'体育'},
    {source:require('../Img/sing.png'),name:'唱歌'},
    {source:require('../Img/ballet.png'),name:'芭蕾'},
    {source:require('../Img/piano.png'),name:'钢琴'},
    {source:require('../Img/painting.png'),name:'绘画'}
]

const institutionsArr =[
    {source:require('../Img/early-edu.png'),type:'早教',name:'西安市长安区少星音乐艺术课程',campus:'小天鹅培训班第一校区', yearly:true,refund:true,distance:2,enrollment:168},
    {source:require('../Img/early-edu.png'),type:'绘画',name:'西安市长安区少星音乐艺术课程',campus:'小天鹅培训班第三校区', yearly:true,refund:true,distance:2,enrollment:54},
    {source:require('../Img/early-edu.png'),type:'围棋',name:'西安市长安区少星音乐艺术课程',campus:'天才培训班第五校区', yearly:false,refund:false,distance:3,enrollment:89},
    {source:require('../Img/early-edu.png'),type:'芭蕾',name:'西安市长安区少星音乐艺术课程',campus:'小天鹅培训班第一校区', yearly:true,refund:true,distance:4,enrollment:79},
    {source:require('../Img/early-edu.png'),type:'钢琴',name:'西安市长安区少星音乐艺术课程',campus:'聪明屋培训班', yearly:false,refund:false,distance:5,enrollment:135}
]



@inject('home')
@observer
 class HomeScreen extends React.Component {
     constructor(props){
         super(props);
         this.state={
             data:[],
             canScroll:false
         }
         this.thresholdMin = 60;
         this.thresholdMax = 280;
         this.sapceInitHeight = screenH;
         this.spaceHeight = screenH;
         this.topCtnInitHeight = topCtnHeight;
         this.topCtnHeight = topCtnHeight;
         this.topCtnInitOpacity = 1;
         this.topCtnOpacity = 1;
         this._spaceStyles = {};
         this.space = (null: ?{ setNativeProps(props: Object): void });
         this._topCtnStyles = {};
         this.topCtn = (null: ?{ setNativeProps(props: Object): void });
         this.show = true;
     }
    componentWillMount() {
        let data=[]
        for(let i =0;i<10;i++){
            data.push({name:'react-native-list-item'})
        }
        this.setState({data})
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            //this.refs[RefsConstant.HOME_DEV_LIST].setRefreshFunc(false);
            // onStartShouldSetPanResponder: (evt, gestureState) => !this.state.canScroll,
            onStartShouldSetPanResponderCapture:(evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                if(!this.state.canScroll){
                    return true
                }
                if (Math.abs(gestureState.dx) < this.thresholdMin && Math.abs(gestureState.dy) < this.thresholdMin) {
                    return false;
                } else {
                    if ((this.show && gestureState.dy < 0) || (!this.show && gestureState.dy > 0)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },

            onPanResponderGrant: (evt, gestureState) => {
                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
                console.log('onPanResponderGrant');
                // gestureState.{x,y} 现在会被设置为0
            },
            onPanResponderMove: (evt, gestureState) => {
                // 最近一次的移动距离为gestureState.move{X,Y}
                console.log('onPanResponderMove');
                console.log('滑动参数：dx=' + gestureState.dx + '，dy=' + gestureState.dy + '可见吗=' + this.show);
                // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
                if ((this.show && gestureState.dy < 0) || (!this.show && gestureState.dy > 0)) {
                    this._spaceStyles.style.height = this.sapceInitHeight + gestureState.dy;
                    this._topCtnStyles.style.height = this._spaceStyles.style.height * this.topCtnHeight / this.spaceHeight;
                    this._topCtnStyles.style.opacity = this._spaceStyles.style.height / this.spaceHeight;
                    if (this._spaceStyles.style.height >= 0 && this._spaceStyles.style.height <= this.spaceHeight) {
                        this._updateNativeStyles();
                    }
                }
            },
            //是否可以释放响应者角色让给其他组件
            onPanResponderTerminationRequest: (evt, gestureState) => this.state.canScroll,
            onPanResponderRelease: (evt, gestureState) => {
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                console.log('onPanResponderRelease');
                // 一般来说这意味着一个手势操作已经成功完成。
                if (gestureState.dy <= -1 * this.thresholdMax && this.show) {
                    this._spaceStyles.style.height = 0;
                    this._topCtnStyles.style.height = 0;
                    this._topCtnStyles.style.opacity = 0;
                    this.show = false;
                    console.log('隐藏');
                    this.setState({canScroll:true})
                    this._updateNativeStyles();
                } else if (gestureState.dy >= this.thresholdMax && !this.show) {
                    this._spaceStyles.style.height = this.spaceHeight;
                    this._topCtnStyles.style.height = this.topCtnHeight;
                    this._topCtnStyles.style.opacity = this.topCtnOpacity;
                    this.show = true;
                    console.log('显示');
                    this.setState({canScroll:false})
                    this._updateNativeStyles();
                } else {
                    this._spaceStyles.style.height = this.show ? this.spaceHeight : 0;
                    this._topCtnStyles.style.height = this.show ? this.topCtnHeight : 0;
                    this._topCtnStyles.style.opacity = this.show ? this.topCtnOpacity : 0;
                    console.log('不变');
                    this._updateNativeStyles();
                }
                this.sapceInitHeight = this._spaceStyles.style.height;
                this.topCtnInitHeight = this._topCtnStyles.style.height;
                this.topCtnInitOpacity = this._topCtnStyles.style.opacity;
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
                console.log('onPanResponderTerminate');
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return true;
            },
        });

        this._spaceStyles = {
            style: {
                height: this.sapceInitHeight,
            }
        };
        this._topCtnStyles = {
            style: {
                height: this.topCtnInitHeight,
                opacity: this.topCtnInitOpacity,
            }
        }
    }
    _updateNativeStyles() {
        this.space && this.space.setNativeProps(this._spaceStyles);
        this.topCtn && this.topCtn.setNativeProps(this._topCtnStyles);
    }
    componentDidMount() {
        this._updateNativeStyles();
    }

    _onScroll=(event)=>{
         console.log('事件',event.nativeEvent)
    }
    _goto=()=>{
         this.props.navigation.navigate('Products')
    }

    render() {

        let curriculum=curriculumArr.map((item)=>{
           return (<View style={styles.curriculum_item} key={item.name}>
                <Image source={item.source} style={styles.curriculum_Img} />
                <Text style={styles.curriculum_name} >{item.name}</Text>
            </View>)
        })
        let institutions=institutionsArr.map((item,index)=>{
            return (<View style={styles.institution_item} key={index}>
                <Image source={item.source} style={styles.institution_Img} />
                <View>
                    <View>
                        {/*<Image source={require('../Img/')} style={styles.institution_Img} />*/}
                        <View>{item.name}</View>
                    </View>
                    <View>{item.campus}</View>
                    <View></View>
                </View>
            </View>)
        })

        return (
            <View style={[styles.container,styles.space]} ref={(space) => {
                this.space = space;
            }} >
                <View>
                {/*<View {...this._panResponder.panHandlers}>*/}
                    {/*<View style={styles.space}*/}
                    {/*ref={(space) => {*/}
                    {/*this.space = space;*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*<Image style={styles.topCtn}*/}
                    {/*ref={(topCtn) => {*/}
                    {/*this.topCtn = topCtn;*/}
                    {/*}}*/}
                    {/*source={require('../Img/hello.png')}/>*/}
                    {/*</View>*/}
                    <Button title="Show me more of the apps" onPress={this._showMoreApp} />
                    {/*<Button title="Actually, sign me out :)" onPress={this._signOutAsync} />*/}
                    <Button style={{marginTop:30}} title="go to Product Page" onPress={this._goto} />

                    {/*<Text>{this.props.home.name}</Text>*/}
                    {/*<FlatList*/}
                    {/*style={{flex:1}}*/}
                    {/*data={this.state.data}*/}
                    {/*renderItem={({ item,index }) => (*/}
                    {/*<View>*/}
                    {/*<Text>{item.name+index}</Text>*/}
                    {/*</View>*/}
                    {/*)}*/}
                    {/*keyExtractor={(item,index) => item.name+index}*/}
                    {/*/>*/}
                </View>
                {/*<View style={styles.topCtn}*/}
                {/*      ref={(topCtn) => {*/}
                {/*          this.topCtn = topCtn;*/}
                {/*      }} >*/}
                {/*    <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} activeDotColor='#fff' >*/}
                {/*        <View style={styles.slide1}>*/}
                {/*            <Text style={styles.text}>Hello Swiper</Text>*/}
                {/*        </View>*/}
                {/*        <View style={styles.slide2}>*/}
                {/*            <Text style={styles.text}>Beautiful</Text>*/}
                {/*        </View>*/}
                {/*        <View style={styles.slide3}>*/}
                {/*            <Text style={styles.text}>And simple</Text>*/}
                {/*        </View>*/}
                {/*    </Swiper>*/}
                {/*    <View style={styles.curriculum}>*/}
                {/*        <View style={styles.curriculum_container}>*/}
                {/*            {curriculum}*/}
                {/*        </View>*/}
                {/*        <View style={styles.msg_container}>*/}
                {/*            <Image source={require('../Img/topNews.png')} resizeMode='contain' style={{width:60,height:20}} />*/}
                {/*            <Text style={{marginLeft:6,marginRight:6}}>|</Text>*/}
                {/*            <Image source={require('../Img/latest.png')} resizeMode='contain' style={{width:40,height:16,marginRight:6}} />*/}
                {/*            /!*<View><Text>激活年卡享受超多优惠等你探索～</Text></View>*!/*/}
                {/*            /!*<CarouselMessage*!/*/}
                {/*            /!*viewHeight={20}*!/*/}
                {/*            /!*deviceWidth={screenW-180}*!/*/}
                {/*            /!*data={[{content:"1激活年卡享受超多优惠等你探索～"},{content:"2激活年卡享受超多优惠等你探索～"},{content:"3激活年卡享受超多优惠等你探索～"}]}*!/*/}
                {/*            /!*startNow={true}/>*!/*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*    <View style={{height:8,width:screenW,backgroundColor:'rgb(240,245,246)'}}/>*/}
                {/*</View>*/}

                {/*<View style={styles.institutions}>*/}
                {/*    <View><Text>————— 推荐机构 —————</Text></View>*/}
                {/*    <FlatList*/}
                {/*        onMoveShouldSetResponder={()=>this.canScroll}*/}
                {/*        onStartShouldSetResponder={()=>this.canScroll}*/}
                {/*        onPanResponderGrant={()=>this.canScroll}*/}
                {/*        style={{flex:1,width:screenW}}*/}
                {/*        data={this.state.data}*/}
                {/*        renderItem={({ item,index }) => (*/}
                {/*            <View style={{flexDirection:'row',marginLeft:12,marginRight:12}}>*/}
                {/*                <Image source={require('../Img/institution-1.png')} style={{width:140,height:110,marginRight:6}} resizeMode='contain' />*/}
                {/*                <View style={{flex:1,height:110,flexDirection:'column',justifyContent:'space-between',padding:6}}>*/}
                {/*                    <View>*/}
                {/*                        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-start'}}>*/}
                {/*                            <View style={styles.type}><Text style={styles.type_word}>早教</Text></View>*/}
                {/*                            <Text style={styles.name}>           西安市长安区少星音乐艺术课程</Text>*/}
                {/*                        </View>*/}
                {/*                        <View style={styles.campus}><Text>小天鹅培训班第一校区</Text></View>*/}
                {/*                    </View>*/}
                {/*                    <View style={styles.institution_bottom_view}>*/}
                {/*                        <View style={{flexDirection:'row'}}>*/}
                {/*                            <View style={[styles.label,{backgroundColor:'rgb(250,102,46)'}]}>*/}
                {/*                                <Text style={styles.label_txt}>年</Text>*/}
                {/*                            </View>*/}
                {/*                            <View style={[styles.label,{backgroundColor:'rgb(32,69,195)'}]}>*/}
                {/*                                <Text style={styles.label_txt}>退</Text>*/}
                {/*                            </View>*/}
                {/*                        </View>*/}
                {/*                        <View style={{flexDirection:'row'}}>*/}
                {/*                            <Text>3km</Text><Text style={{marginRight:8,marginLeft:8,color:'#999'}}>|</Text><Text>187人报名</Text>*/}
                {/*                        </View>*/}
                {/*                    </View>*/}
                {/*                </View>*/}
                {/*            </View>*/}
                {/*        )}*/}
                {/*        keyExtractor={(item,index) => item.name+index}*/}
                {/*        // onMomentumScrollEnd={e => console.log('滑动',e.nativeEvent.contentOffset.y)}*/}

                {/*    />*/}
                {/*</View>*/}
            </View>
        );
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('Other');
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

const TabNavigator = createBottomTabNavigator({
    Home: HomeScreen,
    Message: MessageScreen,
    Lists: ListsScreen
},{
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            var iconName;
            const img_arr = [
                require('../Img/curriculum.png'),
                require('../Img/curriculum-off.png'),
                require('../Img/institutions.png'),
                require('../Img/institutions-off.png'),
                require('../Img/appointment.png'),
                require('../Img/appointment-off.png')
            ]

            if (routeName === 'Home') {
                iconName = focused? img_arr[0]:img_arr[1]
                // Sometimes we want to add badges to some icons.
                // You can check the implementation below.
                // IconComponent = HomeIconWithBadge;
            } else if (routeName === 'Message') {
                iconName = focused? img_arr[2]:img_arr[3]
            }else if(routeName === 'Lists'){
                iconName = focused? img_arr[4]:img_arr[5]
            }
            // You can return any component that you like here!
            return <Image source={iconName} style={{width:25,height:25}} />;
        },
    }),

    tabBarOptions: {
        activeTintColor: 'rgb(40,43,44)',
        inactiveTintColor: 'gray',
    },

});
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex:1
    },
    space: {
        height: screenH,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    curriculum:{
        // flex:1,

    },
    curriculum_container:{
        paddingLeft:6,
        paddingRight:6,
        flexDirection:"row",
        justifyContent:'space-around',
        flexWrap:'wrap',
    },
    curriculum_item:{
        width:(screenW-12)/5,
        padding:6,
        justifyContent:"center",
        alignItems:'center',
    },
    curriculum_Img:{
        width:(screenW-12)/5-12,
        height:(screenW-12)/5-12
    },
    curriculum_name:{
        fontSize:12,
        marginTop:4
    },
    institutions:{
        flex:1,
        alignItems:'center',
        padding:12
    },
    msg_container:{
        marginTop:8,
        marginBottom:8,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    institution_item:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    institution_Img:{
        width:200,
        height:130
    },
    institution_bottom_view:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    type:{
        backgroundColor:'rgb(253,243,238)',
        position:'absolute',
        top:0,
        left:0,
        width:40,
        height:18,
        justifyContent:'center',
        alignItems:'center'
    },
    name:{
        fontSize:16,
        lineHeight:20,
        fontWeight:'bold',
        color:'rgb(11,11,14)',


    },
    type_word:{
        lineHeight:18,
        color:'rgb(249,107,37)'
    },
    campus:{
        color:'#999'
    },
    label:{
        width:18,
        height:18,
        marginRight:10,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center'
    },
    label_txt:{
        color:'#fff',
        fontSize:12,
        fontWeight:'bold'
    },
    topCtn: {
        opacity:1,
        width:screenW,
        height: topCtnHeight,
        marginBottom:5,
        resizeMode: 'contain'
    },
    wrapper: {
        height:200
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});


export default TabNavigator;
