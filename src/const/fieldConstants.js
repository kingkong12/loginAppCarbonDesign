// organization - Company min character
const organizationMinLength = 50

//email regex used in 1. login, 2. registration
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// logoin options

const loginOption = [
  'Login in with SMAL SSO',
  'Login with Google',
  'Login with Github',
  'Login With Bit Bucket'
]

export { organizationMinLength, emailRegex, loginOption }
