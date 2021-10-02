import React, { useState, useEffect } from 'react'

import {
  Container,
  Header,
  HeaderButton,
  ContainerButton
} from './styles'

import { Feather, Ionicons } from '@expo/vector-icons'
import api, { key } from '../../services/api'

const image = { uri: "https://reactjs.org/logo-og.png" };

import { useNavigation, useRoute } from '@react-navigation/native'


function Detail() {
  const navigation = useNavigation()
  const route = useRoute()

  const [movie, setMovie] = useState({})

  useEffect(() => {
    let isActive = true;

    async function getMovie() {
      const response = await api.get(`/movie/${route.params?.id}`, {
        params: {
          api_key: key,
          language: 'pt-BR'
        }
      })
        .catch((err) => {
          console.log(err)
        })

      if (isActive) {
        setMovie(response.data)
      }
    }

    if (isActive) {
      getMovie()

    }

    return () => {
      isActive = false
    }

  }, [])

  console.log(movie)

  return (
    <Container>
      <Header
        source={image}
        resizeMode="cover"
        imageStyle={{ borderRadius: 25 }}

      >
        <ContainerButton>
          <HeaderButton >
            <Feather
              name="arrow-left"
              size={28}
              color="#FFF"
            />
          </HeaderButton>
          <HeaderButton>
            <Ionicons
              name="bookmark"
              size={28}
              color="#FFF"
            />
          </HeaderButton>
        </ContainerButton>
      </Header>
    </Container>
  )
}

export default Detail