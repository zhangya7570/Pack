import React from 'react';
import { StyleSheet, Text, View,Animated,TouchableOpacity,Easing} from 'react-native';

export default class AnimatedScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            fadeOutOpacity:new Animated.Value(1),
        }
    }

    componentDidMount(){

    }

    _startAnimated = () => {
        Animated.timing(
            this.state.fadeOutOpacity,
            {
                toValue: 0,
                easing: Easing.linear,
                duration: 2000,
            }
        ).start(()=>this.state.fadeOutOpacity.setValue(1))
    }


    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={{width: 200, height: 300, opacity: this.state.fadeOutOpacity}}>
                    <Text>
                        这是一段会变化的文字
                    </Text>
                </Animated.View>

                <TouchableOpacity onPress={this._startAnimated}>
                    <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
