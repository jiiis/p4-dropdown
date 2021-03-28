import React from 'react'

import DropdownWidget from './components/DropdownWidget'

const options = [
  {
    label: 'China',
    value: 'china'
  },
  {
    label: 'United States',
    value: 'united-states'
  },
  {
    label: 'Japan',
    value: 'japan'
  },
  {
    label: 'India',
    value: 'india'
  },
  {
    label: 'Russia',
    value: 'russia'
  }
]

const App = () => {
  return (
    <main>
      <DropdownWidget
        label="Select countries"
        options={options}
      />
    </main>
  )
}

export default App
