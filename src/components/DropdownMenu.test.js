import ReactDom from 'react-dom'
import renderer from 'react-test-renderer'
import { cleanup, render, fireEvent } from '@testing-library/react'

import DropdownMenu from './DropdownMenu'

const availableOptions = [
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
  }
]

let selectOptionSpy, dropdownMenuComponent

beforeEach(() => {
  selectOptionSpy = jest.fn()
  dropdownMenuComponent = <DropdownMenu
    availableOptions={availableOptions}
    selectOption={selectOptionSpy}
  />
})

afterEach(cleanup)

test('renders in the DOM', () => {
  const div = document.createElement('div')

  ReactDom.render(dropdownMenuComponent, div)
})

test('matches snapshot', () => {
  const tree = renderer.create(dropdownMenuComponent).toJSON()

  expect(tree).toMatchSnapshot()
})

test('filters by search term', () => {
  const { getByTestId } = render(dropdownMenuComponent)

  fireEvent.change(getByTestId('option-search-text-field'), { target: { value: 'hin' } })

  expect(getByTestId('visible-option-list')).toHaveTextContent('China')
  expect(getByTestId('visible-option-list')).not.toHaveTextContent('United States')
  expect(getByTestId('visible-option-list')).not.toHaveTextContent('Japan')
})

test('deselects option', () => {
  const { getByText } = render(dropdownMenuComponent)

  fireEvent.click(getByText('Japan'))

  expect(selectOptionSpy).toHaveBeenCalledWith('japan')
})
