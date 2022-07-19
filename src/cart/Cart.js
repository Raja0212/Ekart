import React, { Component, useState } from 'react'
import store from '../store'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import './../ekartStyle.css'

function Cart(props){

    const [cart , updateCartValues] = useState(store.getState().cartData)

    let removeFromCart = data => {
        let cart = store.getState().cartData
        let updatedCart = cart.filter(function(product) { return product.productId != data.productId });
        props.dispatch({type:'HANDLE_CART',cartData:updatedCart})
        updateCartValues(updatedCart)
    }

    return (
        <div>
            <nav class="navbar navbar-light bg-dark">
                <span className='navContent' >Cart &nbsp;
                {store.getState().cartData.length> 0 && <span class="badge badge-danger">{store.getState().cartData.length}</span> }
                </span>
            </nav>
             <div className='productDisplayLayout' >
                {store.getState().cartData.length === 0 && 
                    <div className='cartEmptyMessage'>
                        <h3 className='App italic' >Your cart is empty!!</h3>
                        <h6 className='App italic' >Visit <a href='/products'>Products</a> page to explore more..</h6>
                    </div>
                }
                {store.getState().cartData.map(data =>{
                    return(
                        <div class="card" className='cardStyle' >
                            <img src={data.image} class="card-img-top" alt="..."/>
                            <div class="card-body">
                            <h5 class="card-title cardTitleStyle" >{data.productName}</h5>
                            <div class='flex'>
                                <p class='cardPriceStyle' >Price : </p> &nbsp;
                                <p class="card-text">{data.price} /-</p>
                            </div>
                                <div class='rightAlign' >
                                    <button id='buttonFontSize' className='btn btn-danger' onClick={() => removeFromCart(data)} >Remove</button> 
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {
                    store.getState().cartData.length > 0 && 
                    <div class='rightAlign'>
                        <Link className='btn btn-secondary' to={{ pathname: '/products'}}>Back to products</Link> &nbsp;
                        <button className='btn btn-success'>Check out</button>
                    </div>
                }
        </div>
    )
}

const mapStateToProps = state => ({
    cartData : state.cartData
})

export default connect()(Cart)