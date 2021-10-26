import React from 'react'
import { IconListRow1, IconListRow2, IconListRow3 } from './IconList'
import { Row, Col } from 'react-simple-flex-grid'
import "react-simple-flex-grid/lib/main.css"

/** IconGrid is a hardcoded solection of icons */
function IconGrid() {

    return (
        <div>
            <b>Icons</b>
            <Row justify="center">
            {IconListRow1.map((item, key) => {
                return (
                    <Col id={key} span={2}>{item.icon}</Col>
                )
                
            })}
            </Row>
            <Row justify="center">
            {IconListRow2.map((item, key) => {
                return (
                    <Col id={key} span={2}>{item.icon}</Col>
                )
                
            })}
            </Row>

            <Row justify="center">
            {IconListRow3.map((item, key) => {
                return (
                    <Col id={key} span={2}>{item.icon}</Col>
                )
                
            })}
            </Row>



        </div>
    )
}

export default IconGrid
