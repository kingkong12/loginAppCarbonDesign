import React from 'react'
import styled from 'styled-components'
import query from '../../const/mediaQuery'

type Props = {
  title: String,
  subHeaderText: String,
  footerTitle: String,
  footerText: String
}

const Sidabr = ({
  title = '',
  subHeaderText = '',
  footerTitle = '',
  footerText = '',
  ...props
}: Props) => {
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
  width: 32%;
  background-color: ${(props) => props.theme.veryDarkGrey};
  color: white;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${query.lessThanMedium} {
    display: none;
  }
`
const Header = styled.div`
  font-weight: 300;
  font-size: 22px;
  font-weight: 300;
  letter-spacing: 1px;
`
const TitleText = styled.div`
  font-size: ${(props) => (props.small ? '20px' : '28px')};
  font-weight: ${(props) => (props.small ? 400 : 500)};
  margin-bottom: 10px;
`

const FooterWrapper = styled.div`
  margin-bottom: 5px;
  font-weight: 300;
  line-height: 1.6;
  font-size: 14px;
  letter-spacing: 1px;
`
