import React, { Component, useState } from 'react'
import ProductList from '../data/products.json'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import store from '../store'
import './../ekartStyle.css'

function searchingFor(term,filterValue) {

    console.log('searchingFor '+term)
    return function (x) {
        console.log(x.productName)
        console.log(x.productName.toLowerCase().includes(term.toLowerCase()))
        return ( 
            x.productName.toLowerCase().includes(term.toLowerCase())  
        ) || 
        (
            !term
        )
    }
}

function Products(props){

    const [cart , updateCartValues] = useState(store.getState().cartData)
    const [searchedValue , updateSearchedValue] = useState('')
    const [filterValue , setFilterValue] = useState({
        category:'',
        color:'',
        price:'',
        brand:''
    })

    let handleCart = (data) => {
        let cartData = store.getState().cartData
        props.dispatch({type:'HANDLE_CART',cartData:[...cartData , data]})
        updateCartValues([...cart,data])
    }

    let removeFromCart = data => {
        let cart = store.getState().cartData
        let updatedCart = cart.filter(function(product) { return product.productId != data.productId });
        props.dispatch({type:'HANDLE_CART',cartData:updatedCart})
        updateCartValues(updatedCart)
    }

    let applyFilter = () => {
        let obj = {}
        let categoryValue = document.getElementById('category').value
        let colorValue = document.getElementById('color').value
        let priceValue = document.getElementById('price').value
        let brandValue = document.getElementById('brand').value
        // let categoryValue = document.getElementById('category').options[document.getElementById('category').selectedindex].value
        // let colorValue = document.getElementById('color').options[document.getElementById('color').selectedindex].value
        // let brandValue = document.getElementById('brand').options[document.getElementById('brand').selectedindex].value
        if(categoryValue.length > 0) {
            obj['category'] = categoryValue
        }else{
            obj['category'] = ''
        }
        if(colorValue.length > 0){
            obj['color'] = colorValue
        }else{
            obj['color'] = ''
        }
        if(priceValue.length > 0){
            obj['price'] = priceValue
        }else{
            obj['price'] = ''
        }
        if(brandValue.length > 0){
            obj['brand'] = brandValue
        }else{
            obj['brand'] = ''
        }
        setFilterValue(obj)
    }

    let checkFilterForObject = (data) => {
        let isCategorySatisfied = filterValue.category.length > 0 ? false : true
        let isColorSatisfied = filterValue.color.length ? false : true
        let isPriceSatisfied = filterValue.price.length ? false : true
        let isbrandSatisfied = filterValue.brand.length ? false : true
        if(filterValue.category === data.category ){
            isCategorySatisfied = true
        }
        if(filterValue.color === data.color ){
            isColorSatisfied = true
        }
        if(parseInt(filterValue.price) > parseInt(data.price) ){
            isPriceSatisfied = true
        }
        if(filterValue.brand === data.brand ){
            isbrandSatisfied = true
        }
        console.log('flter',data.productName,isCategorySatisfied ,isPriceSatisfied, isColorSatisfied , isbrandSatisfied)
        return isCategorySatisfied && isColorSatisfied && isPriceSatisfied && isbrandSatisfied
    }

    let clearFilter = () => {
        setFilterValue({category:'',color:'',price:'',brand:''});
        document.getElementById('category').value =""
        document.getElementById('color').value =""
        document.getElementById('price').value =""
        document.getElementById('brand').value =""
    }
    
    return (
        <div>
            <nav class="navbar navbar-light bg-dark">
                <span className='navContent' >Products</span>
                <div class='rightAlign'>
                <Link className='btn btn-success' to={{ pathname: '/cart'}}>Go to Cart &nbsp;
                    {store.getState().cartData.length> 0 && <span class="badge badge-danger">{store.getState().cartData.length}</span> }
                    </Link>
                </div>
            </nav>
            <br/>
            <div class="input-group mb-3">
            
                <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="fa fa-search"></i></span>
                </div>
                    <input type="text" 
                        class="form-control" 
                        placeholder="Search for Products" 
                        onChange={(e) => updateSearchedValue(e.target.value)}
                    />
            </div>
            <div style={{display:"flex",width:'100%'}} >
                &nbsp;
                <span style={{width:'7%',fontStyle:'italic',fontWeight:'bold',fontSize:'23px'}} ><i><u>Filter :</u></i></span>
                <select style={{width:'15%'}} id="category" class="form-control">
                    <option value='' selected>Category...</option>
                    <option value='Shoes' >Shoes</option>
                    <option value='Watches' >Watches</option>
                    <option value='Mobiles' >Mobiles</option>
                    <option value='Laptops' >Laptops</option>
                    <option value='Clothings' >clothings</option>
                </select> &nbsp; &nbsp;&nbsp; &nbsp;
                <select style={{width:'15%'}} id="color" class="form-control">
                    <option value='' selected>Color...</option>
                    <option value='White' >White</option>
                    <option value='Black' >Black</option>
                    <option value='Blue' >Blue</option>
                </select> &nbsp; &nbsp;&nbsp; &nbsp;
                <select style={{width:'15%'}} id="price" class="form-control">
                    <option value='' selected>Price...</option>
                    <option value='1000' >Less than 1000</option>
                    <option value='50000' >Less than 50,000</option>
                    <option value='100000' >Less than 1 Lakh</option>
                </select> &nbsp; &nbsp;&nbsp; &nbsp;
                <select style={{width:'15%'}} id="brand" class="form-control">
                    <option value='' selected>Brand...</option>
                    <option value='Adidas' >Adidas</option>
                    <option value='Puma' >Puma</option>
                    <option value='Fastrack' >Fastrack</option>
                    <option value='HP' >HP</option>
                    <option value='Apple' >Apple</option>
                </select> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; 
                <div style={{float:'right'}} >
                    <button class='btn btn-primary' onClick={applyFilter} >Apply</button> &nbsp;
                    <button class='btn btn-danger' onClick={clearFilter} >Clear Filter</button>
                </div>
            </div>
            <div className='productDisplayLayout'>
                {ProductList.filter(searchingFor(searchedValue,filterValue) ).map((data,index) =>{
                    if(checkFilterForObject(data)){
                        return(
                            <>
                                <div className='cardStyle'>
                                    <div style={{
                                        width: '200px',
                                        height: '200px',
                                    }}>
                                        <img src={data.image}  class="card-img-top" alt="..."/>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title cardTitleStyle">{data.productName}</h5>
                                        <div class='flex'>
                                            <p class='cardPriceStyle'>Price : </p> &nbsp;
                                            <p class="card-text">{data.price} /-</p>
                                        </div>
                                        <div class='flex'>
                                            {!store.getState().cartData.includes(data)
                                            ? 
                                            <div>
                                                <button id='buttonFontSize' className='btn btn-primary' onClick={() => handleCart(data)} >Add to Cart</button> &nbsp;
                                            </div>
                                            :
                                            <div>
                                                <button id='buttonFontSize' className='btn btn-danger' onClick={() => removeFromCart(data)} >Remove</button> &nbsp; 
                                            </div>
                                        }
                                            <button id='buttonFontSize' className='btn btn-secondary' >More details</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                })}
            </div>
        </div>
    )   
}

const mapStateToProps = state => ({
    cartData : state.cartData
})

export default connect()(Products)