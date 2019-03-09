import React from "react";
import ItemContract from "./ItemContract";

class ShowContracts extends React.Component {



	state = { addressKey: []};

	componentDidUpdate(prevProps, prevState, snapshot) {
		
        const l1 = prevProps.length || 0;
        const l2 = +this.props.length;
        const { drizzle } = this.props;
        const contract = drizzle.contracts.Factory;
        var addressKey = [...this.state.addressKey];

        let changed = false;
        console.log(l1,l2);
            for (var i=0; i<l2; i++){

                if (addressKey[i]) continue;

                changed = true;
                addressKey[i] = contract.methods["addrs"].cacheCall(i);
            }
            changed && this.setState({ addressKey });
    	
    
	}


	render() {
    	// get the contract state from drizzleState
    	const { Factory } = this.props.drizzleState.contracts;
    	// using the saved `dataKey`, get the variable we're interested in
    	var myAddresses = [];
    	for (let i = 0; i < this.props.length; i++) {
            if (this.state.addressKey) {


    		  myAddresses[i] = Factory.addrs[this.state.addressKey[i]];
            }
    	}
   
    	var components = myAddresses.map((x, i) => {
            if ((x && x.value) !== undefined){
    		  return (<ItemContract key={i} address={x.value} index={i} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>);
            }else return null;
    	});

    	return (components) ;
    	
		}
}

export default ShowContracts;