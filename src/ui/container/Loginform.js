import React from 'react'
import {
  Link,
  FluidForm,
  TextInput,
  FormLabel,
  Checkbox,
  Button as CarbonButton
} from 'carbon-components-react'
import styled from 'styled-components'
// constants-helpers
import organizationMinLength from '../../const/fieldConstants'
import query from '../../const/mediaQuery'
// components
import { PageHeader, SubHeader } from './Regsitration'

const Loginform = () => {
  return (
    <Container>
      <PageHeader>Log in</PageHeader>
      <SubHeader>
        Don't have an Account? <Link> Register Now </Link>
      </SubHeader>
      <StyledFormLabel> Enter Your Strobes ID</StyledFormLabel>
      <FluidForm>
        <TextInput
          type="text"
          id="email"
          defaultValue=""
          labelText="Email"
          placeholder="john.doe@example.com"
          invalid={false}
          invalidText={'Invalid text'}
          maxLength={organizationMinLength}
        />
        <Button type="submit"> Continue </Button>
      </FluidForm>
      <ForgotPassword>
        <Checkbox id="remember-me" labelText="Remember Me" />
        <Link> Forgot you Passowrd ? </Link>
      </ForgotPassword>
    </Container>
  )
}

const StyledFormLabel = styled(FormLabel)`
  font-size: 0.875rem;
  color: ${(props) => props.theme.nero};
  font-weight: 400;
`
const Container = styled.div`
  min-width: 352px;
  @media ${query.lessThanMedium} {
    padding: 0px 30px;
    min-width: 100%;
  }
`

const Button = styled(CarbonButton)`
  min-width: 100%;
  min-height: 3rem;
  margin-bottom: 17px;
`

const ForgotPassword = styled.div`
  display: flex;
  justify-content: flex-end;
`

export default Loginform
