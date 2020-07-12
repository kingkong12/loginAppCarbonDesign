import React from 'react'
import { shallow } from 'enzyme'
import ExampleHeader from './index'

describe('Example header atom', () => {
  it('renders as expected', () => {
    // shallow only renders the first level of children instead of mounting the whole component tree
    const wrapper = shallow(<ExampleHeader />)
    /*
        jest lets us take snapshots of the html output (with some info on funcs and other stuff)
        to make sure our component hasn't changed unexpectedly. A __snapshots__ folder is generated
        to store them if the snapshot file doesn't already exist.
    */
    expect(wrapper).toMatchSnapshot()
  })
})
