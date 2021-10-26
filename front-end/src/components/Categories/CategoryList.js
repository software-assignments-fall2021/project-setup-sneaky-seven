import React from 'react'
import { CategoryData } from './CategoryData';
import '../css/CategoryList.css'

function CategoryList() {
    return (
        <div>
            <ul>
                {CategoryData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            {item.icon}
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
