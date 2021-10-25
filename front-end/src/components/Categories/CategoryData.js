import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';

// TODO: load from backend 
export const CategoryData = [
    {
        title: 'Grocery',
        icon: <MdIcons.MdOutlineLocalGroceryStore />,
        cName: 'category-list-text'
    },
    {
        title: 'Transportation',
        icon: <MdIcons.MdEmojiTransportation />,
        cName: 'category-list-text'
    },
    {
        title: 'Cafe',
        icon: <MdIcons.MdOutlineLocalCafe />,
        cName: 'category-list-text'
    },
    {
        title: 'Home',
        icon: <AiIcons.AiOutlineHome />,
        cName: 'category-list-text'
    },
    {
        title: 'Education',
        icon: <MdIcons.MdOutlineCastForEducation />,
        cName: 'category-list-text'
    },
    {
        title: 'Leisure',
        icon: <MdIcons.MdOutlineSportsHandball />,
        cName: 'category-list-text'
    },
]