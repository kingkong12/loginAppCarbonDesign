import React, { useState, useRef } from 'react'
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
import { organizationMinLength, emailRegex } from '../../const/fieldConstants'
import query from '../../const/mediaQuery'
import errorMessages from '../../const/errorMessages'
// components
import { PageHeader, SubHeader } from './Regsitration'

const Loginform = () => {
  const emailRef = useRef(null)
  const [state, setState] = useState({
    loginEmail: '',
    loginPassword: '',
    emailError: '',
    passwordError: '',
    step: 1
  })
  const { loginEmail, loginPassword, emailError, step, passwordError } = state
  const emailValidation = (value) => {
    if (value < 6) {
      setState({ ...state, emailError: errorMessages.lessthanSix })
    } else if (!emailRegex.test(String(value).toLowerCase())) {
      setState({ ...state, emailError: errorMessages.vaildEmail })
    } else {
      setState({ ...state, emailError: '' })
    }
  }

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <TextInput
            ref={emailRef}
            value={loginEmail}
            onInput={(e) => setState({ ...state, loginEmail: e.target.value })}
            type="text"
            id="loginEmail"
            labelText="Email"
            placeholder="john.doe@example.com"
            invalid={Boolean(emailError)}
            required
            invalidText={emailError}
            maxLength={organizationMinLength}
            onBlur={(e) => emailValidation(e.target.value)}
          />
        )
      case 2:
        return (
          <TextInput
            //ref={emailRef}
            value={loginPassword}
            onInput={(e) =>
              setState({ ...state, loginPassword: e.target.value })
            }
            type="passowrd"
            id="password"
            labelText="Password"
            placeholder="****"
            invalid={Boolean(passwordError)}
            required
            invalidText={passwordError}
            maxLength={organizationMinLength}
            //onBlur={(e) => emailValidation(e.target.value)}
          />
        )
      default:
        return <div> Failed to load form </div>
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    // const formValue = document.getElementById('loginEmail').value
    // console.log('faornvalue')
    if (state.emailError) {
      return
    }
    if (state.step === 1) setState({ ...state, step: 2 })
  }

  return (
    <Container>
      <PageHeader>Log in</PageHeader>
      <SubHeader>
        Don't have an Account? <Link> Register Now </Link>
      </SubHeader>
      <StyledFormLabel> Enter Your Strobes ID</StyledFormLabel>
      <FluidForm id="loginform" onSubmit={(e) => onSubmit(e)}>
        {renderForm()}
        <Button type="submit"> Continue </Button>
      </FluidForm>
      <ForgotPassword>
        <Checkbox id="remember-me" labelText="Remember Me" />
        <Link> Forgot you Passowrd ? </Link>
      </ForgotPassword>
      <AlternateLogin>
        <Link> Alternate Login </Link>
      </AlternateLogin>
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

const AlternateLogin = styled.div`
  margin-top: 37px;
`

export default Loginform
