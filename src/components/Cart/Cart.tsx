import CartCard from "./CartCard/CartCard"
import PromptOverlay from "./CartCard/PromptOverlay"
import useCart from "../../hooks/useCart"
import { useEffect, useState } from "react"

type PropsType = {
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Cart = ({setViewCart}: PropsType) => {
  const { totalItems, totalPrice, cart, REDUCER_ACTIONS, dispatch } = useCart()

  const btnStyle = {
    backgroundColor: 'green',
    color: "white"
  }

  const handleCheckout = (): void => {
    dispatch({type: REDUCER_ACTIONS.SUBMIT})
    setCheckout(true)
    setTimeout(()=> 
      setViewCart(false), 2700)
  }

  const [deleted, setDeleted] = useState<boolean>(false)
  const [checkout, setCheckout] = useState<boolean>(false)

  useEffect(()=>{
    setTimeout(()=>{
      setDeleted(false)
      setCheckout(false)
    }, 3000)
  },[deleted, checkout])

  return (
    <>
    {deleted|| checkout ? <PromptOverlay deleted={deleted} checkout={checkout} /> : <></>}
    <main>
      <h2>Cart</h2>
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
            <button style={btnStyle} onClick={handleCheckout}>Check Out</button> : <></> 
          }
        </div>
      </section>
    </main>
    </>
  )
}

export default Cart