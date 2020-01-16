import React from 'react';
import {StyleSheet, View, Button, Image,StatusBar,ScrollView,Text} from 'react-native';
import {toJS} from 'mobx';
import {inject, observer} from "mobx-react";
import { Avatar, Badge,withBadge,ButtonGroup,CheckBox,Input,Overlay,Rating, AirbnbRating} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


// @inject('message')
// @observer
export default class ProductsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedIndex: 2,
            checked:false,
            isVisible:false
        }
    }

    static navigationOptions = {
        // headerTitle: '产品页'
        header:null
    };
    updateIndex = (selectedIndex)=> {
        this.setState({selectedIndex})
    }
    _onChangeCheckBox=()=>{
        this.setState({checked:!this.state.checked})
    }

    componentDidMount(){

    }
    render() {
        const buttons = ['Hello', 'World', 'Buttons']
        const { selectedIndex } = this.state
        return (
            <ScrollView style={styles.container}>
                <StatusBar hidden={true} />
                {/*<Text style={styles.welcome}>这是最新的产品页</Text>*/}
                {/*<Image source={require('../Img/user.png')} />*/}
                <View style={styles.itemCtn}>
                    <Avatar
                        rounded
                        size="large"
                        source={{
                            uri:
                                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                        }}
                    />
                    <Avatar
                        size="large"
                        title="CR"
                        showEditButton
                    />
                </View>
                <View style={styles.itemCtn}>
                    <Badge value="99+" status="primary" />

                    <View>
                        <Avatar
                            rounded
                            source={{
                                uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                            }}
                            size="large"
                        />
                        <Badge
                            value="2" status="error"
                            containerStyle={{ position: 'absolute', top: 1, right: 1 }}
                        />
                    </View>
                </View>
                <View>
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{height: 30,width:300}}
                    />
                </View>
                <View>
                    <CheckBox
                        title='Click Here'
                        checked={this.state.checked}
                        onPress={this._onChangeCheckBox}
                    />

                    <CheckBox
                        center
                        title='Click Here'
                        checked={this.state.checked}
                        onPress={this._onChangeCheckBox}

                    />

                    <CheckBox
                        center
                        title='Click Here'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checked}
                        onPress={this._onChangeCheckBox}

                    />
                    <CheckBox
                        center
                        title='Click Here to Remove This Item'
                        iconRight
                        iconType='material'
                        checkedIcon='clear'
                        uncheckedIcon='add'
                        checkedColor='red'
                        checked={this.state.checked}
                        onPress={this._onChangeCheckBox}
                    />
                </View>
                <View>
                    <Input
                        placeholder='BASIC INPUT'
                    />
                    <Input
                        placeholder='INPUT WITH ICON'
                        leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    />
                    <Input
                        placeholder='INPUT WITH CUSTOM ICON'
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Input
                        placeholder='INPUT WITH ERROR MESSAGE'
                        errorStyle={{ color: 'red' }}
                        // errorMessage='ENTER A VALID ERROR HERE'
                    />
                </View>
                <View>
                    <Overlay
                        isVisible={this.state.isVisible}
                        onBackdropPress={() => this.setState({ isVisible: false })}
                    >
                        <Text>Hello from Overlay!</Text>
                    </Overlay>
                </View>
                <View>
                    <AirbnbRating
                        count={11}
                        reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
                        defaultRating={11}
                        size={20}
                    />
                    <Rating
                        type='heart'
                        ratingCount={3}
                        imageSize={20}
                        showRating
                    />

                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    itemCtn:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20
    }
});
