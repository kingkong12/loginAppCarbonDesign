import React, { useState, useRef } from 'react'
import { PropTypes } from 'prop-types'
import {
  Link,
  FluidForm,
  TextInput,
  FormLabel,
  Checkbox,
  Icon,
  InlineNotification,
  Button as CarbonButton
} from 'carbon-components-react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import axios from 'axios'

import { iconArrowLeft } from 'carbon-icons'
// constants-helpers

import baseApi from '../../services/api'
import { organizationMinLength, emailRegex } from '../../const/fieldConstants'
import query from '../../const/mediaQuery'
import errorMessages from '../../const/errorMessages'
// components
import { PageHeader, SubHeader } from './Regsitration'

const Loginform = (props) => {
  const emailRef = useRef(null)
  const [state, setState] = useState({
    loginEmail: props.router?.location?.state?.email || '',
    organizationName: '',
    organizationNameError: '',
    loginPassword: '',
    emailError: '',
    passwordError: '',
    networkError: '',
    step: props.router?.location?.state?.step || 3
  })
  const {
    loginEmail,
    organizationName,
    loginPassword,
    emailError,
    organizationNameError,
    step,
    passwordError
  } = state
  const emailValidation = (value) => {
    if (value < 6) {
      setState({ ...state, emailError: errorMessages.lessthanSix })
    } else if (!emailRegex.test(String(value).toLowerCase())) {
      setState({ ...state, emailError: errorMessages.vaildEmail })
    } else {
      setState({ ...state, emailError: '' })
    }
  }

  const passwordValidation = (value) => {
    if (value < 6) {
      setState({ ...state, passwordError: errorMessages.lessthanSix })
    }
  }

  const renderLable = () => {
    switch (step) {
      case 1:
        return 'Enter Your Strobes ID'
      case 2:
        return (
          <Goback>
            <StyledIcon
              icon={iconArrowLeft}
              fill="#0F62FE"
              description="Go Back"
              onClick={() => setState({ ...state, step: 1 })}
            />
            {loginEmail}
          </Goback>
        )
      case 3:
        return 'Enter your organization'
      default:
        return null
    }
  }
  const renderEmailForm = () => {
    switch (step) {
      case 1:
        return (
          <TextInput
            ref={emailRef}
            value={loginEmail || ''}
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
            //  TODO:  ahow and hide in password
            value={loginPassword || ''}
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
            onBlur={(e) => passwordValidation(e.target.value)}
          />
        )
      case 3:
        return (
          <TextInput
            value={organizationName}
            onInput={(e) =>
              setState({ ...state, organizationName: e.target.value })
            }
            type="text"
            id="organizationName"
            labelText="Organization Name"
            placeholder="myorg.strobes.co"
            invalid={Boolean(organizationNameError)}
            required
            invalidText={organizationNameError}
            maxLength={organizationMinLength}
            // onBlur={(e) => emailValidation(e.target.value)}
          />
        )
      case 4:
        return (
          <>
            <Button
              onClick={() =>
                setState({
                  step: 1
                })
              }
              kind="tertiary"
            >
              Continue as email
            </Button>
            {/* {loginOption.map((item, index) => (
              <Button
                onClick={() =>
                  alert(
                    'Module yet to implement, till then please try to use  LOGIN with email'
                  )
                }
                kind="tertiary"
              >
                {item}sub
              </Button>
            ))} */}
          </>
        )
      default:
        return <div> Failed to load form </div>
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (state.emailError || state.passwordError) {
      setState({
        ...state,
        errorMsg: {
          ...state.errorMsg,
          networkError: 'One or more filed has error or is  empty'
        }
      })
    } else {
      axios.get(`${baseApi}/users`).then((response) => {
        const { data } = response
        console.log(
          'ssscscsc',
          data.find(
            (elm) => elm.email === loginEmail && elm.password === loginPassword
          )
        )
        if (
          data.find(
            (elm) => elm.email === loginEmail && elm.password === loginPassword
          )
        ) {
          setState({
            ...state,
            networkError: ''
          })
          props.push({ pathname: '/success' })
        } else {
          setState({
            ...state,
            networkError: 'Email or Passwort is  incorrect'
          })
          return
        }
      })
    }
  }

  return (
    <Container>
      <PageHeader>Log in</PageHeader>
      <SubHeader>
        Don't have an Account?
        <Link
          // Note used :Ink tag instead of button here
          onClick={() => props.push({ pathname: '/registration' })}
        >
          {'\u00A0'}Register Now
        </Link>
      </SubHeader>
      <StyledFormLabel>{renderLable()}</StyledFormLabel>
      <FluidForm id="loginform">
        {renderEmailForm()}
        {step === 4 ? null : (
          <Button
            onClick={(e) => {
              let newStep = 0
              if (step === 3) newStep = step + 1
              if (step === 4) newStep = 1
              if (step === 1)
                emailError ? (newStep = step) : (newStep = step + 1)
              if (step === 2) {
                newStep = step
                onSubmit(e)
              }
              setState({ ...state, step: newStep })
            }}
          >
            Continue
          </Button>
        )}
      </FluidForm>
      <ForgotPassword>
        {step === 3 || step === 4 ? null : (
          <Checkbox id="remember-me" labelText="Remember Me" />
        )}
        <Link
          onClick={() => {
            alert('TODO:  forgot pasword module to be build')
          }}
        >
          Forgot you Passowrd ?
        </Link>
      </ForgotPassword>
      {step === 3 || step === 4 ? null : (
        <AlternateLogin>
          <Link onClick={() => alert('TO DO:  Alterante login module ')}>
            Alternate Login
          </Link>
        </AlternateLogin>
      )}

      {state.networkError && (
        <StyledNotification
          kind="error"
          role="alert"
          title={state.networkError}
          onCloseButtonClick={() =>
            setState({
              ...state,
              networkError: ''
            })
          }
        />
      )}
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

const StyledIcon = styled(Icon)`
  margin-right: 9px;
`

const Goback = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.nero};
`
const mapStateToProps = (state) => {
  return {
    router: state.router
  }
}

const StyledNotification = styled(InlineNotification)`
  background-color: #fdf1f1;
  color: #4d4949;
`

Loginform.propTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps, { push })(Loginform)
