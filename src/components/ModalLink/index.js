import React from 'react';
import { ActivityIndicator } from 'react-native';
import { BackButton, Name } from './styles';
import { Feather } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { Container, Loading } from '../../pages/Home/styles';

const ModalLink = ({ link, title, closeModal }) => {

  const LoadingIndicatorView = () => {
    return (
      <Container>
        <Loading size="large" color="#FFF" />
      </Container>
    );
  };
  return (
    <>
      <BackButton onPress={closeModal}>
        <Feather name="x" size={35} color="#FFF" />
        <Name numberOfLines={1}>{title}</Name>
      </BackButton>
      <WebView
        source={{ uri: link }}
        renderLoading={LoadingIndicatorView}
        startInLoadingState
      />
    </>
  );
};

export default ModalLink;
