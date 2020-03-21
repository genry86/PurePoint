import {StyleSheet} from "react-native";

export default StyleSheet.create(
    {
      title: {
        fontWeight: 'bold'
      },
      activity: {
        padding: 20,
        height: 50,
      },
      search: {
        height: 50,
        backgroundColor: '#ffffdd',
        paddingLeft: 15,
        paddingRight: 15,
        alignSelf: 'stretch'
      },
      list: {
        flex: 1,
        alignContent: 'center',
      },
      emptyMessage: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      cell: {
        padding: 10
      }
    });