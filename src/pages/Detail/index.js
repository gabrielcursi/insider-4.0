import React, { useState, useEffect } from 'react';

import {
  Container,
  Header,
  HeaderButton,
  ContainerButton,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description,
} from './styles';

import { ScrollView, Modal } from 'react-native';

import Stars from 'react-native-stars';

import { Feather, Ionicons } from '@expo/vector-icons';
import api, { key } from '../../services/api';

const image = { uri: 'https://reactjs.org/logo-og.png' };

import { useNavigation, useRoute } from '@react-navigation/native';
import Genres from '../../components/Genres';
import ModalLink from '../../components/ModalLink';

function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function getMovie() {
      const response = await api
        .get(`/movie/${route.params?.id}`, {
          params: {
            api_key: key,
            language: 'pt-BR',
          },
        })
        .catch((err) => {
          console.log(err);
        });

      if (isActive) {
        setMovie(response.data);
      }
    }

    if (isActive) {
      getMovie();
    }

    return () => {
      isActive = false;
    };
  }, []);

  console.log(movie);
  // 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  return (
    <Container>
      <Header
        resizeMode="stretch"
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        }}
      >
        <ContainerButton>
          <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={28} color="#FFF" />
          </HeaderButton>
          <HeaderButton>
            <Ionicons name="bookmark" size={28} color="#FFF" />
          </HeaderButton>
        </ContainerButton>
      </Header>
      <ButtonLink onPress={() => setOpenLink(true)}>
        <Feather name="link" size={24} color="#FFF" />
      </ButtonLink>

      <Title numberOfLines={2}>{movie.title}</Title>

      <ContentArea>
        <Stars
          count={10}
          default={movie.vote_average}
          half
          starSize={20}
          fullStar={<Ionicons name="md-star" size={24} color="#E7A74E" />}
          emptyStar={
            <Ionicons name="md-star-outline" size={24} color="#E7A74E" />
          }
          halfStart={<Ionicons name="md-star-half" size={24} color="#E7A74E" />}
          disabled
        />
        <Rate>{movie.vote_average}</Rate>
      </ContentArea>
      <ListGenres
        data={movie?.genres}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Genres data={item} />}
      />
      <Title>Descrição</Title>
      <ScrollView
        showsVerticalcrollIndicator={false}
        contentContainerStyle={{ paddingTop: 8 }}
      >
        <Description>
          {movie && movie.overview ? movie.overview : 'Filme sem descrição'}
        </Description>
      </ScrollView>

      <Modal animationType="slide" transparent visible={openLink}>
        <ModalLink
          link={movie.homepage}
          title={movie.title}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>
    </Container>
  );
}

export default Detail;
