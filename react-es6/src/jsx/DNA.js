import util from './util.js';

class DNA {
    constructor(num){

        // The genetic sequence
        this.genes = [];
        this.fitness = 0;
        
        // Random DNA generated from characters
        this.genes = Array(num).fill(null);
        this.genes = this.genes.map(() => util.newChar());
    }

    // Converts character array to a String
    getPhrase() {
        return this.genes.join('');
    }

    // Fitness function (returns floating point % of "correct" characters)
    calcFitness(target) {
        let score = 0;

        this.genes.forEach((gene, i) => {
            if (gene === target.charAt(i)) score += 1;
        });

        this.fitness = score / target.length;
    }

    // Cross DNA with partner to produce child
    crossover(partner) {
        
        // Initialise new child
        const child = new DNA(this.genes.length);
        const midpoint = util.randomInt(0, this.genes.length - 1);

        // Cross DNA from two parents from each side of midpoint
        this.genes.forEach((gene, i) => {

            if (i > midpoint) {
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = partner.genes[i];
            }
        });
        
        return child;
    }

    // picks a new random character based on a mutation probability
    mutate(mutationRate) {
        this.genes.forEach((gene, i) => {

            if (Math.random(0, 1) < mutationRate) {
                this.genes[i] = util.newChar();
            }
        });
    }
}

export default DNA;