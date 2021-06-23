import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'



function  Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)
 
 
 
    const [title, setTitle] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)


    useEffect(() =>{
        const getPrice= () =>{
            const price = cart.reduce((prev, item) => {
                return prev + (item.price)
            },0)
            
            setPrice(price)
        }
        getPrice()
        
    },[cart])



    useEffect(() =>{
        const getQuantity= () =>{
            const quantity = cart.reduce((prev, item) => {
                return (item.quantity)
            },0)
            
            setQuantity(quantity)
        }
        getQuantity()
        
    },[cart])

    useEffect(() =>{
        const getTitle= () =>{
            const title = cart.reduce((prev, item) => {
                return  (item.title)
            },0)
            
            setTitle(title)
        }
        getTitle()
        
    },[cart])
    

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)
            
            setTotal(total)
        }
        getTotal()
        
    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("seguro que querés borrar el producto?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    



    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "2rem"}}>No hay productos agregados</h2> 

    return (
        <div>
            {
                cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        <img src={product.images.url} alt="" />

                        <div className="box-detail">
                            <h2>{product.title}</h2>

                            <h3>$ {product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>
                            
                            
                            <div className="delete" 
                            onClick={() => removeProduct(product._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }
            <span className = "whatsapp_label">AVISANOS DE TU COMPRA <p> <span role = "img" aria-label = "">👉</span> </p> </span>
            <a
                href="https://wa.me/2348100000000"
                className="whatsapp_float"
                target="_blank"
                rel="noopener noreferrer"
            >
                
                <i className="fa fa-whatsapp whatsapp-icon"></i>
            </a>

            <div className="total">
                <h3>Total: $ {total}</h3>
                <form action="http://localhost:3000/checkout" method = "POST">
                   
                        
                
                    <div className="">
                    <input type="hidden" name =  "title" value = {title + " x " + quantity}/>
                    <input type="hidden" name =  "total" value = {total}/>
                    <input type="hidden" name =  "quantity" value = {quantity}/>
                    </div>
         
                    <input type="submit" value = "COMPRAR" className = "pay-button" />
               
                
                </form>
            </div>
        </div>
    )
}

export default  Cart




