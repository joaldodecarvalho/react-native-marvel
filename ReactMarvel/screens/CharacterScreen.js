import React from 'react';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native';

import CharacterService from '../services/CharacterService'

export default class CharacterScreen extends React.Component {

  constructor() {
    super()

    this.state = {
      characters: []
    }
  }

  componentDidMount() {

    CharacterService.findAllCharacters().then(response => { 
      this.setState({ characters: response.data.data.results })
    })
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

    const { characters } = this.state

    return (

        
      <FlatList
        data={characters}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}>
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
