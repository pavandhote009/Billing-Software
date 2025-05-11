import React, { createContext, useEffect } from 'react'
import { fetchCategories } from '../Service/CategoryService'


export const AppContext=createContext(null)
export const AppContextProvider=(props)=>{
        const [Categories,setCategories]=React.useState([])

        useEffect(()=>{
            async function loadData(){
                const response = await fetchCategories()
                setCategories(response.data)
            }
            loadData()
        }
        ,[])

 const contextValue={
        Categories,
        setCategories,
     }

     return(
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
        )

   
}