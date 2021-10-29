import React, { useEffect, useState }from 'react'
import axios from "axios"
import '../css/CategoryList.css'
import * as AiIcons from 'react-icons/ai'
import * as MdIcons from 'react-icons/md'

const baseURL = "http://localhost:3000/categories" 

function CategoryList() {
    const [categoryList, setCategoryList] = useState(null)

    useEffect(() => {
        axios.get(baseURL).then((resp) => {
            setCategoryList(resp.data)
        }, () => {
            console.log(categoryList)
        })
    })

    const mapCategoryToIcon = (category) => {
        if(category === "Grocery") {
            return <MdIcons.MdOutlineLocalGroceryStore />
        } else if(category === "Transportation") {
            return <MdIcons.MdEmojiTransportation />
        } else if(category === "Cafe") {
            return <MdIcons.MdOutlineLocalCafe />
        } else if(category === "Home") {
            return <AiIcons.AiOutlineHome />
        } else if(category === "Education") {
            return <MdIcons.MdOutlineCastForEducation />
        } else if(category === "Leisure") {
            return <MdIcons.MdOutlineSportsHandball />
        }
    }

    return (
        <div>
            <ul>
                {categoryList && categoryList.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            {mapCategoryToIcon(item.title)}
                            <span>
                            {item.title}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default CategoryList
