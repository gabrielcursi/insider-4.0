import styled from 'styled-components'

export const Container = styled.View`
  flex: 1;
  background-color: #191a30;
`

export const ContainerButton = styled.View`
flex-direction: row;
justify-content: space-between;
top: 35px;
width: 100%;
height: 250px;
padding: 0 14px;

`


export const Header = styled.ImageBackground`
border-radius: 25px;
border-bottom-left-radius: 25px;
border-bottom-right-radius: 16px;
`


export const HeaderButton = styled.TouchableOpacity`
width: 46px;
height: 46px;
background-color: rgba(25, 26, 48, 0.8);
border-radius: 23px;
justify-content: center;
align-items: center;
`