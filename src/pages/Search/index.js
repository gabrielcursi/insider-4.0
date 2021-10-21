import React, { useState, useEffect } from 'react';

// parei no minto 39:42

import { Container, ListMovies, Name } from './styles';

import api, {key} from '../../services/api'

import { useNavigation, useRoute } from '@react-navigation/native';
import SearchItem from '../../components/SearchItem';

const Search = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true

    async function getSearchMovie() {
      const response = await api.get('/search/movie', {
        params: {
          query: route?.params?.name,
          api_key: key,
          language: 'pt-BR',
          page: 1
        }
      })
      if(isActive){
        setMovie(response.data.results)
        setLoading(false)
      }
    }
    if(isActive){
      getSearchMovie()
    }

    return () => {
      isActive = false
    }

  }, []);

  function navigationDetailsPage(item) {
    navigation.navigate('Detail', { id: item.item.id });
  }

  if (loading) {
    return <Container></Container>;
  }

  return (
    <Container>
      <ListMovies
        data={movie}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={(item) => <SearchItem data={item.item} navigatePage={() => navigationDetailsPage(item)} />}
      />
    </Container>
  );
};

export default Search;
