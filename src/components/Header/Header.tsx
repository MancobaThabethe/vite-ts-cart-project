import Nav from "./Nav/Nav"
import useCart from "../../hooks/useCart"

type propsType = {
  viewCart: boolean
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({viewCart, setViewCart}: propsType) => {
  const { totalItems, totalPrice } = useCart()
  
  return (
    <header className='header'>
      <div className="header__title-bar">
        <h1>
          Acme Watches Co.
        </h1>
        <div className='header__price-box'>
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  )
}

export default Header
