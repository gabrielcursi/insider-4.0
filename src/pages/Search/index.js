import React, { useState, useEffect } from 'react';

import { Container, Name } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';

const Search = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  if (loading) {
    return <Container></Container>;
  }

  return (
    <Container>
      <Name>PROCURANDO</Name>
    </Container>
  );
};

export default Search;
