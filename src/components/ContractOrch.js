import React from "react";

import ShowContracts from "./ShowContracts";

class ContractOrch extends React.Component {
  state = { lengthKey:null, createContractId:null};




  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Factory;
    var lengthKey;
      
    lengthKey = contract.methods["getLength"].cacheCall();
      

    this.setState({ lengthKey });
    console.log(drizzle);
    console.log(this.props.drizzleState);

  }

  createContract = e => {
    if(e) e.preventDefault();
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Factory;
    const item = String(document.getElementById("createContract").value);

    const createContractId = contract.methods["createItem"].cacheSend(item, {
      from: drizzleState.accounts[0], gas: 4712388,
        gasPrice: 100000000000
    });

  
    // save the `createConId` for later reference
    this.setState({ createContractId});
     
   };

  render() {

    const { drizzleState } = this.props;
    const contract = drizzleState.contracts.Factory;
    var adressesLength = contract.getLength[this.state.lengthKey];
    
  
    return (
      <div>
        <h2>Se han creado {(adressesLength && adressesLength.value) || 0} contratos.</h2>
        <form onSubmit={this.createContract.bind(this)}>
            <input id="createContract" type="text" name="newContract" style={{width:"300px"}} ref={(element) => { this.input = element }} placeholder="Item inicial al crear contrato"/>
            <input type="submit" value="Crear nuevo contrato"/> 
        </form>
        <ShowContracts length={(adressesLength && adressesLength.value) || 0} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>
      </div>
    );
  }
}

export default ContractOrch;