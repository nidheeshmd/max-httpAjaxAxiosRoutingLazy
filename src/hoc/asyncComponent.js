/*this hoc is used to implement Lazy loading. That is only the required code is downloaded when the app loaded. Other other part is download when the required pages load*/

import React, {Component} from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component{
        state ={
            Component:null
        }

        componentDidMount(){
            importComponent()
            .then(cmp => {
                this.setState({component: cmp.default});
            })
        }

        render(){
            const ThisComponent = this.state.component;

            return ThisComponent ? <ThisComponent {...this.props} /> : null;
        }
    };
};

export default asyncComponent;