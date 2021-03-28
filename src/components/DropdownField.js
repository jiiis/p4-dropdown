import React from 'react'
import styled from 'styled-components'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'

const StyledDropdownField = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  & > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    flex-grow: 1;
    align-items: center;
    padding: 0 6px 6px 0;
    min-height: 38px;
    border: 1px solid #ccc;
  }

  & > div > div {
    margin: 6px 0 0 6px;
    padding: 0 12px;
    height: 24px;
    line-height: 24px;
    background: #ccc;
    cursor: pointer;
  }
  
  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin: 0 0 0 9px;
    width: 38px;
    height: 38px;
    border: 1px solid #ccc;
  }
`

const DropdownField = ({ selectedOptions = [], isExpanded = false, setIsExpanded, deselectOption }) => {
  // Renderers
  const renderToggleButton = () => {
    return isExpanded ? <AiOutlineUp /> : <AiOutlineDown />
  }

  // Event handlers
  const handleToggleButtonClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <StyledDropdownField>
      <div>
        {selectedOptions.map(option => (
          <div
            key={option.value}
            onClick={() => deselectOption(option.value)}
          >{option.label}</div>
        ))}
      </div>
      <button onClick={handleToggleButtonClick}>{renderToggleButton()}</button>
    </StyledDropdownField>
  )
}

export default DropdownField
