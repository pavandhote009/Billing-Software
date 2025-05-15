import React, { createContext, useEffect, useState } from 'react'
import { fetchCategories } from '../Service/CategoryService'
import { fetchItems } from '../Service/ItemService'


export const AppContext=createContext(null)
export const AppContextProvider=(props)=>{
        const [Categories,setCategories]=React.useState([])
        const [itemsData, setItemsData] =useState([])
        const [auth, setAuth] = React.useState({token:null, role:null});
          
            
        useEffect(()=>{
            async function loadData(){
                const response = await fetchCategories()
               const itemrResponse= await fetchItems()
                setCategories(response.data)
                setItemsData(itemrResponse.data)
            }
            loadData()
        }
        ,[])

        const setAuthData=(token, role)=>{
            setAuth({token, role})
        }

 const contextValue={
        Categories,
        setCategories,
        auth,
        setAuthData,
        itemsData,
        setItemsData
     }

     return(
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
        )

   
}