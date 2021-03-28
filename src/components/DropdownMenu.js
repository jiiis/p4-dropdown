import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledDropdownMenu = styled.div`
  margin: 12px 0 0;
  border: 1px solid #ccc;
  
  & > form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 6px;
    height: 42px;
    border-bottom: 1px solid #ccc;
  }
  
  & > form > input {
    flex-grow: 1;
    margin: 0 0 0 6px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
  }
  
  li {
    height: 30px;
    line-height: 30px;
    padding: 0 6px;
    cursor: pointer;

    &:hover {
      background: #ccc;
    }
  }
`

const StyledEmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
`

const DropdownMenu = ({ availableOptions = [], selectOption }) => {
  // States
  const [searchTerm, setSearchTerm] = useState('')
  const [visibleOptions, setVisibleOptions] = useState(availableOptions)

  // Lifecycle events
  useEffect(() => {
    if (/^\s*$/.test(searchTerm)) {
      setVisibleOptions(availableOptions)

      return
    }

    setVisibleOptions(availableOptions.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase())))
  }, [searchTerm, availableOptions])

  // Event handlers
  const handleSearchTextFieldChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <StyledDropdownMenu>
      <form>
        <label htmlFor="option-search-text-field">Search options</label>
        <input
          id="option-search-text-field"
          type="text"
          name="option-search-text-field"
          value={searchTerm}
          onChange={handleSearchTextFieldChange}
          data-testid="option-search-text-field"
        />
      </form>
      <ul data-testid="visible-option-list">
        {visibleOptions.length === 0 ? <StyledEmptyState>No options available.</StyledEmptyState> : visibleOptions.map(option => (
          <li
            key={option.value}
            onClick={() => selectOption(option.value)}
          >{option.label}</li>
        ))}
      </ul>
    </StyledDropdownMenu>
  )
}

export default DropdownMenu
