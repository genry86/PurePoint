import React from 'react';
import { FlatList, ActivityIndicator, Text, SafeAreaView, TextInput  } from 'react-native';
import { debounce } from "throttle-debounce";

import * as Const from './Constants.js';
import Styles from './Styles.js';
import loadRecipes from './ApiUtility.js';
import RecipeCellComponent from './Components/RecipeCellComponent.js';
import EmptyDataComponent from './Components/EmptyDataComponent.js';

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      isLoading: true, 
      isRefreshing: false,
      dataSource: [], 
      query: "",
      page: 1
    }
    this.searchActionDebounced = debounce(Const.DebounceTime, this.searchAction)
  }

  loadData = () => {
    loadRecipes(this.state.page, this.state.query)
      .then((results) => {
        this.setState({
          isLoading: false,
          isRefreshing: false,
          dataSource: this.state.dataSource.concat(results),
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false, isRefreshing: false })
      });
  }

  searchAction = () => {
    this.setState({ page: 1, dataSource: [], isLoading: true }, this.loadData)
  }

  onChangeText = (queryText) => {
    this.setState({ query: queryText }, this.searchActionDebounced)
  }

  onEndReached = () => {
    if (this.state.page < 2) {  // as required: only first 20 items
      this.setState({ page: this.state.page + 1, isLoading: true }, this.loadData)
    }
  }

  onRefresh = () => {
    this.setState({ page: 1, isRefreshing: true }, this.loadData)
  }

  componentDidMount() {
    this.loadData() 
  }

  render(){
    return(
      <SafeAreaView style={Styles.container}>
        <TextInput
          style={Styles.search}
          placeholder={Const.SearchPlaceholder}
          onChangeText= {this.onChangeText}
          value={this.state.search}
        />
        <FlatList style={Styles.list}
          data={this.state.dataSource}
          renderItem={({item}) => <RecipeCellComponent item={item} />}
          ListEmptyComponent={<EmptyDataComponent />}
          refreshing={this.state.isRefreshing}
          keyExtractor={(item, index) => `index-${index}-${item.href}`}
          onEndReached={this.onEndReached}
          onRefresh={this.onRefresh}
          onEndReachedThreshold={0.5}
        />
        { this.state.isLoading ?? <ActivityIndicator size="large" style={Styles.activity}/> }
      </SafeAreaView>
    );
  }
}