import "./App.css"
import { useSelector } from 'react-redux'
import Header from './component/Header'
import { Outlet } from 'react-router-dom'
function App() {
  const proList = useSelector((state) => state)
  console.log(proList)
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App