import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BeamSpliceDesignPage from './pages/BeamSpliceDesignPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BeamSpliceDesignPage />
    </>
  )
}

export default App
