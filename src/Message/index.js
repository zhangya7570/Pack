import React from 'react';
import { StyleSheet, Text, View,Image,Switch,FlatList,Button,Picker,SectionList,Slider,Dimensions} from 'react-native';
import {toJS} from 'mobx';
import {inject, observer} from "mobx-react";
const {width, height} = Dimensions.get('window');


// @inject('message')
// @observer
export default class MessageScreen extends React.Component {

    constructor(props){
        super(props);
        this.state={
            items: [],
            language:''
        }
    }

    componentDidMount(){
        this.setState({
            items:["name","zhang","title","author"]
        })
    }

    _keyExtractor = (item) => item.id.toString();

    _renderItem = ({item}) => (
        <View
            style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center'}}
        >
            <Text style={{width:10,textAlign:'center'}}>{item.id}</Text>
            <Text style={{width:60,textAlign:'center'}}>{item.title}</Text>
            <Text style={{width:100,textAlign:'center'}}>{item.name}</Text>
            <Switch
                value={item.like}
                style={{width:50}}
                onValueChange={(val)=> {
                    this.props.message.changeLike(item.id)
                }}
            />
        </View>
    );
    _change=()=>{
        const { items } = this.state;
        items.pop();
        this.setState({ items:[...items]});
    }
    _jump=()=>{
        this.props.navigation.navigate('Products')
    }
    render() {
        const { items } = this.state;
        let str = items.join('-');

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Message Page!</Text>
                {/*<FlatList*/}
                    {/*data={toJS(this.props.message.list)}*/}
                    {/*extraData={this.props.message}*/}
                    {/*keyExtractor={this._keyExtractor}*/}
                    {/*renderItem={this._renderItem}*/}
                {/*/>*/}
                {/*<Image source={require('../Img/hello.png')} />*/}
                {/*<View>*/}
                    {/*<Button*/}
                        {/*onPress={this._change}*/}
                        {/*title="change"*/}
                        {/*color="#841584"*/}
                    {/*/>*/}

                {/*</View>*/}
                {/*<View>*/}
                    {/*<Text>{str}</Text>*/}
                {/*</View>*/}
                <View>
                    <Button
                        onPress={this._jump}
                        title="跳转"
                        color="#841584"
                    />
                </View>
                {/*<Picker*/}
                    {/*selectedValue={this.state.language}*/}
                    {/*style={{height: 50, width: 100}}*/}
                    {/*onValueChange={(itemValue, itemIndex) =>*/}
                        {/*this.setState({language: itemValue})*/}
                    {/*}>*/}
                    {/*<Picker.Item label="Java" value="java" />*/}
                    {/*<Picker.Item label="JavaScript" value="js" />*/}
                {/*</Picker>*/}
                {/*<SectionList*/}
                    {/*renderItem={({ item, index, section }) => <Text key={index}>{item}</Text>}*/}
                    {/*renderSectionHeader={({ section: { title } }) => (*/}
                        {/*<Text style={{ fontWeight: "bold" }}>{title}</Text>*/}
                    {/*)}*/}
                    {/*sections={[*/}
                        {/*{ title: "Title1", data: ["item1", "item2"] },*/}
                        {/*{ title: "Title2", data: ["item3", "item4"] },*/}
                        {/*{ title: "Title3", data: ["item5", "item6"] }*/}
                    {/*]}*/}
                    {/*keyExtractor={(item, index) => item + index}*/}
                {/*/>*/}
                <Slider
                    style={{width:width,paddingLeft:40,paddingRight:40}}
                    maximumValue={100}
                    minimumValue={0}
                    value={50}
                />
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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
