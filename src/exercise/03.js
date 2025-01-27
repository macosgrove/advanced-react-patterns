// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'
import {ErrorBoundary} from 'react-error-boundary'

const ToggleContext = React.createContext()
ToggleContext.displayName = "ToggleContext"

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return(
      <ToggleContext.Provider value={{on, toggle}}>
        {children}
      </ToggleContext.Provider>
  )
}

function useToggle() {
  const context = React.useContext(ToggleContext)
  if (!context) throw new Error('Be sure to wrap Toggle... components in Toggle to supply their context')
  return context
}

function ToggleOn({children}) {
  const { on } = useToggle()
  return on ? children : null
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({children}) {
  const { on } = useToggle()
  return on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton({...props}) {
  const { on, toggle } = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Check your code and try again</button>
      </div>
  )
}

function App() {
    return (
        <div>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Toggle>
                <ToggleOn>The button is on</ToggleOn>
                <ToggleOff>The button is off</ToggleOff>
                <div>
                    <ToggleButton />
                </div>
            </Toggle>
            </ErrorBoundary>
        </div>
    )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
