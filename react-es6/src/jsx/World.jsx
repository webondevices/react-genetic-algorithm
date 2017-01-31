import React from 'react';
import Population from './Population.js';

class World extends React.Component {

    constructor() {
        super();

        this.state = {
            result: ''
        };

        // Simulation settings
        this._targetPhrase = 'Hello Web on Devices';
        this._mutationRate = 0.01;
        this._populationSize = 300;

        this._running = true;

        // Initialise population
        this._population = new Population(this._targetPhrase, this._mutationRate, this._populationSize);

        this._draw = this._draw.bind(this);
    }

    componentDidMount(){

        // Start simulation
        this._draw();
    }

    _draw() {

        // Generate weighed mating pool with the fittest members
        this._population.naturalSelection();

        // Generate new population of children from parents in the mating pool
        this._population.generate();

        // Calculate fitness score of the new population
        this._population.calcPopulationFitness();

        // Find the fittest member of the population and see if target is reached
        this._population.evaluate();

        // If target phrase is found, stop
        if (this._population.isFinished()) this._running = false;

        // Display best result so far
        this.setState({result: this._population.getBest()});

        // Loop and start new generation
        if (this._running) window.requestAnimationFrame(this._draw);
    }

    render() {
        const myStyle = this._running ? {backgroundColor: 'red'} : {backgroundColor: 'green'};

        return (
            <div style={myStyle} className="result">
                { this.state.result }
            </div>
        );
    }
}

export default World;