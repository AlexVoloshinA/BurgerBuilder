import React, { Component } from "react";
import Auxxxxx from "../../hoc/Auxxxxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorhandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';



class BuilderBuilder extends Component {
  state = {
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    // axios
    //   .get("https://burger-builder-c8d97.firebaseio.com/ingredients.json")
    //   .then(res => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch(err => console.log(err));
  }

  updatePurchaseState = updatedIngredients => {
    const ingredients = {
      ...updatedIngredients
    };
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return  sum > 0 ;
  };

 

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {

    this.props.history.push('/checkout');
    
  };

  render() {
    const disableInfo = {
      ...this.props.ings
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
  
    let burger = <Spinner />;

    if (this.props.ings) {
      burger = (
        <Auxxxxx>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ordered={this.purchaseHandler}
            price={this.props.ttlPrice}
            disabled={disableInfo}
            removeIngredient={this.props.onIngredientRemoved}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ingredientAdded={this.props.onIngredientAdded}
          />
        </Auxxxxx>
    );
      orderSummary = (
        <OrderSummary
          price={this.props.ttlPrice.toFixed(2)}
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCancel={this.purchaseCancelHandler}
          ingredients={this.props.ings}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Auxxxxx>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxxxxx>
    );
  }
}

const mapStatetoProps = state => {
  return {
    ings: state.ingredients,
    ttlPrice: state.totalPrice
  };
}

const mapDispatchToProps = dispatch => {
    return {
      onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
      onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    }
};

export default connect(mapStatetoProps,mapDispatchToProps)(withErrorhandler(BuilderBuilder, axios));
