import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const DetailScreen = ({ navigation }) => {
  const id = navigation.getParam('id');

  const [movieDetails, setMovieDetails] = useState({});

  // Fetch the details of the movie that was viewed
  const fetchMovieDetails = async (movieId) => {
    await fetch("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=loadvideo&q="+movieId, {
    	"method": "GET",
    	"headers": {
    		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
    		"x-rapidapi-key": "22d95c216dmshd9c7b0d95bb37d4p1dcd6ejsnb496ab819159"
    	}
    }).then(response => response.json().then(res => res)).then(final => {
      setMovieDetails(final.RESULT);
    })
    .catch(err => {
    	console.log(err);
    });
  };

  useEffect(() => {
    fetchMovieDetails(id);
  }, []);

  if(movieDetails && movieDetails.nfinfo) {
    return(
      <ImageBackground style={{flex:1}} source={require('../images/wallpaper.jpg')}>
        <SafeAreaView style={{flex:1}}>
          <ScrollView>
          <Text style={styles.header}>{movieDetails.nfinfo.title.replace(/&#39;/g, "'")}</Text>
            <View style={styles.imageContainer}>
              <Image source={{ uri: movieDetails.nfinfo.image2 }} style={styles.image}/>
            </View>
            <View style={styles.row1}>
              <Text style={{ color: 'grey', fontSize: 16, fontWeight: 'bold' }}>Type: <Text style={styles.text}>{movieDetails.nfinfo.type.charAt(0).toUpperCase() + movieDetails.nfinfo.type.slice(1)}</Text></Text>
              <Text style={{ color: 'grey', fontSize: 16, fontWeight: 'bold' }}>Runtime: {movieDetails.imdbinfo == 'notfound' ? <Text style={styles.text}>N/A</Text>: <Text style={styles.text}>{movieDetails.imdbinfo.runtime}</Text> }</Text>
            </View>
            <View style={styles.row1}>
              <Text style={{ color: 'grey', fontSize: 16, fontWeight: 'bold' }}>Release: <Text style={styles.text}>{movieDetails.nfinfo.released}</Text></Text>
              <Text style={{ color: 'grey', fontSize: 16, fontWeight: 'bold' }}>Rating: {movieDetails.imdbinfo == 'notfound' ? <Text style={styles.text}>N/A</Text>: <Text style={styles.text}>{movieDetails.imdbinfo.rating}</Text> }</Text>
            </View>
            <View style={{ marginHorizontal: 10, alignItems: 'center' }}>
              <Text style={styles.desc}>{movieDetails.nfinfo.synopsis.replace(/&#39;/g, "'")}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
  else{
    return(
      <ActivityIndicator />
    )
  }
};

DetailScreen.navigationOptions = () => ({
  headerStyle: {
    backgroundColor: 'black',
    shadowColor: 'transparent'
  }
});

const styles = StyleSheet.create({
  image: {
    width: 280,
    height: 400,
    borderWidth: 5,
    borderColor: 'grey',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 30
  },
  header: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  topic: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white'
  },
  desc: {
    color: 'white',
    fontSize: 18
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginRight: 20
  },
  row1: {
    marginHorizontal: 60,
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between'
  }
});

export default DetailScreen;
