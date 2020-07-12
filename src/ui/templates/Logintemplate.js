import React from 'react'
import styled from 'styled-components'
// components
import Sidebar from '../organisms/Sidebar'

const Logintemplate = ({ children, ...props }) => {
  return (
    <Container>
      <Sidebar
        title="Risk-centered"
        subHeaderText="Vulerablity Management"
        footerTitle="Security Workflows"
        footerText="Create and run playbooks to integrate sedcurity into you CI/CD pipeline"
      />
      <Content>{children}</Content>
    </Container>
  )
}

export default Logintemplate

const Container = styled.div`
  display: flex;
  height: 100%;
  margin: 0px;
`
const Content = styled.div`
  width: 100%;
  background-color: lightblue;
`
