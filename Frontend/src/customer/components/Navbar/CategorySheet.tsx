import React from 'react'
import { fruitLevelThree } from '../../../data/category/level three/fruitLevelThree'
import { fruitLevelTwo } from '../../../data/category/level two/fruitLevelTwo'
import { dairyLevelTwo } from '../../../data/category/level two/dairyLevelTwo'

import { vegetableLevelThree } from '../../../data/category/level three/vegetableLevelThree'
import { vegetableLevelTwo } from '../../../data/category/level two/vegetableLevelTwo'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import {  seedLevelTwo } from '../../../data/category/level two/seedLevelTwo'
import {  spiceLevelTwo } from '../../../data/category/level two/spiceLevelTwo'
import {  spiceLevelThree } from '../../../data/category/level three/spiceLevelThree'
import {  seedLevelThree } from '../../../data/category/level three/seedLevelThree'
import { dairyLevelThree } from '../../../data/category/level three/dairyLevelThree'
import { oilLevelTwo } from '../../../data/category/level two/oilLevelTwo'
import { oilLevelThree } from '../../../data/category/level three/oilLevelThree'
import { grainLevelTwo } from '../../../data/category/level two/grainLevelTwo'
import { grainLevelThree } from '../../../data/category/level three/grainLevelThree'
import { dFruitLevelTwo } from '../../../data/category/level two/davoudLevelTwo'
import { dFruitLevelThree } from '../../../data/category/level three/davoudLevelThree'

const categoryTwo: { [key: string]: any[] } = {

    davoud_fruit:dFruitLevelTwo,
    fruit: fruitLevelTwo,
    vegetable: vegetableLevelTwo,
    dairy:dairyLevelTwo, 
    oils:oilLevelTwo,
    grains:grainLevelTwo,
    seed:seedLevelTwo,
    spice:spiceLevelTwo,
   

}

const categoryThree: { [key: string]: any[] } = {

    davoud_fruit:dFruitLevelThree,
    fruit: fruitLevelThree,
    vegetable: vegetableLevelThree,
    dairy:dairyLevelThree,
    oils:oilLevelThree,
    seed:seedLevelThree,
    spice:spiceLevelThree,
    grains:grainLevelThree
    

}

const CategorySheet = ({ selectedCategory,toggleDrawer,setShowSheet }: any) => {

const navigate=useNavigate()


    const childCategory = (category: any, parentCategoryId: any) => {
        return category.filter((child: any) => {
            // console.log("Category", parentCategoryId, child)
            return child.parentCategoryId == parentCategoryId
        })

    }
    const handleCategoryClick = (category:string) => {
        if(toggleDrawer){
            toggleDrawer(false)()
        }
        if(setShowSheet){
            setShowSheet(false)
        }
        
        navigate("/products/"+category)
    }
    return (
        <Box className='bg-white shadow-lg  lg:h-[500px] overflow-y-auto'>
            <div className='flex flex-wrap text-sm '>
                {categoryTwo[selectedCategory]?.map((item: any,index) => 
                <div  key={item.name} className={`p-8 lg:w-[20%] ${index%2==0?"bg-slate-50":"bg-white"}`}>

                    <p className='text-[#ff8000] mb-5 font-semibold'>{item.name}</p>

                    <ul className='space-y-3'>
                        {childCategory(categoryThree[selectedCategory], item.categoryId)?.map((item: any) => <div key={item.name}>

                            <li 
                            onClick={()=>handleCategoryClick(item.categoryId)}
                            className='hover:text-[#ff8000] cursor-pointer'>
                                {item.name}
                            </li>

                        </div>)}
                    </ul>


                </div>)}
            </div>
        </Box>
    )
}

export default CategorySheet
