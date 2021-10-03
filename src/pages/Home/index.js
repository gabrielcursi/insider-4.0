import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';

import {
  Container,
  SearchContainer,
  SearchButton,
  Input,
  Title,
  BannerButton,
  Banner,
  SliderMovie,
  Loading,
} from './styles';

import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';
import { Feather } from '@expo/vector-icons';
import api, { key } from '../../services/api';
import { getListMovies, randomBanner } from '../../utils/utils';
import { useNavigation } from '@react-navigation/native';

function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [banner, setBanner] = useState({});
  const [input, setInput] = useState('');

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovies() {
      const [nowData, popularData, topRatedData] = await Promise.all([
        api.get('/movie/now_playing', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1,
          },
        }),
        api.get('/movie/popular', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1,
          },
        }),
        api.get('/movie/top_rated', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1,
          },
        }),
      ]);

      if (isActive) {
        const nowDataResults = nowData.data.results;
        const popularResults = popularData.data.results;
        const topRatedResults = topRatedData.data.results;

        const nowList = getListMovies(2, nowDataResults);
        const popularList = getListMovies(5, popularResults);
        const topList = getListMovies(10, topRatedResults);

        setBanner(nowDataResults[randomBanner(nowDataResults)]);

        setNowMovies(nowDataResults);
        setPopularMovies(popularResults);
        setTopRatedMovies(topRatedResults);

        setLoading(false);
      }
    }

    getMovies();

    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  function navigationDetailsPage(item) {
    navigation.navigate('Detail', { id: item.id });
  }

  function handleSeatchMovie() {
    if (input === '') {
      alert('Preencha algum nome');
      return;
    }
    navigation.navigate('Search', { name: input });
    setInput('');
  }

  if (loading) {
    return (
      <Container>
        <Loading size="large" color="#FFF" />
      </Container>
    );
  }

  return (
    <Container>
      <Header title="React Prime" />

      <SearchContainer>
        <Input
          placeholderTextColor="#F5F5F5"
          placeholder="Ex Vingadores"
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <SearchButton onPress={handleSeatchMovie}>
          <Feather name="search" size={30} color="#FFF" />
        </SearchButton>
      </SearchContainer>

      <ScrollView>
        <Title>Em Cartaz</Title>

        <BannerButton
          activeOpacity={0.9}
          onPress={() => navigationDetailsPage(banner)}
        >
          <Banner
            resizeMethod="resize"
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${banner.poster_path}`,
            }}
          />
        </BannerButton>

        <SliderMovie
          horizontal
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => navigationDetailsPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Populares</Title>
        <SliderMovie
          horizontal
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => navigationDetailsPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Mais Votados</Title>
        <SliderMovie
          horizontal
          showsHorizontalScrollIndicator={false}
          data={topRatedMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => navigationDetailsPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </ScrollView>
    </Container>
  );
}

export default Home;
