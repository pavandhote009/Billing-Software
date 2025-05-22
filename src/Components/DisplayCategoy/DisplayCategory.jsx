import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category/category';

function DisplayCategory({ categories, selectedCategory, setSelectedCategory }) {
  console.log("Selected Category", selectedCategory);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full h-full p-2 overflow-auto scrollbar-thin">
      
      <div key="All" className="text-black">
        <Category 
          categoryName="All Items"
          imgUrl={'/src/assets/upload.png'}
          numberOfItem={categories.reduce((acc, cat) => acc + cat.items, 0)}
          bgColor="#fcba03"
          isSelected={selectedCategory === ''}
          onClick={() => setSelectedCategory('')}
        />
      </div>

      {categories.map((category) => (
        <div key={category.categoryId}>
          <Category 
            categoryName={category.name}
            imgUrl={`http://localhost:8080/api/v1.0/${category.imgUrl}`}
            numberOfItem={category.items}
            bgColor={category.bgColor}
            onClick={() => setSelectedCategory(category.categoryId)}
            isSelected={selectedCategory === category.categoryId}
          />
        </div>
      ))}
    </div>
  );
}

DisplayCategory.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      items: PropTypes.number.isRequired,
      bgColor: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func.isRequired
};

export default DisplayCategory;
