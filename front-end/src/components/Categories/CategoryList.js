import React, { useEffect, useState }from 'react'
import axios from "axios"
import '../css/CategoryList.css'
import * as AiIcons from 'react-icons/ai'
import * as MdIcons from 'react-icons/md'

function CategoryList() {
    const [categoryList, setCategoryList] = useState(null)

    useEffect(() => {
        axios.get('/api/categories').then((resp) => {
            setCategoryList(resp.data)
        }, () => {
            console.log(categoryList)
        })
    }, [])

    // TODO: complete mappings from category to icons 
    const mapCategoryToIcon = (category) => {
        return <MdIcons.MdOutlineLocalCafe />
    }

    return (
        <div>
            <ul>
                {categoryList && categoryList.map((item, index) => {
                    return (
                        <li key={index} className="category-list-text">
                            {mapCategoryToIcon(item.hierarchy[0])}
                            <span>{item.hierarchy[0]}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default CategoryList
