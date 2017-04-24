import DNA from './DNA.js';
import util from './util.js';

class Population {
    constructor(t, m, populationSize) {
        this.target = t;
        this.mutationRate = m;
        this.generations = 0;
        this.perfectScore = 1;
        this.finished = false;
        this.matingPool = [];
        this.best = '';

        // Fill population with DNA instances
        this.population = Array(populationSize).fill(null);
        this.population = this.population.map(() => new DNA(this.target.length));

        this.calcPopulationFitness();
    }

    // Calculate fitness value for every member of the population
    calcPopulationFitness() {
        this.population.forEach(member => {
            member.calcFitness(this.target);
        });
    }

    // Generate a weighed mating pool
    naturalSelection() {
        let maxFitness = 0;
    
        this.matingPool = [];

        // Find the highest fitness value in the population
        this.population.forEach(member => {
            maxFitness = member.fitness > maxFitness ? member.fitness : maxFitness;
        });

        // Based on fitness, each member is added to the mating pool a weighed number of times
        // higher fitness = more instance in pool = more likely to be picked as a parent
        // lower fitness = less instance in pool = less likely to be picked as a parent
        this.population.forEach(member => {
            const fitness = util.map(member.fitness, 0, maxFitness, 0, 1);
            
            // Arbitrary multiplier
            let n = Math.floor(fitness * 50);
            for ( ; n >= 0; n--) {
                this.matingPool.push(member);
            }
        });
    }

    // Create a new generation
    generate() {

        this.population.forEach((member, i) => {

            // Random index for the pool
            const a = util.randomInt(0, this.matingPool.length - 1);
            const b = util.randomInt(0, this.matingPool.length - 1);

            // Picking a random item from the pool
            const partnerA = this.matingPool[a];
            const partnerB = this.matingPool[b];

            // Generating a child with DNA crossover
            const child = partnerA.crossover(partnerB);

            // Mutate DNA for diversity
            child.mutate(this.mutationRate);

            // Add child to the population
            this.population[i] = child;

        });

        this.generations += 1;
    }


    getBest() {
        return this.best;
    }

    evaluate() {
        let worldrecord = 0.0;
        let index = 0;

        // Find the fittest member of the population
        this.population.forEach((member, i) => {
            if (member.fitness > worldrecord) {
                index = i;
                worldrecord = member.fitness;
            }
        });

        // Get best result so far
        this.best = this.population[index].getPhrase();

        // Stop simulation if found result
        if (worldrecord === this.perfectScore) this.finished = true;
    }

    isFinished() {
        return this.finished;
    }

    getGenerations() {
        return this.generations;
    }

    // Get average fitness for the population
    getAverageFitness() {
        let total = 0;

        this.population.forEach(member => {
            total += member.fitness;
        });

        return total / this.population.length;
    }
}

export default Population;