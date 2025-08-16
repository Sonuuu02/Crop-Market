import React from 'react'
import HomeCategoryCard from './HomeCategoryCard'
import { useAppSelector } from '../../../../Redux Toolkit/Store';

const homeCategory=[
  {
    "name": "Fruits",
    "categoryId": "fruits_category",
    "parentCategoryName": "Fruit",
    "parentCategoryId": "Fruit",
    
    "level": 1,
    "section":"SHOP_BY_CATEGORIES",
    image:""
  }
    
  
  
]
const HomeCategory = () => {
  const { homePage} = useAppSelector((store) => store);
  return (
    <div className='flex flex-wrap justify-center gap-7 '>
        {homePage.homePageData?.shopByCategories.map((item)=><HomeCategoryCard item={item}/>)}
        
    </div>
  )
}

export default HomeCategory
