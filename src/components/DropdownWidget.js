import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { difference } from 'lodash'

import DropdownField from './DropdownField'
import DropdownMenu from './DropdownMenu'

const StyledDropdownWidget = styled.section`
  padding: 18px 24px;
  width: 360px;
`

const DropdownWidget = ({ label = '', options = [] }) => {
  // Refs
  const widgetRef = useRef()

  // States
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([options[1]])

  // Lifecycle events
  useEffect(() => {
    const onBodyClick = (event) => {
      if (widgetRef.current && widgetRef.current.contains(event.target)) {
        return
      }

      setIsExpanded(false)
    }

    document.body.addEventListener('click', onBodyClick, { capture: true })

    return () => document.body.removeEventListener('click', onBodyClick)
  }, [])

  // Event handlers
  const selectOption = (optionValue) => {
    const option = options.find(option => option.value === optionValue)

    if (option) {
      setSelectedOptions([...selectedOptions, option])
    }
  }

  const deselectOption = (optionValue) => {
    setSelectedOptions(selectedOptions.filter(option => option.value !== optionValue))
  }

  // Helpers
  const getAvailableOptions = () => {
    return difference(options, selectedOptions)
  }

  return (
    <StyledDropdownWidget ref={widgetRef}>
      <label>{label}</label>
      <DropdownField
        selectedOptions={selectedOptions}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        deselectOption={deselectOption}
      />
      {isExpanded && (
        <DropdownMenu
          availableOptions={getAvailableOptions()}
          selectOption={selectOption}
        />
      )}
    </StyledDropdownWidget>
  )
}

export default DropdownWidget
