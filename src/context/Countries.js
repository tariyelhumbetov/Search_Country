import { createContext, useReducer } from "react";


export const countriesContext = createContext();


const initialState = {
    choosenCountry: {},
    countries: [],
    nightMode: false,
    details: false
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'region':
            return {
                ...state,
                countries: action.payload
            }
        case 'country':
            return {
                ...state,
                choosenCountry: action.payload,
                details: !state.details
            }
        case 'mode':

            return {
                ...state,
                nightMode: !state.nightMode
            }
        case 'backbtn':
            return {
                ...state,
                details: !state.details

            }

        default:
            return state
    }
}


export default function Countries({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)


    return (
        <countriesContext.Provider value={[state, dispatch]}>
            {children}
        </countriesContext.Provider>
    )

}