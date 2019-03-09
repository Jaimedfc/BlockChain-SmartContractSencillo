import React from "react";

class ItemContract extends React.Component {


state = { goodKey: null,
            setGoodId: null
          };


    componentDidMount() {

        console.log("==== COMPONENTE ItemContract MONTADO ============", this.props.address );

        const { drizzle } = this.props;

        const json = require('../contracts/Item.json');

          const contractConfig = {
             contractName: this.props.address,
             web3Contract: new drizzle.web3.eth.Contract(json.abi, this.props.address)
          };

          drizzle.addContract(contractConfig, []);
    }


    componentDidUpdate(prevProps, prevState, snapshoot) {

        const { drizzle } = this.props;

        const factory = drizzle.contracts.Factory;
        const instance = drizzle.contracts[this.props.address];

        if (!instance) return;

        let changed = false;

        let { goodKey } = this.state;

        if (!this.state.goodKey) {
            // Decirle a drizzle que queremos observar el metodo getState().
            //goodKey = instance.methods["good"].cacheCall();

            goodKey = factory.methods["getItem"].cacheCall(this.props.address);
            changed = true;
        }


        if (changed) {
            // Actualizar el estado local
            this.setState({ goodKey });
        }
    }

    changeItem = e => {
        if(e) e.preventDefault();
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Factory;
        const id = "modifContract"+ this.props.index;
        const item = String(document.getElementById(id).value);
        
        const setGoodId = contract.methods["setItem"].cacheSend(item,this.props.address, {
             from: drizzleState.accounts[0]
         });
          
            
        this.setState({ setGoodId });
        
        
    };


    render() {

      let item = "Waiting";

        // Obtener el estado del contrato desde drizzleState
        const factory = this.props.drizzleState.contracts.Factory;
        const instance = this.props.drizzleState.contracts[this.props.address];
        
      if (instance && instance.initialized) {


          // Usamos el resultado del metodo "getState()" usando la clave
          // `stateKey` guardada en el estado local del componente.
          item = factory.getItem[this.state.goodKey];
          //item = instance.good[this.state.goodKey];
          item = (item && item.value) || "??";


      }

        return (
          <div>

            <h1>{"Item número "+(this.props.index + 1)+": "+this.props.address}</h1>
            <h2>Su valor es: {item}</h2>


            <form onSubmit={this.changeItem.bind(this)}>
                <input type="text" id={"modifContract"+this.props.index} name="newGood" style={{width:"300px"}} ref={(element) => { this.input = element }} placeholder="Cambiar valor del contrato creado" />
                <input type="submit" value="Cambiar valor"/> 
            </form>

          </div>
        );
    }
};

export default ItemContract;