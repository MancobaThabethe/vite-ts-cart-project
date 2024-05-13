import CartCard from "./CartCard/CartCard"
import PromptOverlay from "./CartCard/PromptOverlay"
import useCart from "../../hooks/useCart"
import { useEffect, useState } from "react"

type PropsType = {
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Cart = ({setViewCart}: PropsType) => {
  const { totalItems, totalPrice, cart, REDUCER_ACTIONS, dispatch } = useCart()


  const handleCheckout = (): void => {
    dispatch({type: REDUCER_ACTIONS.SUBMIT})
    setCheckout(true)
    setTimeout(()=> 
      setViewCart(false), 1000)
  }

  const [deleted, setDeleted] = useState<boolean>(false)
  const [checkout, setCheckout] = useState<boolean>(false)

  useEffect(()=>{
    setTimeout(()=>{
      setDeleted(false)
      setCheckout(false)
    }, 2000)
  },[deleted, checkout])

  return (
    <>
    {deleted|| checkout ? <PromptOverlay deleted={deleted} checkout={checkout} /> : <></>}
    <main>
      <h2>Cart</h2>
      <h4>Total Items: {totalItems}</h4>
      <section>
        {
          cart?.length ? 
          <ul className="cart__list">
            {
              cart.map(items => {
                return(
                  <li><CartCard key={items.sku} items={items} dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} setDeleted={setDeleted}  /></li>
                )
              })
            }  
          </ul> : <p className="cart-empty">Cart is empty</p>
        }
        <div>
        <h4>Total Price: {totalPrice}</h4>
          {
            cart.length ? 
            <button className="check_out_btn" onClick={handleCheckout}>Check Out</button> : <></> 
          }
        </div>
      </section>
    </main>
    </>
  )
}

export default Cart