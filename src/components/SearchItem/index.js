import React from 'react';

import { View, Text } from 'react-native';
import { Container, Banner, Title, RateContainer, Rate } from './styles';

import {Ionicons} from '@expo/vector-icons'

const SearchItem = ({ data, navigatePage }) => {

  function detailMovie() {
    if(data.release_date === ''){
      alert('Filme ainda sem data')
      return
    }
    navigatePage(data)
  }

  return (
    <Container activeOpactiy={0.7} onPress={detailMovie}>
      {data?.poster_path ? (
        <Banner
          resizeMethod="resize"
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${data?.poster_path}`,
          }}
        />
      ) : (
        <Banner
          resizeMethod="resize"
          source={require('../../assets/semfoto.png')}
        />
      )}

      <Title>{data?.title}</Title>

      <RateContainer>
        <Ionicons name="md-star" size={12} color="#E7A74E" />
        <Rate>{data?.vote_average}/10</Rate>
      </RateContainer>
    </Container>
  );
};

export default SearchItem;
