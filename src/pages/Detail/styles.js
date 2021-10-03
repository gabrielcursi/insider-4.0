import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: #191a30;
`;

export const ContainerButton = styled.View`
  flex-direction: row;
  justify-content: space-between;
  top: 35px;

  padding: 0 14px;
`;

export const Header = styled.ImageBackground`
  width: 100%;
  height: 350px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  overflow: hidden;
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 46px;
  height: 46px;
  background-color: rgba(25, 26, 48, 0.8);
  border-radius: 23px;
  justify-content: center;
  align-items: center;
`;

export const ButtonLink = styled.TouchableOpacity`
  background-color: #e72f49;
  width: 63px;
  height: 63px;
  border-radius: 35px;
  position: absolute;
  top: 315px;
  right: 15px;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  padding: 8px 14px;
  /* margin-top: 32px; */
`;

export const ContentArea = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 14px;
  justify-content: space-between;
`;

export const Rate = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const ListGenres = styled.FlatList`
  padding-left: 14px;
  margin: 8px 0;
  max-height: 35px;
  min-height: 35px;
`;

export const Description = styled.Text`
  padding: 0 14px;
  padding-bottom: 30px;
  color: #fff;
  line-height: 20px;
`;
