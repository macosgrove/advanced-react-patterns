// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'
import {ErrorBoundary} from 'react-error-boundary'

const ToggleContext = React.createContext();

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return(
      <ToggleContext.Provider value={{on, toggle}}>
        {children}
      </ToggleContext.Provider>
  )
}

// 🐨 we'll still get the children from props (as it's passed to us by the
// developers using our component), but we'll get `on` implicitly from
// ToggleContext now
// 🦉 You can create a helper method to retrieve the context here. Thanks to that,
// your context won't be exposed to the user
// 💰 `const context = React.useContext(ToggleContext)`
// 📜 https://react.dev/reference/react/useContext

function ToggleOn({children}) {
  const context = React.useContext(ToggleContext)
  if (!context) throw new Error('Be sure to wrap ToggleButton in Toggle to supply its context')
  return context.on ? children : null
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({children}) {
  const context = React.useContext(ToggleContext)
  if (!context) throw new Error('Be sure to wrap ToggleButton in Toggle to supply its context')
  return context.on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton({...props}) {
  const context = React.useContext(ToggleContext)
  if (!context) throw new Error('Be sure to wrap ToggleButton in Toggle to supply its context')
  return <Switch on={context.on} onClick={context.toggle} {...props} />
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
  return <ErrorBoundary FallbackComponent={ErrorFallback}><ToggleButton /></ErrorBoundary>
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
