import React from "react";
import { View, Text  } from 'react-native';
import Styles from '../Styles.js';
import * as Const from '../Constants.js';

export default class EmptyDataComponent extends React.Component {
    render()  {
        return (
            <View>
                <Text style={Styles.emptyMessage}>{Const.Empty}</Text>
            </View>
        )
    }
}