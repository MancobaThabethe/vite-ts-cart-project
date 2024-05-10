import ProductCard from "./ProductCard/ProductCard"
import { useProducts } from "../../hooks/useProducts"
import { ProductType } from "../../context/ProductsProvider"
import useCart from "../../hooks/useCart"



const Products = () => {
  const { dispacth, REDUCER_ACTIONS, cart } = useCart()
  const { products } = useProducts()
  return (
    <main className="main main--products">
      <h2>Products</h2>
      {
        products?.length ? (
          <>
            {
              products.map((product: ProductType) => {
                const inCart: boolean = cart.some(item => item.sku === product.sku)

                return(
                  <ProductCard key={product.sku} product={product} dispatch={dispacth} REDUCER_ACTIONS={REDUCER_ACTIONS} inCart={inCart} />
                )
              })
            } 
          </>
        ) : <p>Products loading....</p>
      }
    </main>
  )
}

export default Products