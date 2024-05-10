import useCart from "../hooks/useCart"

type propsType = {
  viewCart: boolean
}

const Footer = ({viewCart}: propsType) => {
  const { totalItems, totalPrice } = useCart()

  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      {
        viewCart ? <p>Shopping Cart &copy;{year}</p> : (
          <>
            <p>Total items: {totalItems}</p>
            <p>Total price: {totalPrice}</p>
            <p>Shopping Cart &copy;{year}</p>
          </>
        )
      }
    </footer>
  )
}

export default Footer