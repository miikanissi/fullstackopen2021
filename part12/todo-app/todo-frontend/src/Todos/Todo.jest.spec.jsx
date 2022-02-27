import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Todo from '../../Todos/Todo'

test('renders content', () => {
  const todo =
    {
      _id: 1,
      text: 'Hello World',
      done: true
    }

    const onClickComplete = jest.fn()
    const onClickDelete = jest.fn()

  const component = render(
    <Todo key={todo._id} todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />
    )

  expect(component.container).toHaveTextContent(
    'Hello World'
  )
})
