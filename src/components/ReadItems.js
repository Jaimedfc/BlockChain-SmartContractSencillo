import React from "react";
import ShowItems from "./ShowItems";

class ReadItems extends React.Component {



	state = { dataL: null};

	componentDidMount() {
		const { drizzle } = this.props;
		const contract = drizzle.contracts.Factory;
		var dataL;
    	// let drizzle know we want to watch the `long` method
    	dataL = contract.methods["long"].cacheCall();
    	

    	
    	// save the `dataL` to local component state for later reference
    	this.setState({ dataL });
    	console.log(drizzle);
    	console.log(this.props.drizzleState);

	}


	render() {
    	// get the contract state from drizzleState
    	const { Factory } = this.props.drizzleState.contracts;
    	// using the saved `dataL`, get the variable we're interested in
    	const l = Factory.long[this.state.dataL];
    	const long = l && l.value;

    	return (<div><h1>My stored strings:</h1>
    			 <ShowItems long={long} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/></div>) ;
    	
		}
}

export default ReadItems;