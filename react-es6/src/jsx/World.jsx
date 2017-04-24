import React from 'react';
import Population from './Population.js';

class World extends React.Component {

    constructor() {
        super();

        this.state = {
            result: ''
        };

        // Simulation settings
        this.targetPhrase = 'Hello Web on Devices';
        this.mutationRate = 0.01;
        this.populationSize = 300;

        this.running = true;

        // Initialise population
        this.population = new Population(this.targetPhrase, this.mutationRate, this.populationSize);

        this.draw = this.draw.bind(this);
    }

    componentDidMount(){

        // Start simulation
        this.draw();
    }

    draw() {

        // Generate weighed mating pool with the fittest members
        this.population.naturalSelection();

        // Generate new population of children from parents in the mating pool
        this.population.generate();

        // Calculate fitness score of the new population
        this.population.calcPopulationFitness();

        // Find the fittest member of the population and see if target is reached
        this.population.evaluate();

        // If target phrase is found, stop
        if (this.population.isFinished()) this.running = false;

        // Display best result so far
        this.setState({result: this.population.getBest()});

        // Loop and start new generation
        if (this.running) window.requestAnimationFrame(this.draw);
    }

    render() {
        const myStyle = this.running ? {backgroundColor: 'red'} : {backgroundColor: 'green'};

        return (
            <div style={myStyle} className="result">
                { this.state.result }
            </div>
        );
    }
}

export default World;