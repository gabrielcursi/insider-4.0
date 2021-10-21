import React from 'react'
import {View, Text} from 'react-native'
import {Ionicons, Feather} from '@expo/vector-icons'
import {
  Container,
  Title,
  RateContainer,
  Rate,
  ActionContainer,
  DetailButton,
  DeleteButton
} from './styles'

const FavoriteMovies = ({data, deleteMovie, navigateDetailPage}) =>  {

  return(
    <Container>
      <Title size={22}>{data.title}</Title>

      <RateContainer>
        <Ionicons 
          name="md-star"
          size={12}
          color="#E7A74E"
        />
        <Rate>{data.vote_average}2/10</Rate>

      </RateContainer>
        <ActionContainer>
          <DetailButton onPress={() => navigateDetailPage(data)}>
            <Title size={14}>Ver Detalhes</Title>
          </DetailButton>

          <DeleteButton onPress={() => deleteMovie(data.id)}>
            <Feather name="trash" size={24} color="#FFF" />
          </DeleteButton>
        </ActionContainer>
    </Container>
  )
  
}

export default FavoriteMovies