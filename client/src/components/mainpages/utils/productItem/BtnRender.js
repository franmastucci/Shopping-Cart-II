import React from 'react'
import {Link} from 'react-router-dom'
//import {GlobalState} from '../../../../GlobalState'

function BtnRender({product}) {

    
    return (
        <div className = "row_btn">
                
            <Link id = "btn_buy" to = "#!">
                <a> Buy</a>
            </Link>
        
            <Link id = "btn_view" to={`/detail/${product._id}`}>
                <a> View</a>
            </Link>
        

        </div>
    )
}

export default BtnRender