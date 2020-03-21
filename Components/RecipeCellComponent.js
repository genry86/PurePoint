import React from "react";
import { View, Text  } from 'react-native';
import Styles from '../Styles.js';

export default class RecipeCellComponent extends React.Component {
    render()  {
        return (
            <View style={Styles.cell}>
                <Text style={Styles.title}>{this.props.item.title}</Text>
                <Text>{this.props.item.ingredients}</Text>
            </View>
        )
    }
}