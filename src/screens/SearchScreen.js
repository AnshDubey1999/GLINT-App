import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, SafeAreaView, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';

const SearchScreen = ({ navigation }) => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [newReleases, setNewReleases] = useState([]);
  const [expiringSoon, setExpiringSoon] = useState([]);
  const [seasonChanges, setSeasonChanges] = useState([]);

  const fetchNewReleases = async () => {
    await fetch("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew7%3AUS&p=1&t=ns&st=adv", {
    	"method": "GET",
    	"headers": {
    		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
    		"x-rapidapi-key": "22d95c216dmshd9c7b0d95bb37d4p1dcd6ejsnb496ab819159"
    	}
    }).then(response => response.json().then(res => res)).then(final => {
      setNewReleases(final.ITEMS);
    })
    .catch(err => {
    	setErrorMessage('Something went wrong!')
    });
  };

  const fetchExpiringSoon = async () => {
    await fetch("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Aexp%3AUS&t=ns&st=adv&p=1", {
    	"method": "GET",
    	"headers": {
    		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
    		"x-rapidapi-key": "22d95c216dmshd9c7b0d95bb37d4p1dcd6ejsnb496ab819159"
    	}
    }).then(response => response.json().then(res => res)).then(final => {
      setExpiringSoon(final.ITEMS);
    })
    .catch(err => {
    	setErrorMessage('Something went wrong!')
    });
  };

  const fetchSeasonChanges = async () => {
    await fetch("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Aseasons5%3AUS&p=1&t=ns&st=adv", {
    	"method": "GET",
    	"headers": {
    		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
    		"x-rapidapi-key": "22d95c216dmshd9c7b0d95bb37d4p1dcd6ejsnb496ab819159"
	     }
      }).then(response => response.json().then(res => res)).then(final => {
        setSeasonChanges(final.ITEMS);
      })
      .catch(err => {
      	setErrorMessage('Something went wrong!')
      });
  };

  useEffect(() => {
    fetchNewReleases();
    fetchExpiringSoon();
    fetchSeasonChanges();
  }, []);

  return(
      <ImageBackground source={require('../images/wallpaper.jpg')} style={styles.backgroundImage}>
       <SafeAreaView style={{flex: 1}}>
       <ScrollView>
       <Image source={require('../images/Logo.png')} style={styles.logo}/>
        <SearchBar
          term={term}
          onTermChange={newTerm => setTerm(newTerm)}
          onTermSubmit={() => {
            navigation.navigate('Result', {term});
            }
          }/>
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <ResultsList title="New Releases" results={newReleases} navigation={navigation}/>
            <ResultsList title="Expiring Soon" results={expiringSoon} navigation={navigation}/>
            <ResultsList title="Season Changes" results={seasonChanges} navigation={navigation}/>
            </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );

}

SearchScreen.navigationOptions = () => ({
  headerStyle: {
    backgroundColor: 'black',
    shadowColor: 'transparent'
  }
});

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  logo: {
    width: 350,
    height: 100,
    marginVertical: 20,
    alignSelf: 'center'
  }
});

export default SearchScreen;
