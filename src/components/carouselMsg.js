

import React,{ Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Animated,
    Alert
} from 'react-native';

const Dimensions = require('Dimensions');

let deviceWidth = Dimensions.get("window").width;
let viewHeight = 0; // 组件高度
export default class CarouselMessage extends Component {

    // static propTypes = {
    //     data: PropTypes.array, // 轮播消息数组
    //     duration: PropTypes.int, // 动画持续时间(ms)
    //     stayTime: PropTypes.int, // 停留时间(ms)
    //     viewHeight: PropTypes.int, // 组件高度
    //     onClick: PropTypes.func, // 点击内容调用的方法,返回点击的数据
    //     fontSize:PropTypes.int  // 内容字体尺寸
    //     // 外部可以通过style控制除高度以外的样式, 高度通过viewHeight属性控制
    // };

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            firstTop: new Animated.Value(0), // firstView距离组件顶部的距离
            secondTop: new Animated.Value(viewHeight), // secondView距离组件顶部的距离
            firstIdx: 0, // firstView显示的数据索引
            secondIdx: 1, // secondView显示的数据索引
            showFirst: true, // 只有两条数据时才用到改属性. 用于firstView和secondView的位置切换
            duration:this.props.duration || 1500, // 动画持续时间
            stayTime:this.props.stayTime || 5000,  // 停留时间
            fontSize:this.props.fontSize || 12, // 内容字体尺寸
            lineHeight:this.props.lineHeight ||14
        };
    }

    componentWillMount() {
        if (this.props.viewHeight) {
            viewHeight = this.props.viewHeight;
            this.setState({secondTop:new Animated.Value(this.props.viewHeight)})
        }
        if(this.props.deviceWidth){
            deviceWidth = this.props.deviceWidth;
        }
    }

    componentDidMount() {
        // 如果startNow==true, 组件加载完成后就开启计时器. 也可以通过手动调用startTimer方法开启定时器
        this.props.startNow && this.startTimer();
    }

    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
    }

    render() {
        // data有值才渲染轮播组件.只有一条数据只需渲染first组件
        return (
            <View style={{width:deviceWidth,justifyContent:"center",backgroundColor:"white",paddingLeft:4,paddingRight:4,...this.props.style,height:viewHeight}}>

                {(this.state.data && this.state.data.length > 0) &&
                <View style={{overflow:"hidden"}}>
                    {this.state.data && this.state.data.length > 0 && this.createView(this.state.data[this.state.firstIdx],this.state.firstTop)}
                    {this.state.data && this.state.data.length > 1 && this.createView(this.state.data[this.state.secondIdx],this.state.secondTop,true)}
                </View>
                }

            </View>
        )
    }

    // 内容组件
    createView(item,offset,absolute) {

        return (
            <Animated.View style={[{height:viewHeight,width:deviceWidth - 10,transform:[{translateY:offset}]},
                absolute && {position:"absolute",top:0}]}>
                <TouchableOpacity style={{flex:1,justifyContent:"center"}}
                                  activeOpacity={0.8}
                                  onPress={()=>this.onItemClick(item)}>
                    <Text style={{fontSize:this.state.fontSize,lineHeight:this.state.lineHeight}}
                          numberOfLines={1} ellipsizeMode='tail' >{item.content}</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    // 开启定时器
    startTimer() {
        // 如果只有一条数据, 无需开启定时器
        if (this.state.data.length == 1) return;

        // 如果有两条数据, 无需修改界面内容
        if (this.state.data.length == 2) {
            this.interval = setInterval(()=>{
                    if (this.state.showFirst) {
                        this.moveFirstView(()=>this.setState({showFirst:false}));
                    } else {
                        this.moveSecondView(()=>this.setState({showFirst:true}));
                    }
                },
                this.state.stayTime
            );
            return;
        }

        // 如果有3条及以上数据, 每次滚动后需要修改界面内容
        this.interval = setInterval(()=>{
                if ((this.state.firstIdx) == 0 && (this.state.secondIdx == this.state.data.length - 1)) {
                    // 当滚动到第偶数轮结束的时候, 会出现该情况. 该情况下firstIdx < secondIdx, 但是要滚动secondView, 所以特殊处理
                    this.moveSecondView(this.onSecondAnimateEnd.bind(this));
                } else if ((this.state.firstIdx < this.state.secondIdx) ||
                    (this.state.secondIdx == 0 && this.state.firstIdx == this.state.data.length - 1)) {
                    // 当滚动到第奇数轮结束的时候,会出现firstIdx > secondIdx的情况, 但是需要滚动firstView
                    this.moveFirstView(this.onFirstAnimateEnd.bind(this));
                } else {
                    this.moveSecondView(this.onSecondAnimateEnd.bind(this));
                }
            },
            this.state.stayTime
        )
    }

    // 移动firstView
    moveFirstView(onAnimatedEnd) {
        // console.log("first move -->",this.state.firstIdx,this.state.secondIdx);
        Animated.parallel([
            Animated.timing(this.state.firstTop,{
                toValue:-viewHeight,
                duration:this.state.duration
            }),
            Animated.timing(this.state.secondTop,{
                toValue:0,
                duration:this.state.duration
            })
        ]).start(()=>{
            this.state.firstTop.setValue(viewHeight);
            onAnimatedEnd();
        })
    }

    // 移动secondView
    moveSecondView(onAnimatedEnd) {
        // console.log("second move -->",this.state.firstIdx,this.state.secondIdx);
        Animated.parallel([
            Animated.timing(this.state.firstTop,{
                toValue:0,
                duration:this.state.duration
            }),
            Animated.timing(this.state.secondTop,{
                toValue:-viewHeight,
                duration:this.state.duration
            })
        ]).start(()=>{
            this.state.secondTop.setValue(viewHeight);
            onAnimatedEnd();
        })
    }

    // firstView滚动后修改数据
    onFirstAnimateEnd() {
        // 如果当前显示的数据是最后一条, 则下次从0开始显示, 否则就++
        if (this.state.secondIdx == this.state.data.length - 1) {
            this.setState({firstIdx:0});
        } else {
            this.setState({firstIdx:this.state.secondIdx + 1});
        }
    }

    // secondView滚动后修改数据
    onSecondAnimateEnd() {
        if (this.state.firstIdx == this.state.data.length - 1) {
            this.setState({secondIdx:0});
        } else {
            this.setState({secondIdx:this.state.firstIdx + 1});
        }
    }

    // 点击内容
    onItemClick(item) {
        if (!this.props.onClick) return Alert.alert("提示", "请传入onClick方法");
        this.props.onClick(item);
    }

}
