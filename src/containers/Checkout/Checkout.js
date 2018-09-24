import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {


    

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedhandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {


        return (
            <div>
                <CheckoutSummary onCheckoutContinued={this.checkoutContinuedhandler} onCheckoutCancelled={this.checkoutCancelledHandler} ingredients={this.props.ings}/>
                <Route component={ContactData} price={this.props.price} ingredients={this.props.ings}/>)} path={this.props.match.path + '/contact-data'}/>
            </div>

        );
    };
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);