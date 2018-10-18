import React from 'react';
import { Image, StyleSheet, Text, View, FlatList, ActivityIndicator, ToastAndroid } from 'react-native';

import CharacterService from '../services/CharacterService'

export default class CharacterScreen extends React.Component {

  constructor() {
    super()

    this.state = {
      characters: [],
      currentPage: 0,
      loading: false
    }
  }

  componentDidMount() {

    this.setState({ loading: true }, this.loadCharacters);
  }

  loadCharacters = (pageNumber = 0) => {

    CharacterService.findAllCharacters(pageNumber).then(response => {

      const data = response.data.data.results.filter(r => !r.thumbnail.path.includes('image_not_available'));

      this.setState({
        characters: data,
        currentPage: pageNumber,
        loading: false
      })
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
      <View style={styles.item} onPressItem={this.onPressItem}>
        <View>
          <Image source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} style={styles.image}></Image>
        </View>
      </View>
    )
  }

  render() {

    const { characters, loading } = this.state

    return (
      loading ? <ActivityIndicator size="large" color="#0000ff" /> :
        <FlatList
          style={styles.container}
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
    backgroundColor: '#fff'
  },
  item: {
    flexDirection: 'row'
  },
  image: {
    width: 400,
    height: 150
  }
});
