import { ReactElement, createContext, useMemo, useReducer } from "react"

export type CartItemType = {
    sku: string
    name: string
    price: number
    quantity: number
}

type CartStateType = {
    cart: CartItemType[]
}

const initState: CartStateType = { cart: [] }

const REDUCE_ACTION_TYPE = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    QUANTITY: 'QUANTITY',
    SUBMIT: 'SUBMIT'
}

export type ReducerActionType = typeof REDUCE_ACTION_TYPE

export type ReducerAction = {
    type: string
    payload?: CartItemType
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch(action.type){
        case REDUCE_ACTION_TYPE.ADD: {
            if(!action.payload) throw new Error("action.payload missing in ADD")
            const { sku, name, price } = action.payload
            const filteredCartItems: CartItemType[] = state.cart.filter(item => item.sku !== sku)
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)
            const qty: number = itemExists ? itemExists.quantity + 1 : 1

            return {...state, cart: [ ...filteredCartItems, { sku, name, price, quantity: qty}]}
        }
        case REDUCE_ACTION_TYPE.REMOVE: {
            if(!action.payload) throw new Error("action.payload missing in REMOVE")
            const { sku } = action.payload
            const filteredCartItems: CartItemType[] = state.cart.filter(item => item.sku !== sku)
            return {...state, cart: filteredCartItems}
        }
        case REDUCE_ACTION_TYPE.QUANTITY: {
            if(!action.payload) throw new Error("action.payload missing in QUANTITY")
            const { sku, quantity } = action.payload

            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)
            if(!itemExists) throw new Error('Item must exists in order to update quantity')
            
            const updatedItem: CartItemType = {...itemExists, quantity}
            const filteredCartItems: CartItemType[] = state.cart.filter(item => item.sku !== sku)
            
            return {...state, cart: [...filteredCartItems, updatedItem]}
        }
        case REDUCE_ACTION_TYPE.SUBMIT:
            return { ...state, cart: [] }
        default:
            throw new Error('Unidentified Reducer Action')
    }
}

const useCartContext = (initState: CartStateType) => {
    const [state, dispatch] = useReducer(reducer, initState)

    const REDUCER_ACTIONS = useMemo(()=> REDUCE_ACTION_TYPE,[])

    const totalItems: number = state.cart.reduce((prev, cartItem) => prev + cartItem.quantity, 0 )
    const totalPrice = new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
    }).format(
        state.cart.reduce((prev, cartItem) => prev + (cartItem.quantity * cartItem.price), 0 )
    )
    const cart = state.cart.sort((a, b) => Number(a.sku.slice(-4)) - Number(b.sku.slice(-4)))

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart}

}

export type UseCartContextType = ReturnType<typeof useCartContext>

export const initCartContextState: UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCE_ACTION_TYPE,
    totalItems: 0,
    totalPrice: '',
    cart: []
}

export const CartContext = createContext<UseCartContextType>(initCartContextState)

export type childrenType = {
    children?: ReactElement | ReactElement[]
}

export const CartProvider = ({children}: childrenType): ReactElement => {
    return(
        <CartContext.Provider value={useCartContext(initState)}>
            {children}
        </CartContext.Provider>
    )
}