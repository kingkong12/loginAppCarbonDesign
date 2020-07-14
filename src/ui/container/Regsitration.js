import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Link,
  FluidForm,
  TextInput,
  Select,
  Dropdown,
  Form,
  Button
} from 'carbon-components-react'
// components
import items from '../../const/dropdownList'
import errorMessages from '../../const/errorMessages'

const Regsitration = () => {
  const [state, setState] = useState({
    selectedItem: items[0],
    errorMsg: {
      firstName: '',
      lastName: '',
      company: '',
      iAma: '',
      email: '',
      password: ''
    }
  })
  const setError = (errorField, errorMsg) =>
    setTimeout(
      () =>
        setState({
          ...state,
          errorMsg: { ...state.errorMsg, [errorField]: errorMsg }
        }),
      100
    )

  const validatetextFields = (id, value) => {
    if (value === '') setError(id, errorMessages.emptyField)
    else if (value.length < 6) setError(id, errorMessages.lessThenFiveChar)
    else setError(id, '')
  }

  const submitForm = async (e) => {
    e.preventDefault()
    // TODOD: form submimttions steps.
  }

  const { selectedItem, errorMsg, iAma } = state
  return (
    <Container>
      <PageHeader>Register</PageHeader>
      <SubHeader>
        Alreadty have an account ? <Link> Log In </Link>
      </SubHeader>

      <Form id="registratitonForm" onSubmit={(e) => submitForm(e)}>
        <FieldWrapper>
          <StyledFluidForm styles={{ 'margin-bottom': '16px' }}>
            <StyledFields
              id="firstName"
              labelText="First Name"
              required
              invalid={Boolean(errorMsg.firstName)}
              invalidText={errorMsg.firstName}
              size="xl"
              onBlur={(e) => {
                validatetextFields(e.target.id, e.target.value)
              }}
              maxLength={50}
            />
          </StyledFluidForm>

          <StyledFluidForm>
            <StyledFields
              id="lastName"
              labelText="Last Name"
              required
              invalid={Boolean(errorMsg.lastName)}
              invalidText={errorMsg.lastName}
              size="xl"
              maxLength={50}
              onBlur={(e) => {
                validatetextFields(e.target.id, e.target.value)
              }}
            />
          </StyledFluidForm>

          <StyledFluidForm>
            <StyledFields
              id="company"
              labelText="Company"
              required
              invalid={Boolean(errorMsg.company)}
              invalidText={errorMsg.company}
              size="xl"
              maxLength={70}
              onBlur={(e) => {
                validatetextFields(e.target.id, e.target.value)
              }}
            />
          </StyledFluidForm>

          <StyledDropDown
            id="iAma"
            label="I am a"
            size="xl"
            labelText="drop down"
            items={items}
            invalid={Boolean(errorMsg.iAma)}
            invalidText={errorMsg.iAma}
            itemToString={(item) => (item ? item.text : '')}
            value={iAma}
            onChange={({ selectedItem }) =>
              setTimeout(() => setState({ ...state, iAma: selectedItem }), 100)
            }
            selected={selectedItem}
          />

          <StyledFluidForm>
            <StyledFields
              id="email"
              labelText="Email"
              required
              size="xl"
              maxLength={50}
              invalid={Boolean(errorMsg.email)}
              invalidText={errorMsg.email}
              onBlur={(e) => {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (e.target.value === '') {
                  setState({
                    ...state,
                    errorMsg: {
                      ...state.errorMsg,
                      [e.target.id]: errorMessages.emptyField
                    }
                  })
                } else if (!re.test(String(e.target.value).toLowerCase())) {
                  setState({
                    ...state,
                    errorMsg: {
                      ...state.errorMsg,
                      [e.target.id]: errorMessages.vaildEmail
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
                }
              }}
            />
          </StyledFluidForm>
          <StyledFluidForm>
            <StyledFields
              type="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              id="password"
              labelText="Password"
              required
              invalid={Boolean(errorMsg.password)}
              invalidText={errorMsg.password}
              maxLength={70}
              onBlur={(e) => {
                const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/g
                if (!regexPassword.test(String(e.target.value))) {
                  setState({
                    ...state,
                    errorMsg: {
                      ...state.errorMsg,
                      [e.target.id]: errorMessages.invalidPassword
                    }
                  })
                }
              }}
            />
          </StyledFluidForm>
        </FieldWrapper>

        <StyledButton kind="primary" type="submit">
          Continue to your free account
        </StyledButton>
        <TandC>
          BY creatign a Strobes account, you consent to adn fully accept our
          privacy policy. Term and service apply
        </TandC>
      </Form>
    </Container>
  )
}

const StyledDropDown = styled(Dropdown)``

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

const StyledFields = styled(TextInput)`
  min-width: 368px;
`
const StyledSelect = styled(Select)`
  > div {
    min-width: 368px !important;
    > select {
      min-width: 368px !important;
      min-height: 64px;
      position: relative;
      top: 0px;
    }
  }
`

const Container = styled.div``

const PageHeader = styled.h2`
  font-size: 2rem;
  margin-bottom: 4px;
`
const SubHeader = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.nero};
  margin-bottom: 64px;
`
const FieldWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 32px;
`

export default Regsitration
