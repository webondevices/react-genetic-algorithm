// DNA constructor, generates random DNA
function DNA(num) {

    // The genetic sequence
    this.genes = [];
    this.fitness = 0;
    
    // Random DNA generated from characters
    for (var i = 0; i < num; i++) {
        this.genes[i] = newChar();
    }

    // Converts character array to a String
    this.getPhrase = function() {
        return this.genes.join("");
    }

    // Fitness function (returns floating point % of "correct" characters)
    this.calcFitness = function(target) {
        var score = 0;
        
        for (var i = 0; i < this.genes.length; i++) {

            if (this.genes[i] == target.charAt(i)) {
                score++;
            }
        }

        this.fitness = score / target.length;
    }

    // Cross to members
    this.crossover = function(partner) {
        
        // A new child
        var child = new DNA(this.genes.length);
        var midpoint = randomInt(0,this.genes.length - 1);

        // Half from one, half from the other
        for (var i = 0; i < this.genes.length; i++) {

            if (i > midpoint) {
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = partner.genes[i];
            }
        }
        
        return child;
    }

    // picks a new random character based on a mutation probability
    this.mutate = function(mutationRate) {

        for (var i = 0; i < this.genes.length; i++) {

            if (Math.random(0, 1) < mutationRate) {
                this.genes[i] = newChar();
            }
        }
    }
}
