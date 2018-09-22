import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    adress: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Alex Vol",
        adress: {
          street: "Testtest",
          zipCode: "34343",
          country: "Russia"
        },
        email: "avl@test.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
           this.setState({ loading: false});
           this.props.history.push('/');
       })
      .catch(err => this.setState({ loading: false }));
  };
  render() {
    let form = (
        <form>
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Your street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Your postal Code"
        />
        <Button clicked={this.orderHandler} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if(this.state.loading) {
        form = <Spinner/>
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
