import React from "react";

class ReadItems extends React.Component {



	state = { dataKey: null, dataL: null};

	componentDidMount() {
		const { drizzle } = this.props;
		const contract = drizzle.contracts.Factory;
		var dataKey = [];
		var dataL;
    	// let drizzle know we want to watch the `myString` method
    	dataL = contract.methods["l"].cacheCall();
    	

    	// dataKey[0] = contract.methods["items"].cacheCall(0);
    	// dataKey[1] = contract.methods["items"].cacheCall(1);
    	// dataKey[2] = contract.methods["items"].cacheCall(2);
    	// dataKey[3] = contract.methods["items"].cacheCall(3);
    	// dataKey[4] = contract.methods["items"].cacheCall(4);
		for (let i = 0; i < 10; i++) {
    		if (contract.methods["items"].cacheCall(i) != undefined){
    			dataKey[i] = contract.methods["items"].cacheCall(i);
    		}
    	}
    	
    	// save the `dataKey` to local component state for later reference
    	this.setState({ dataKey, dataL });
    	console.log(this.props.drizzleState.contracts.Factory.items && this.props.drizzleState.contracts.Factory.items[this.state.dataKey && this.state.dataKey[1]]);
    	console.log(drizzle);
    	console.log(this.props.drizzleState);

	}


	render() {
    	// get the contract state from drizzleState
    	const { Factory } = this.props.drizzleState.contracts;
    	// using the saved `dataKey`, get the variable we're interested in
    	const l = Factory.l[this.state.dataL];
    	const long = l && l.value;
    	var myStrings = [];;
    	for (let i = 0; i < long; i++) {
    		myStrings[i] = Factory.items[this.state.dataKey && this.state.dataKey[i]];
    	}
   
    	var items = myStrings.map((x, i) => {
    		return (<li>{i}:{x && x.value}</li>);
    	});

    	

    	// if it exists, then we display its value
    	return (<div><p>My stored strings:</p> <ul>{items}</ul></div>) ;
    	
		}
}

export default ReadItems;