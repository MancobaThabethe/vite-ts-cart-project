import { CartItemType, ReducerAction, ReducerActionType } from "../../../context/CartProvider"
import { ChangeEvent, ReactElement } from "react"

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
  alignItems: 'center',
  height: '10rem',
  borderRadius: '10px',
  overflow: 'hidden'
}

const CartCard = ({items, dispatch, REDUCER_ACTIONS, setDeleted}: PropsType): ReactElement => {
  const { sku, name, price, quantity } = items
  const imgUrl: string = new URL(`../../../images/${sku}.jpg`, import.meta.url).href
  const highestQty: number = 20 > quantity ? 20 : quantity
  const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)
  const options: ReactElement[] = optionValues.map(val => <option key={`opt${val}`} value={val}>{val}</option>)

  const onChange = (e: ChangeEvent) => dispatch({type: REDUCER_ACTIONS.QUANTITY, payload: {...items, quantity: Number(e.target.value)}})

  const removeItems = ():void => {
    dispatch({type: REDUCER_ACTIONS.REMOVE, payload: items})
    setDeleted(true)
  }
  
  return (
    <div style={cardStyles} className="cart__item">
      <div>
        <img src={imgUrl} alt="Item" className="cart__img" />
      </div>
      <div>
        <h3 aria-label="Item name">{name}</h3>
        <p aria-label="Item quantity">Qunantity: {quantity}</p>
        <select onChange={onChange} defaultValue={quantity}>
          {options}
        </select>
        <p aria-label="Item sub total">Sub Total: {new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
          }).format(quantity * price)}</p>
      </div>
      <div>
        <button onClick={removeItems} className="cart_delete_btn" >Delete {quantity > 1 ? 'All Items' : "Item"}</button>
      </div>
    </div>
  )
}

export default CartCard