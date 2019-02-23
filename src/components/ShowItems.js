import React from "react";

class ShowItems extends React.Component {



	state = { dataKey: []};

	componentDidUpdate(prevProps, prevState, snapshot) {
		
        const l1 = prevProps.long || 0;
        const l2 = this.props.long;
        const { drizzle } = this.props;
        const contract = drizzle.contracts.Factory;
        var dataKey = this.state.dataKey;
        if (l1 < l2) {
            for (var i=l1; i<l2; i++){
                dataKey[i] = contract.methods["items"].cacheCall(i);
            }
            this.setState({ dataKey });
    	}
    	
    	
	}


	render() {
    	// get the contract state from drizzleState
    	const { Factory } = this.props.drizzleState.contracts;
    	// using the saved `dataKey`, get the variable we're interested in
    	var myStrings = [];;
    	for (let i = 0; i < this.props.long; i++) {
    		myStrings[i] = Factory.items[this.state.dataKey && this.state.dataKey[i]];
    	}
   
    	var items = myStrings.map((x, i) => {
    		return (<li key={i}>{i}:{x && x.value}</li>);
    	});

    	

    	// if it exists, then we display its value
    	return (<ul>{items}</ul>) ;
    	
		}
}

export default ShowItems;