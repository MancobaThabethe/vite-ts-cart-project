import { useContext } from "react";
import ProductsContext, { useProductsContextType } from "../context/ProductsProvider";

export const useProducts = (): useProductsContextType => {
    return useContext(ProductsContext)
}

