import Header from './components/Header/Header'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Footer from './components/Footer'
import './App.css'
import { useState } from 'react'

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false)

  const pageContent = viewCart ? <Cart setViewCart={setViewCart}/> : <Products />
  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {
        pageContent
      }
      <Footer viewCart={viewCart} />
    </>
  )
  
  return (
    <>
      {content}
    </>
  )
}

export default App
