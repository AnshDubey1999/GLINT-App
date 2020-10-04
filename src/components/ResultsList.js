import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const ResultsList = ({ title, results, navigation }) => {
  return (
    <View style={{marginBottom: 40}}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={item => item.netflixid.toString()}
        renderItem={({ item }) => {
          return(
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.netflixid })}>
              <View style={styles.container}>
                <Image source={{ uri: item.image}} style={styles.image}/>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 20,
    color: 'grey'
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: 'grey'
  },
  name:{
    fontWeight: 'bold',
    marginBottom: 8
  },
  container: {
    marginLeft: 15
  }
});

export default ResultsList;
