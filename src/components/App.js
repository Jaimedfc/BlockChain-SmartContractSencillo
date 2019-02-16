import React from 'react';

import {DrizzleContext} from 'drizzle-react';

import ReadItems from './ReadItems';
import SetString from "./SetString";

class App extends React.Component {


	state = { loading: true, drizzleState: null};

	componentDidMount() {
 		 const { drizzle } = this.props;

 		 // subscribe to changes in the store
  		this.unsubscribe = drizzle.store.subscribe(() => {

    		// every time the store updates, grab the state from drizzle
    		const drizzleState = drizzle.store.getState();

    		// check to see if it's ready, if so, update local component state
    		if (drizzleState.drizzleStatus.initialized) {
      			this.setState({ loading: false, drizzleState });
    		}
  		});
	}

	componentWillUnmount() {
 		 this.unsubscribe();
	}


 	render() {

 		if (this.state.loading) return "Loading Drizzle...";
  		return (
  			<div className="App">
  				<ReadItems drizzle={this.props.drizzle} drizzleState={this.state.drizzleState}/>
  				<SetString drizzle={this.props.drizzle} drizzleState={this.state.drizzleState}/>
  			</div>);
 	}
}

export default App;