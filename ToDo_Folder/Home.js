import React, { Component } from 'react';
import { View, TextInput, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';
import { Header, ListItem, Text, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { inject, observer } from 'mobx-react';

@inject('todoStore')
@observer
export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }

    componentWillMount() {
        const { todoStore } = this.props
        todoStore.getData();
    }

    onChangeText = (text) => {
        if (text && !!text) {
	        this.setState({ text })
        }
    }

    SubmitData = () => {
        try {
            const { text } = this.state
            if (text && !!text) {
                this.setState({ text: '' })
                const { todoStore } = this.props
                todoStore.addTodo(text)
            } else {
                alert('Please enter todo title!')
            }
        } catch (error) {
            alert('Something went wrong')
        }
    }

    swipeRender = (index) => {
        return (
            <SwipeButtonsContainer style={styles.swipcercell}>
                <TouchableOpacity onPress={() => this.markTodo(index)} >
                    <Text>Mark</Text>
                </TouchableOpacity>
            </SwipeButtonsContainer>
        );
    }

    swipeDelete = (index) => {
        return (
            <SwipeButtonsContainer style={styles.swipcercell}>
                <TouchableOpacity onPress={() => this.deleteTodo(index)} >
                    <Text>Delete</Text>
                </TouchableOpacity>
            </SwipeButtonsContainer>
        );
    }

    markTodo = (index) => {
        const { todoStore } = this.props
        todoStore.checkTodo(todoStore.todos[index])
    }

    deleteTodo = (index) => {
        const { todoStore } = this.props
        todoStore.deleteTodo(index)
    }

    render() {
        const { todos, todosCompletedCount } = this.props.todoStore
        const { text } = this.state

        return (
            <>
                <SafeAreaView style={styles.SafeAreaViewcontainer}>

                    <Header
                        centerComponent={{ text: 'MY TODOS', style: { color: '#fff' } }}
                    />

                    <View style={{ margin: 10 }}>
                        <TextInput
                            value={text}
                            placeholder={'Add Todo'}
                            onChangeText={this.onChangeText}
                        />

                        <View style={styles.buttonrow}>
                                    <Text style={styles.todomaintitle}>todosCompletedCount()</Text>
                        </View>

                        <View style={styles.buttonrow}>
                            <Button
                                title="Submit"
                                containerStyle={styles.buttonsubmit}
                                onPress={this.SubmitData}
                            />
                        </View>

                        {todos.length > 0 &&
                            <>
                                <View>
                                    <Text style={styles.todomaintitle}>My Todos</Text>
                                </View>
                                {todos.map((data, index) => {
                                    return (
                                        <SwipeItem
                                            key={index}
                                            style={styles.button}
                                            swipeContainerStyle={styles.swipeContentContainerStyle}
                                            leftButtons={() => this.swipeRender(index)}
                                            rightButtons={() => this.swipeDelete(index)}
                                        >
                                            <ListItem
                                                titleStyle={{ color: data.completed ? 'green' : 'red' }}
                                                style={styles.listiem}
                                                title={data.title}
                                            />
                                        </SwipeItem>

                                    )
                                })}
                            </>
                        }
                    </View>
                </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    SafeAreaViewcontainer: { flex: 1, width: '100%' },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 55,
        marginTop: 10,
        backgroundColor: 'white',
    },
    swipcercell: {
        alignSelf: 'center',
        aspectRatio: 1,
        flexDirection: 'column',
        padding: 10,
    },
    swipeContentContainerStyle: {
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,

    },
    listiem: {
        backgroundColor: 'white',
        borderColor: 'transparent', borderRadius: 10, width: '98%', paddingLeft: 10
    },
    buttonsubmit: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonrow: {
        flexDirection: 'row'
    },
    todomaintitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 10 }
});