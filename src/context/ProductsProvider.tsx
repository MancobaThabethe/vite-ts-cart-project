import { ReactElement, createContext, useState } from "react"

export type ProductType = {
    sku: string
    name: string
    price: number
}

const initState: ProductType[] = [
    {
        "sku": "item0001",
        "name": "Widget",
        "price": 999.99
    },
    {
        "sku": "item0002",
        "name": "Premium Widget",
        "price": 1999.99
    },
    {
        "sku": "item0003",
        "name": "Deluxe Widget",
        "price": 2999.99
    }
]

export type useProductsContextType = { products: ProductType[] }

const initContextState: useProductsContextType = { products: [] }
const ProductsContext = createContext<useProductsContextType>(initContextState)

type childrenType = {
    children?: ReactElement | ReactElement[]
}

export const ProductsProvider = ({children}: childrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initState)

    return(
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext