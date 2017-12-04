/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Alert
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';



export default class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doc1: "",
            doc2: "",
            doc3: "",
            doc4: "",
            query: ""
        }
    }

    validationAndShowResult() {
        let { doc1, doc2, doc3, doc4, query } = this.state;
        if (doc1 == "" || doc2 == "" || doc3 == "" || doc4 == "" || query == "") {
            ToastAndroid.show('Please enter empty fields', ToastAndroid.LONG);
        } else {
            this.InvertedIndexAlgo()
        }
    }

    docNumberIfExist(key, docs) {

        let numbers = '';

        for (let i = 0; i < 4; i++) {
            if (docs[i].includes(key)) {
                numbers += (i + 1) + ', ';
            }
        }

        return numbers;

    }

    InvertedIndexAlgo() {

        let { doc1, doc2, doc3, doc4, query } = this.state;
        let docs = [];
        doc1 = doc1.replace(/[!"#$%&'()*+,-./:;<=>?@[^_`{|}~]/g, '');
        doc2 = doc2.replace(/[!"#$%&'()*+,-./:;<=>?@[^_`{|}~]/g, '');
        doc3 = doc3.replace(/[!"#$%&'()*+,-./:;<=>?@[^_`{|}~]/g, '');
        doc4 = doc4.replace(/[!"#$%&'()*+,-./:;<=>?@[^_`{|}~]/g, '');
        let doc1Tokens = doc1.split(" ");
        let doc2Tokens = doc2.split(" ");
        let doc3Tokens = doc3.split(" ");
        let doc4Tokens = doc4.split(" ");
        let docsTokensResult = "";
        let result = "";
        let queryResult = "";
        let Tokens = [];

        query = query.replace(/[!"#$%&'()*+,-./:;<=>?@[^_`{|}~]/g, '');
        let queryTokens = query.split(" ");

        docs.push(doc1Tokens, doc2Tokens, doc3Tokens, doc4Tokens);
        console.log('docs', docs)

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < docs[i].length; j++) {
                docsTokensResult += 'doc' + (i + 1) + ' token ' + j + ' => ' + docs[i][j] + '\n';
                Tokens.push(docs[i][j])
            }
        }

        let uniqueTokens = Tokens.filter((item, index, arr) => {
            return arr.indexOf(item) == index;
        });

        for (let i = 0; i < uniqueTokens.length; i++) {
            result += uniqueTokens[i] + ': repeated ' + Tokens.filter(item => item == uniqueTokens[i]).length
                + ' times => doc' + this.docNumberIfExist(uniqueTokens[i], docs) + '\n';
        }

        for (let k = 0; k < queryTokens.length; k++) {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < docs[i].length; j++) {
                    if (queryTokens[k] == docs[i][j]) {
                        queryResult += queryTokens[k] + ': match doc' + (i + 1) + '\n';
                    }
                }
            }
        }




        Alert.alert(
            'Tokens',
            docsTokensResult,
            [
                {
                    text: 'OK', onPress: () => {
                        Alert.alert(
                            'Result',
                            result,
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        Alert.alert(
                                            'Query Result',
                                            queryResult,
                                            [
                                                {
                                                    text: 'OK', onPress: () => {
                                                        console.log('OK Pressed');
                                                    }
                                                }
                                            ],
                                            { cancelable: false }
                                        )
                                    }
                                }
                            ],
                            { cancelable: false }
                        )
                    }
                }
            ],
            { cancelable: false }
        )

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#13c3ef', alignItems: 'center' }}>

                <Text style={{
                    textAlign: 'center', marginTop: 20, fontSize: 30,
                    fontWeight: 'bold'
                }}> Inverted Index {'\n'} Algorithm</Text>

                <TextInput
                    style={{ width: 250, height: 40, margin: 25 }}
                    placeholder="Document 1"
                    onChangeText={(doc1) => this.setState({ doc1: doc1.toLowerCase() })}
                />
                <TextInput
                    style={{ width: 250, height: 40, margin: 25 }}
                    placeholder="Document 2"
                    onChangeText={(doc2) => this.setState({ doc2: doc2.toLowerCase() })}
                />
                <TextInput
                    style={{ width: 250, height: 40, margin: 25 }}
                    placeholder="Document 3"
                    onChangeText={(doc3) => this.setState({ doc3: doc3.toLowerCase() })}
                />
                <TextInput
                    style={{ width: 250, height: 40, margin: 25 }}
                    placeholder="Document 4"
                    onChangeText={(doc4) => this.setState({ doc4: doc4.toLowerCase() })}
                />
                <TextInput
                    style={{ width: 250, height: 40, margin: 25 }}
                    placeholder="Query"
                    onChangeText={(query) => this.setState({ query: query.toLowerCase() })}
                />

                <TouchableOpacity style={{ width: 150, height: 40, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.validationAndShowResult()}>
                    <Text style={{ color: 'grey', fontSize: 15, textAlign: 'center' }}>Run</Text>
                </TouchableOpacity>

                < KeyboardSpacer />

            </View>
        );
    }
}
