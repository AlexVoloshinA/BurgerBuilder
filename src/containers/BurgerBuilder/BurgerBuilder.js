import React, { Component } from 'react';
import Auxxxxx from '../../hoc/Auxxxxx';
import Burger from '../../components/Burger/Burger';

class BuilderBuilder extends Component {
    state = {  

    }
    render() { 
        return ( 
           <Auxxxxx>
               <Burger/>
               <div>Build Controls</div>
           </Auxxxxx>
        );
    }
}
 
export default BuilderBuilder;