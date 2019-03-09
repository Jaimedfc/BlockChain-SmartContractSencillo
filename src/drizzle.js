import { Drizzle, generateStore } from "drizzle";

import Factory from './contracts/Factory.json';

const options = {

	contracts: [ Factory ],
	web3: {
		fallback: {
			type: "ws",
			url: "ws://127.0.0.1:7545"
		}
	}
};

const drizzleStore = generateStore(options);

const drizzle = new Drizzle(options, drizzleStore);

export default drizzle;