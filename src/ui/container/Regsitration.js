import React, { useState } from 'react'
import styled from 'styled-components'
import { PropTypes } from 'prop-types'
import {
  Link,
  FluidForm,
  TextInput,
  Dropdown,
  Button,
  InlineNotification
} from 'carbon-components-react'
import axios from 'axios'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import query from '../../const/mediaQuery'
import { emailRegex } from '../../const/fieldConstants'
import baseApi from '../../services/api'
// components
import items from '../../const/dropdownList'
import errorMessages from '../../const/errorMessages'

const Regsitration = (props) => {
  const [state, setState] = useState({
    allFields: {
      firstName: '',
      lastName: '',
      company: '',
      iam: '',
      email: '',
      password: ''
    },
    selectedItem: items[0],
    errorMsg: {
      firstName: '',
      lastName: '',
      company: '',
      networkError: '',
      iAma: '',
      email: '',
      password: ''
    }
  })
  const { firstName, lastName, company, iam, email, password } = state.allFields
  const { errorMsg } = state

  const setError = (errorField, errorMessage) =>
    setTimeout(
      () =>
        setState({
          ...state,
          errorMsg: { ...state.errorMsg, [errorField]: errorMessage }
        }),
      50
    )

  const updateFieldsValue = (filedName, value) => {
    setState({
      ...state,
      allFields: { ...state.allFields, [filedName]: value }
    })
  }

  const validationTextField = (id, value) => {
    if (value === '' || value.length < 6)
      setError(id, errorMessages.lessthanSix)
    else setError(id, '')
  }

  const validateEmail = (id, value) => {
    if (value === '') {
      setState({
        ...state,
        errorMsg: {
          ...state.errorMsg,
          [id]: errorMessages.emptyField
        }
      })
    } else if (!emailRegex.test(String(value).toLowerCase())) {
      setState({
        ...state,
        errorMsg: {
          ...state.errorMsg,
          [id]: errorMessages.vaildEmail
        }
      })
    } else {
      setState({
        ...state,
        errorMsg: {
          ...state.errorMsg,
          [id]: ''
        }
      })
    }
  }

  const submitForm = (e) => {
    e.preventDefault()
    if (
      errorMsg.firstName ||
      errorMsg.lastName ||
      errorMsg.company ||
      errorMsg.email ||
      errorMsg.password
    ) {
      setState({
        ...state,
        errorMsg: {
          ...state.errorMsg,
          networkError: 'Please check one or more field for error'
        }
      })
    } else {
      axios.get(`${baseApi}/users`).then((response) => {
        const { data } = response
        if (data.find((elm) => elm.email === email)) {
          setState({
            ...state,
            errorMsg: {
              ...state.errorMsg,
              networkError: 'User Already Exists'
            }
          })
        } else {
          axios
            .post(`${baseApi}/users`, {
              firstname: firstName,
              lastname: lastName,
              company,
              email,
              password
            })
            .then(() => {
              setState({
                ...state,
                errorMsg: {
                  ...state.errorMsg,
                  networkError: ''
                }
              })
            })
        }
      })
    }
  }

  return (
    <Container>
      <PageHeader>Register</PageHeader>
      <SubHeader>
        Alreadty have an account ?{' '}
        <Link onClick={() => props.push({ pathname: '/' })}> Log In </Link>
      </SubHeader>

      <StyledFluidForm id="registratitonForm" onSubmit={(e) => submitForm(e)}>
        <FieldWrapper>
          <TextInput
            id="firstName"
            labelText="First Name"
            placeholder="Jhon"
            required
            invalid={Boolean(errorMsg.firstName)}
            invalidText={errorMsg.firstName}
            value={firstName}
            onInput={(e) => updateFieldsValue(e.target.id, e.target.value)}
            onBlur={(e) => {
              validationTextField(e.target.id, e.target.value)
            }}
            maxLength={50}
          />

          <TextInput
            id="lastName"
            labelText="Last Name"
            required
            placeholder="Doe"
            invalid={Boolean(errorMsg.lastName)}
            invalidText={errorMsg.lastName}
            value={lastName}
            onInput={(e) => updateFieldsValue(e.target.id, e.target.value)}
            onBlur={(e) => {
              validationTextField(e.target.id, e.target.value)
            }}
            maxLength={50}
          />

          <TextInput
            id="company"
            labelText="Company"
            required
            placeholder="Acme Corp Inc"
            invalid={Boolean(errorMsg.company)}
            invalidText={errorMsg.company}
            size="xl"
            value={company}
            onInput={(e) => updateFieldsValue(e.target.id, e.target.value)}
            onBlur={(e) => {
              validationTextField(e.target.id, e.target.value)
            }}
          />

          <StyledDropdown
            id="iam"
            size="xl"
            items={items}
            label="slect Iam "
            invalid={false}
            invalidText="in valid text"
            itemToString={(item) => (item ? item.text : '')}
            onChange={({ selectedItem }) => {
              console.log('sleected ', selectedItem)
              setTimeout(() => setState({ ...state, iam: selectedItem }), 1000)
            }}
            selectedItem={iam}
          />

          <TextInput
            id="email"
            labelText="Email"
            required
            size="xl"
            placeholder="john.doe@example.com"
            maxLength={50}
            value={email}
            invalid={Boolean(errorMsg.email)}
            invalidText={errorMsg.email}
            onInput={(e) => updateFieldsValue(e.target.id, e.target.value)}
            onBlur={(e) => validateEmail(e.target.id, e.target.value)}
          />

          <TextInput
            type="password"
            id="password"
            placeholder="**********"
            labelText="Password"
            required
            invalid={Boolean(errorMsg.password)}
            invalidText={errorMsg.password}
            maxLength={70}
            value={password}
            //TODO: Show and Hide button
            onInput={(e) => updateFieldsValue(e.target.id, e.target.value)}
            onBlur={(e) => {
              if (e.target.value.length < 6) {
                setState({
                  ...state,
                  errorMsg: {
                    ...state.errorMsg,
                    [e.target.id]: errorMessages.lessthanSix
                  }
                })
              } else {
                setState({
                  ...state,
                  errorMsg: {
                    ...state.errorMsg,
                    [e.target.id]: ''
                  }
                })
                props.push({ pathname: '/', state: { email, step: 1 } })
              }
            }}
          />
        </FieldWrapper>

        <StyledButton kind="primary" type="submit">
          Continue to your free account
        </StyledButton>
        <TandC>
          BY creatign a Strobes account, you consent to adn fully accept our
          privacy policy. Term and service apply
        </TandC>
        {errorMsg.networkError && (
          <InlineNotification
            kind="error"
            role="alert"
            title={errorMsg.networkError}
            onCloseButtonClick={() =>
              setState({
                ...state,
                errorMsg: {
                  ...state.errorMsg,
                  errorMsg: ''
                }
              })
            }
          />
        )}
      </StyledFluidForm>
    </Container>
  )
}

const StyledFluidForm = styled(FluidForm)`
  margin-bottom: 16px;
`
const TandC = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.dimGrey};
  margin: 1rem 0rem;
`
const StyledButton = styled(Button)`
  min-width: 100%;
  height: 4rem;
  border-radius: 4px;
  margin-top: 30px;
`

export const Container = styled.div`
  width: 77.4%;

  @media ${query.greaterThanLarge} {
    max-width: 768px;
  }
  @media ${query.lessThanMedium} {
    width: 100%;
    margin: 0px 16px;
  }
`

export const PageHeader = styled.h2`
  font-size: 2rem;
  margin-bottom: 4px;
`
export const SubHeader = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.nero};
  margin-bottom: 64px;
`
const FieldWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 32px;
  grid-row-gap: 16px;
  @media ${query.lessThanMedium} {
    grid-template-columns: auto;
    padding: 0px 8px;
  }
`
const StyledDropdown = styled(Dropdown)`
  min-height: 64px;
`

const mapStateToProps = (state) => {
  return {
    router: state.router
  }
}

Regsitration.propTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps, { push })(Regsitration)
