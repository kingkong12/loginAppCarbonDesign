import React from 'react'
import styled from 'styled-components'
import query from '../../const/mediaQuery'

const Sidabr = ({
  title = '',
  subHeaderText = '',
  footerTitle = '',
  footerText = '',
  ...props
}) => {
  return (
    <Wrapper>
      <Header>
        <TitleText> {title} </TitleText>
        {subHeaderText}
      </Header>
      <FooterWrapper>
        {/* TODO: ADD INIFINITY ICON */}
        <TitleText small>{footerTitle}</TitleText>
        {footerText}
        {/* TODO:  MAKE SIDE BAR CAROUSAL */}
      </FooterWrapper>
    </Wrapper>
  )
}

export default Sidabr

const Wrapper = styled.div`
  width: 24.4%;
  background-color: ${(props) => props.theme.veryDarkGrey};
  color: white;
  padding: 68px 29px 83px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${query.lessThanMedium} {
    display: none;
  }
`
const Header = styled.div`
  font-weight: 300;
  font-size: 1.375rem;
  color: ${(props) => props.theme.white};
`
const TitleText = styled.div`
  font-size: ${(props) => (props.small ? '1rem' : '	1.75rem')};
  font-weight: ${(props) => (props.small ? 600 : 700)};
  margin-bottom: 10px;
`

const FooterWrapper = styled.div`
  margin-bottom: 5px;
  font-weight: 400;
  line-height: 1.6;
  font-size: 0.875rem;
  color: ${(props) => props.theme.white};
`
