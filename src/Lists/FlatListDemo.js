import React, {Component, PureComponent} from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";

class FlatListDemo extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
        this.handle()
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

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    flexDirection:'row',
                    height:30,
                    justifyContent:'center',
                    alignItems:'center',
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator />
                <Text style={{color:'#999999',fontSize:14,marginLeft:10}}>正在加载更多数据...</Text>
            </View>
        );
    };

    render() {
        return (
            <View containerStyle={{borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            title={`${item.name.first} ${item.name.last}`}
                            subtitle={item.email}
                            avatar={{ uri: item.picture.thumbnail }}
                            containerStyle={{ borderBottomWidth: 0 }}
                        />
                    )}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={50}
                />
            </View>
        );
    }
}

export default FlatListDemo;