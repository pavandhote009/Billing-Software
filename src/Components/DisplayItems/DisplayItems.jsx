import React from 'react';
import { AppContext } from '../../Context/AppContext';
import Item from './Items/Item';
import SearchBox from '../SearchBox/SearchBox';

function DisplayItems({ selectedcategory }) {
  const [searchText, setSearchText] = React.useState('');
  const { itemsData } = React.useContext(AppContext);

  const filteredItems = itemsData
    .filter(item => !selectedcategory || item.categoryId === selectedcategory)
    .filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div className="w-full flex flex-col gap-4 p-2">
      
      <div className="flex justify-end items-center">
        <SearchBox onSearch={setSearchText} />
      </div>

      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div key={index} className="p-3 rounded-lg shadow-md">
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
  );
}

export default DisplayItems;
