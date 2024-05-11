import CartCard from "./CartCard/CartCard"
import CardItemDeleted from "./CartCard/CardItemDeleted"
import useCart from "../../hooks/useCart"
import { useEffect, useState } from "react"

const Cart = () => {
  const { totalItems, totalPrice, cart, REDUCER_ACTIONS, dispatch } = useCart()

  const btnStyle = {
    backgroundColor: 'green',
    color: "white"
  }

  const checkout = (): void => {
    dispatch({type: REDUCER_ACTIONS.SUBMIT})
  }

  const [deleted, setDeleted] = useState<boolean>(false)

  useEffect(()=>{
    setTimeout(()=>{
      setDeleted(false)
    }, 1500)
  },[deleted])

  return (
    <main>
      <h2>Cart</h2>
      {deleted ? <CardItemDeleted /> : <></>}
      <h4>Total Items: {totalItems}</h4>
      <h4>Total Price: {totalPrice}</h4>
      <section>
        {
          cart?.length ? 
          <>
            {
              cart.map(items => {
                return(
                  <CartCard key={items.sku} items={items} dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} setDeleted={setDeleted}  />
                )
              })
            }  
          </> : <p className="cart-empty">Cart is empty</p>
        }
        <div>
          {
            cart.length ? 
            <button style={btnStyle} onClick={checkout}>Check Out</button> : <></> 
          }
        </div>
      </section>
    </main>
  )
}

export default Cart