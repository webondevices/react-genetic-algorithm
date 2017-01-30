import DNA from './DNA.js';
import util from './util.js';

class Population {
	constructor(t, m, populationSize) {
		this._target = t;
		this._mutationRate = m;
        this._generations = 0;
        this._perfectScore = 1;
        this._finished = false;
        this._matingPool = [];
		this._best = '';

        // Fill population with DNA instances
        this._population = Array(populationSize).fill(null);
        this._population = this._population.map(() => new DNA(this._target.length));

		this.calcPopulationFitness();
	}

	// Calculate fitness value for every member of the population
	calcPopulationFitness() {
        this._population.forEach(member => {
            member.calcFitness(this._target);
        });
	}

	// Generate a weighed mating pool
    naturalSelection() {
        let maxFitness = 0;
    
        this._matingPool = [];

        // Find the highest fitness value in the population
        this._population.forEach(member => {
            maxFitness = member.fitness > maxFitness ? member.fitness : maxFitness;
        });

        // Based on fitness, each member is added to the mating pool a weighed number of times
        // higher fitness = more instance in pool = more likely to be picked as a parent
        // lower fitness = less instance in pool = less likely to be picked as a parent
        this._population.forEach(member => {
            const fitness = util.map(member.fitness, 0, maxFitness, 0, 1);
            
            // Arbitrary multiplier
            let n = Math.floor(fitness * 50);
            for ( ; n >= 0; n--) {
                this._matingPool.push(member);
            }
        });
    }

    // Create a new generation
    generate() {

        this._population.forEach((member, i) => {

            // Random index for the pool
            const a = util.randomInt(0, this._matingPool.length - 1);
            const b = util.randomInt(0, this._matingPool.length - 1);

            // Picking a random item from the pool
            const partnerA = this._matingPool[a];
            const partnerB = this._matingPool[b];

            // Generating a child with DNA crossover
            const child = partnerA.crossover(partnerB);

            // Mutate DNA for diversity
            child.mutate(this._mutationRate);

            // Add child to the population
            this._population[i] = child;

        });

        this._generations++;
    }


    getBest() {
        return this._best;
    }

    evaluate() {
        let worldrecord = 0.0;
        let index = 0;

        // Find the fittest member of the population
        this._population.forEach((member, i) => {
            if (member.fitness > worldrecord) {
                index = i;
                worldrecord = member.fitness;
            }
        });

        // Get best result so far
        this._best = this._population[index].getPhrase();

        // Stop simulation if found result
        if (worldrecord === this._perfectScore) {
            this._finished = true;
        }
    }

    isFinished() {
        return this._finished;
    }

    getGenerations() {
        return this._generations;
    }

    // Get average fitness for the population
    getAverageFitness() {
        let total = 0;

        this._population.forEach(member => {
            total += member.fitness;
        });

        return total / this._population.length;
    }
}

export default Population;