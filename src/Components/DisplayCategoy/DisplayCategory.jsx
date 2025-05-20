import React from 'react'
import Category from './Category/category'

function DisplayCategory({categories, selectedCategory, setSelectedCategory}) {
  console.log("Selected Category",selectedCategory);
  
  return (
      <div className='grid grid-cols-3 gap-6 w-full h-full overflow-auto scorllbar-thin '>
        {categories.map((category) => (
          <Category 
          categoryName={category.name}
          imgUrl={`http://localhost:8080/api/v1.0/${category.imgUrl}`}
          numberOfItem={category.items}
          bgColor={category.bgColor}
          isSelected={selectedCategory === category.categoryId}
         onCklick={() => setSelectedCategory=(category.categoryId)}

          />
        ))}
      </div>

  )
}

export default DisplayCategory