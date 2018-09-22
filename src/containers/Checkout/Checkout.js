import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    };

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        //console.log(query);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];

            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedhandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {


        return (
            <div>
                <CheckoutSummary onCheckoutContinued={this.checkoutContinuedhandler} onCheckoutCancelled={this.checkoutCancelledHandler} ingredients={this.state.ingredients}/>
                <Route render={(props) => (<ContactData {...props} price={this.state.totalPrice} ingredients={this.state.ingredients}/>)} path={this.props.match.path + '/contact-data'}/>
            </div>

        );
    };
}

export default Checkout;