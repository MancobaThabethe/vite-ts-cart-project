import { CartItemType, ReducerAction, ReducerActionType } from "../../../context/CartProvider"
import { ReactElement } from "react"

type PropsType = {
  items: CartItemType
  dispatch: React.Dispatch<ReducerAction>
  REDUCER_ACTIONS: ReducerActionType
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>
}

const cardStyles = {
  border: '1px solid black',
  display: 'flex',
  justifyContent: 'space-between',
  height: '10rem',
  borderRadius: '10px',
  overflow: 'hidden'
}

const CartCard = ({items, dispatch, REDUCER_ACTIONS, setDeleted}: PropsType): ReactElement => {
  const { sku, name, price, quantity } = items
  const imgUrl: string = new URL(`../../../images/${sku}.jpg`, import.meta.url).href

  const removeItems = ():void => {
    dispatch({type: REDUCER_ACTIONS.REMOVE, payload: {...items}})
    setDeleted(true)
  }
  
  return (
    <div style={cardStyles}>
      <div>
        <img src={imgUrl} alt="Item" className="cart__img" />
      </div>
      <div>
        <h3>{name}</h3>
        <p>Qunantity: {quantity}</p>

        <p>Sub Total: {quantity * price}</p>
      </div>
      <div>
        <button onClick={removeItems}>Delete {quantity > 1 ? 'All Items' : "Item"}</button>
      </div>
    </div>
  )
}

export default CartCard