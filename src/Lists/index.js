import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    FlatList,
    TextInput,
    Switch,
    Button,
    ActivityIndicator,
    DatePickerIOS,
    KeyboardAvoidingView,
    WebView
} from 'react-native';
import { toJS } from 'mobx';
import { inject, observer } from "mobx-react";
import CustomFlatList from './CustomFlatList';
import NewFlatList, { RefreshState } from './NewFlatList';
import FlatListDemo from './FlatListDemo'

@inject('message')
@observer
export default class ListsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isRefreshing: false,
            dataSource: null,
            loadMoreState: RefreshState.Idle,
            text:'一行可修改的文字',
            chosenDate:new Date(),
            refreshing:false,
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            name:'z',
            dateText:''
        }
        this.flatListObj=null
    }

    componentDidMount() {
        this.setState({
            items: ["name", "zhang", "title", "author"],
            dataSource: [],

        })
        this.makeRemoteRequest()
    }
    setDate=(newDate)=>{
        this.setState({chosenDate:newDate})
    }

    makeRemoteRequest = () => {

        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.results : [...this.state.data, ...res.results],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };
    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                seed: this.state.seed + 1,
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };
    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };
    _renderItem = ({item}) =>(
        <View style={{flex:1,height: 50,justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:10}}>
            <Text style={{ textAlign: 'center' }}>{`${item.name.first} ${item.name.last}`}</Text>
            <Text style={{ textAlign: 'center' }}>{item.email}</Text>
            <Text style={{ textAlign: 'center' }}>{this.state.name}</Text>
        </View>
    )

    // _keyExtractor = (item) => item.id.toString();
    //
    // _renderItem = ({ item }) => (
    //     <View
    //         style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
    //     >
    //         <Text style={{ width: 10, textAlign: 'center' }}>{item.id}</Text>
    //         <Text style={{ width: 60, textAlign: 'center' }}>{item.title}</Text>
    //         <Text style={{ width: 100, textAlign: 'center' }}>{item.name}</Text>
    //         <Switch
    //             value={item.like}
    //             style={{ width: 50 }}
    //             onValueChange={(val) => {
    //                 this.props.message.changeLike(item.id)
    //             }}
    //         />
    //     </View>
    // );
    // _change = () => {
    //     const { items } = this.state;
    //     items.pop();
    //     this.setState({ items: [...items] });
    // }
    // setLoadMoreState(state) {
    //     this.setState({ loadMoreState: state })
    // }
    // _onRefresh = () => {
    //     this.setLoadMoreState(RefreshState.HeaderRefreshing);
    //     console.log('触发fresh')
    //     setTimeout(() => {
    //         let { dataSource } = this.state;
    //         let newData = dataSource.concat({
    //             name: 'banana',
    //             id: 3,
    //             title: '香蕉',
    //             like: false
    //         })
    //         this.setState({
    //             dataSource: newData,
    //             loadMoreState: RefreshState.Idle
    //         })
    //     }, 300)
    // }
    // _onEndReached = () => {
    //     this.setLoadMoreState(RefreshState.FooterRefreshing);
    //     console.log('触发reachEN')
    //     setTimeout(() => {
    //         let { dataSource } = this.state;
    //         if (dataSource.length > 20) {
    //             this.setState({
    //                 loadMoreState: RefreshState.NoMoreData
    //             })
    //             return
    //         }
    //         let newData = dataSource.concat({
    //             name: 'banana',
    //             id: 0,
    //             title: '香蕉',
    //             like: false
    //         }, {
    //                 name: 'banana',
    //                 id: 1,
    //                 title: '香蕉',
    //                 like: false
    //             })
    //         this.setState({
    //             dataSource: newData,
    //             loadMoreState: RefreshState.Idle
    //         })
    //     }, 50)
    //
    // }
    onBtnClick=()=>{
        this.props.navigation.navigate('FlatList');
    }
    toWebView=()=>{
        this.props.navigation.navigate('WebView')
    }
    _changeTxt=()=>{
        this.setState({text:'修改后的文字'})
    }
    changeName=()=>{

        this.setState((state)=>{
            return{name:state.name+'-1'}
        })

    }
    flatList=(element)=>{
        this.flatListObj=element
    }


    render() {

        let { dataSource, loadMoreState,text,chosenDate,data,refreshing } = this.state;
        return (
            <View style={styles.container}>
                {/*<Button*/}
                    {/*title='列表'*/}
                    {/*onPress={this.onBtnClick}*/}
                {/*/>*/}
                {/*<Button title='webView'*/}
                        {/*onPress={this.toWebView}/>*/}
                <Button title='changeName'
                        onPress={this.changeName}/>
                <Text style={styles.welcome}>列表页面</Text>
                {/*<NewFlatList*/}
                    {/*data={dataSource}*/}
                    {/*keyExtractor={(item, index) => index.toString()}*/}
                    {/*renderItem={this._renderItem}*/}
                    {/*refreshState={loadMoreState}*/}
                    {/*onHeaderRefresh={this._onRefresh}*/}
                    {/*onFooterRefresh={this._onEndReached}*/}
                {/*/>*/}

                {/*<ActivityIndicator size="small" color="black" animating={false} hidesWhenStopped={false} />*/}
                {/*<Button title='按钮' disabled={true} color='red' onPress={this._changeTxt}/>*/}
                {/*<Text>{text}</Text>*/}

                {/*<Text style={styles.text}>{'您选择的时间是：'+ this.state.dateText}</Text>*/}

                {/*<DatePickerIOS date={chosenDate}*/}
                               {/*onDateChange={(date)=>{*/}
                                   {/*this.setDate(date);*/}
                                   {/*var year = date.getFullYear();*/}
                                   {/*var month = date.getMonth() + 1;*/}
                                   {/*var date1 = date.getDate();*/}
                                   {/*var hour = date.getHours();       //获取当前小时数(0-23)*/}
                                   {/*var mins = date.getMinutes();     //获取当前分钟数(0-59)*/}
                                   {/*var secs = date.getSeconds();     //获取当前秒数(0-59)*/}
                                   {/*var msecs = date.getMilliseconds();    //获取当前毫秒数(0-999)*/}
                                   {/*var s = year+"/"+month+"/"+date1+' '+hour+':'+mins+':'+secs+':'+msecs;*/}
                                   {/*this.setState({dateText:s});*/}
                               {/*}}*/}
                               {/*mode={'datetime'}*/}

                {/*/>*/}

                {/*<KeyboardAvoidingView style={styles.container} behavior="height" enabled>*/}
                    {/*<TextInput placeholder='输入文字' />*/}
                    {/*<View><Text>第一行文字</Text></View>*/}
                    {/*<View><Text>第一行文字</Text></View>*/}
                {/*</KeyboardAvoidingView>*/}
                {/*<FlatList*/}
                    {/*renderItem={this._renderItem}*/}
                    {/*data={data}*/}
                    {/*initialNumToRender={10}*/}
                    {/*keyExtractor={item=>item.email}*/}
                    {/*numColumns={1}*/}
                    {/*ItemSeparatorComponent={()=>(<View style={{height:1,borderBottomColor:'black',borderBottomWidth:1}} />)}*/}
                    {/*getItemLayout={(data, index)=>({length: 50, offset: 50 * index, index})}*/}
                    {/*onEndReached={this.handleLoadMore}*/}
                    {/*onEndReachedThreshold={0.5}*/}
                    {/*onRefresh={this.handleRefresh}*/}
                    {/*refreshing={refreshing}*/}
                    {/*ref={this.flatList}*/}
                    {/*// getItem={}*/}
                    {/*// getItemCount={}*/}
                    {/*// disableVirtualization={}*/}
                    {/*// maxToRenderPerBatch={}*/}
                    {/*// updateCellsBatchingPeriod={}*/}
                    {/*// windowSize={}*/}
                {/*/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
    flatList: {
        height: 200
    },
    text: {
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        height:30,
        borderWidth:1,
        padding:6,
        borderColor:'green',
        textAlign:'center'
    }
});
