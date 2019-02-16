import React from 'react';
import PropTypes from 'prop-types';
import Updating from './Info';
import Error from './Info';
import SetControl from './Button';


class AppControl extends React.Component {
	
	state = { stackId: null };

	set = () => {

		const {drizzle, drizzleState } = this.props;

		const instance = drizzle.contracts.Factory;
		const stackId = instance.methods.set.cacheSend({
			from: drizzleState.accounts[0]
		});

		this.setState({stackId});
	}

	getTxInfo = () => {

		if (this.state.stackId === null) return {status: null, error: null};;

		const { transactions, transactionStack } =this.props.drizzleState;

		const txHash = transactionStack[this.state.stackId];

		if (!txHash) return {status: "Pendiente de envio", error: null};

		return { status: transactions[txHash].status,
 			error: transactions[txHash].error};
	}

	render() {

		const {status, error} = this.getTxInfo();
		const errorMsg = error ? `${error.message || error}` : "";

		return (

			<div className="appFactory-control">
				<SetControl className="appFactory-control-set"
							text="SET"
							onClick={this.set}
							disabled={status === 'pending'} />
				<Updating className="appFactory-control-updating"
							msg={status}
							visible={true} />

				<Error className="appFactory-control-error"
							msg={errorMsg}
							visible={!!error} />

			</div>
		)
	}
}

export default AppControl;