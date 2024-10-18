// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  const toggleProps = {'aria-pressed': on, onClick: toggle}
  return {on, toggle, toggleProps}
}

function App() {
  const {on, toggleProps} = useToggle()
  return (
    <div>
      <Switch on={on} {...toggleProps} />
      <hr />
      <button aria-label="custom-button" {...toggleProps}>
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
