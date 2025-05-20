import React from 'react'
import { AppContext } from '../../Context/AppContext'
import Item from './Items/Item'
import SearchBox from '../SearchBox/SearchBox'

function DisplayItems({selectedcategory}) {
  const [searchText, setSearchText] = React.useState('')
  const {itemsData} = React.useContext(AppContext)

  const filteredItems = itemsData.filter(item => {
   if(!selectedcategory) return true
   return item.categoryId === selectedcategory
}).filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
  return (
    <div className='w-full flex flex-col gap-3'>
      <div className='flex justify-end items-center mb-4'> {/* Changed to justify-end */}
        <SearchBox onSearch={setSearchText}/>
      </div>
      <div className='grid grid-cols-3'>
        {filteredItems.map((item, index) => (
          <div key={index} className='flex flex-row p-3 rounded-lg'>
            <Item
              itemName={item.name}
              itemPrice={item.price}
              itemImage={`http://localhost:8080/api/v1.0/${item.imgUrl}`}
              itemDesc={item.description}
              itemId={item.itemId}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DisplayItems