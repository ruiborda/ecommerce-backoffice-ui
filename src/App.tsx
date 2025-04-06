import type {Component} from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import {Dashboard} from "./components/Dashboard";

const App: Component = () => {
    return (
        <Dashboard >
            hell world of app
        </Dashboard>
    );
};

export default App;
