import { createContext, useEffect, useReducer } from "react";
import { snacks } from "../backend/database";

export const ProductContext = createContext();

const initDatabase = snacks;
const initialState = {
    productList: initDatabase,
    searchProduct: ""
};

const productReducer = ( prevState, {type, value} ) => {
    switch (type) {
        case 'SET_INITIAL_STATE':
            return {...prevState, ...initialState};

        case 'SET_PRODUCT_LIST':
            return {...prevState, productList: value};
        
        case 'UPDATE_SEARCH_BAR':
            return {...prevState, searchProduct: value};

        default:
            return prevState;
    }
}

export const ProductProvider = ({children}) => {
    
    const [ productState, dispatchProduct ] = useReducer(productReducer, initialState);

    const getProductList = () => {
        dispatchProduct({type: 'SET_INITIAL_STATE', value: initialState});    
    } 

    useEffect(()=>{
        getProductList();// eslint-disable-next-line
    }, [])

    return <ProductContext.Provider value={{ productState, dispatchProduct, getProductList }}>
        {children}
    </ProductContext.Provider>
};