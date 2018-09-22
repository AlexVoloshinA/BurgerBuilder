import React, { Component } from "react";
import Auxxxxx from "../../hoc/Auxxxxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorhandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BuilderBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    axios
      .get("https://burger-builder-c8d97.firebaseio.com/ingredients.json")
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(err => console.log(err));
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
    this.setState({ purchaseable: sum > 0 });
  };

  addIngredienthandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredienthandler = type => {
    const oldCount = this.state.ingredients[type];
    let updatedCount = oldCount - 1;
    if (updatedCount < 0) {
      updatedCount = 0;
    }
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceRemovings = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceRemovings;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
    //alert('You continue!');
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Alex Vol",
    //     adress: {
    //       street: "Testtest",
    //       zipCode: "34343",
    //       country: "Russia"
    //     },
    //     email: "avl@test.com"
    //   },
    //   deliveryMethod: "fastest"
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(res => this.setState({ loading: false, purchasing: false }))
    //   .catch(err => this.setState({ loading: false, purchasing: false }));
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
  
    let burger = <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Auxxxxx>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
            disabled={disableInfo}
            removeIngredient={this.removeIngredienthandler}
            purchasable={this.state.purchaseable}
            ingredientAdded={this.addIngredienthandler}
          />
        </Auxxxxx>
    );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice.toFixed(2)}
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCancel={this.purchaseCancelHandler}
          ingredients={this.state.ingredients}
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

export default withErrorhandler(BuilderBuilder, axios);
