import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native';

const ResultScreen = ({ navigation }) => {
  const [results, setResults] = useState([]);

  const searchApi = async (searchText) => {
    await fetch("https://unogsng.p.rapidapi.com/search?query=" + searchText, {
    	"method": "GET",
    	"headers": {
    		"x-rapidapi-host": "unogsng.p.rapidapi.com",
    		"x-rapidapi-key": "22d95c216dmshd9c7b0d95bb37d4p1dcd6ejsnb496ab819159"
    	}
    })
    .then(response => response.json().then(res => res)).then(final => {
      setResults(final.results);
    })
    .catch(err => {
    	console.log(err);
    });
  };

  useEffect(() => {
    const term = navigation.getParam('term');
    searchApi(term);
  }, []);

  if(results)
  {
    return(
      <ImageBackground source={require('../images/wallpaper.jpg')} style={styles.backgroundImage}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{marginBottom: 40}}>
            <Text style={styles.title}>Results:</Text>
            <FlatList
              data={results}
              keyExtractor={item => item.nfid.toString()}
              renderItem={({ item }) => {
                return(
                  <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.nfid })}>
                    <View style={styles.container}>
                      <Image source={{ uri: item.img}} style={styles.image}/>
                      <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginBottom: 30 }}>{item.title.replace(/&#39;/g, "'")}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
  else{
    return(
      <ImageBackground source={require('../images/wallpaper.jpg')} style={styles.backgroundImage}>
        <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 15 }}>Something went wrong! :(</Text>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

ResultScreen.navigationOptions = () => ({
  headerStyle: {
    backgroundColor: 'black',
    shadowColor: 'transparent'
  }
});

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 20,
    marginVertical: 20,
    color: 'grey'
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: 'grey',
    marginBottom: 10
  },
  name:{
    fontWeight: 'bold',
    marginBottom: 8
  },
  container: {
    alignItems: 'center'
  }
});

export default ResultScreen;
