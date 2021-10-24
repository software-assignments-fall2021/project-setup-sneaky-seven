import React, { useEffect, useState } from "react"
import Faq from "react-faq-component"
import FAQData from "./FAQData"

const FAQ = () => {

    const styles = {
        bgColor: 'white',
        titleTextColor: "black",
        rowTitleColor: "black",
        rowContentColor: 'grey',
        // arrowColor: "red",
    }
    
    const config = {
        animate: true,
        // arrowIcon: "V",
        // tabFocus: true
    }

    return (
        <div>
            <Faq
                data={FAQData}
                styles={styles}
                config={config}
            />
        </div>
    );
}

export default FAQ