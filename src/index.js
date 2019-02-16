import React from 'react';
import ReactDom from 'react-dom';

import "./css/style.css";

import App from './components/App';

import drizzle from "./drizzle";

import {DrizzleContext} from "drizzle-react";

ReactDom.render(<App drizzle={drizzle} />,
	 document.getElementById("root")
);