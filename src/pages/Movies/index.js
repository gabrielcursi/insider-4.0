import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native'
import { View, Text } from 'react-native';
import FavoriteMovies from '../../components/FavoritesItem';
import Header from '../../components/Header';

import { deleteMovie, getMoviesSave } from '../../utils/storage';

import { Container, ListMovies } from './styles';

function Movies() {
  const [movies, setMovies] = useState([]);

  const navigation = useNavigation()
  const isFocused = useIsFocused()

  useEffect(() => {
    let isActive = true;

    async function getFavoriteMovies() {
      const result = await getMoviesSave('@saved');

      if (isActive) {
        setMovies(result);
      }
    }

    if (isActive) {
      getFavoriteMovies();
    }

    return () => {
      isActive = false;
    };
  }, [isFocused]);

  async function handleDelete(id) {
    const result = await deleteMovie(id)
    setMovies(result)
  }

  function navigateDetailPage(item) {
    navigation.navigate('Detail', {id: item.id})
  }

  return (
    <Container>
      <Header title="Meus filmes" />
      <ListMovies
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => 
        <FavoriteMovies
        data={item}
        deleteMovie={handleDelete}
        navigateDetailPage={navigateDetailPage}
        />}
      />
    </Container>
  );
}

export default Movies;
