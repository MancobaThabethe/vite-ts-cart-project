import { ProductType } from "../../../context/ProductsProvider"
import { ReducerActionType, ReducerAction } from "../../../context/CartProvider"
import { ReactElement } from "react"

type PropsType = {
    product: ProductType
    dispatch: React.Dispatch<ReducerAction>
    REDUCER_ACTIONS: ReducerActionType 
    inCart: boolean
}

const ProductCard = ({ product, inCart, dispatch, REDUCER_ACTIONS }: PropsType): ReactElement => {
    const img = new URL(`../../../images/${product.sku}.jpg`, import.meta.url).href

    const onAddToCart = () => dispatch({type: REDUCER_ACTIONS.ADD, payload: {...product, quantity: 1}})
    const itemInCart = inCart ? '=> Item in Cart' : null
    
    return (
      <article className="product">
        <img src={img} alt={product.name} className="product__img" />
        <h3>{product.name}</h3>
        <p>{new Intl.NumberFormat('en-ZA', {style: 'currency',currency: 'ZAR',}).format(product.price)}{itemInCart}</p>
        <button onClick={onAddToCart}>Add to cart</button>
    </article>  
  )
}

export default ProductCard