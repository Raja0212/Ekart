import React, { Component } from 'react'
import { BrowserRouter as Router , Route  , Switch } from 'react-router-dom'
import Login from './login/login'
import Products from './products/products'
import Cart from './cart/Cart'

export class Routing extends Component {
    render() {  
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/"><Login/></Route>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/products" component={Products} store={this.props.store} />
                        <Route exact path="/cart/:name" component={Cart} store={this.props.store} />
                        <Route exact path="/cart" component={Cart} store={this.props.store} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Routing