import React from 'react';
import { Image, StyleSheet, Text, View, FlatList, ActivityIndicator, ToastAndroid } from 'react-native';

import CharacterService from '../services/CharacterService'

export default class CharacterScreen extends React.Component {

  constructor() {
    super()

    this.state = {
      characters: [],
      currentPage: 1,
      loading: false
    }
  }

  componentDidMount() {

    this.setState({ loading: true }, this.loadCharacters);
  }

  loadCharacters = (pageNumber = 1) => {

    CharacterService.findAllCharacters(pageNumber).then(response => {
      
      this.setState(state => ({
        characters: response.data.data.results,
        currentPage: pageNumber,
        loading: false
      }))
    })
      .catch(error => ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG))
      .finally(() => this.setState({ loading: false }))
  }

  getNextPage = () => {
    const { currentPage, loading } = this.state;

    if (!loading) {
      this.loadCharacters(currentPage + 1);
    }
  }

  keyExtractor = item => item.id.toString();

  renderItem = ({ item }) => {
    return (
      <View>
        <View>
          <Image source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} style={styles.image}></Image>
        </View>
        <View>
          <Text>{item.name}</Text>
        </View>
      </View>
    )
  }

  render() {

    const { characters, loading } = this.state

    return (
      loading ? <ActivityIndicator size="large" color="#0000ff" /> :
        <FlatList
          data={characters}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onEndReached={this.getNextPage}
          onEndReachedThreshold={0.6}>
        </FlatList>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 50,
    marginRight: 10
  }
});
