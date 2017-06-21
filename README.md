# React.js Genetic Algorithm Boilerplate

## What is a Genetic Algorithm?

Genetic Algorithms apply principles from biological evolution to find solutions to problems with no human input.

## What are the principles this algorithm inherits from nature?
What are the core principles of Darwinian evolution that are applied in these algorithms? In order for natural selection to work like in Nature, all three of the below has to happen:

 - *Heredity*: Creatures pass down their genetic information to their offsprings in the next generation if they live long enough to be able to reproduce. 
 
 - *Variation*: Variety must be present when heredity happens. If all creatures are exactly the same then with no variation the species can't evolve. Variation normally happens with the mutation of the genetic information.

 - *Selection*: Successful members of the population become parents and pass down their genetic information, unsuccessful ones die without offsprings. This is what we normally refer to as “survival of the fittest.” This natural selection is what allows a species to evolve and each generation to be more successful than their parents.
 
## How can this be translated to a computer algorithm?

You first have to start by defining your goal. This goal needs to be measurable and easily comperable to the performance and efficiency of each member of our population. Members in the population represent the potential solution to the problem.

In the first generation the population is filled with members (solutions) that are completely random but even in this completely random pool there is a few who, by pure luck and chance, perform better than the others (fittest). At the end of the gnereation the fittest (best performing) variations are selected to become the parents of the new generation.

Through multiple selections and generations the solutions will become better and better until we eventually reach our goal with no human input.

## What is the actual problem solved in the boilerplate?

The goal of the example Genetic Algorith project found in this repository is to find the string: "Hello Web on Devices".

Each member in the population of the first generation is a random string with the same length as our target string. This is essentially the DNA of the member that is going to be passed down from each parent.

There is also a compare function that gives a fitness score to each member to dicide how far are they from the goal. In our case this just a function that counts the matching characters between the target string and the DNA of the member. This score will help us select the parents for the new generation.

When two members reproduce to create an offsrpuns they essentially combine their genetic information (DNA) which in this case means randomly mixing the DNA string from each parent.

After a couple of dozens of generations, the members in the generation will come closer and closer to the goal and eventually one of them will actually reach it.

## How all this is implemented in React.js?

THere are two key classes to support our genetic algorithm: DNA and Population. Each member of the population is a new instance of the DNA class since that's its defininf property. The DNA class provides methods like crossOver, mutate and calcFitness to support the reproduction mechanism. On the other hand the Population class deals with the higher level logic dealing with natural selection, generating new population and evaluation the fitness of its members.

The `<World/>` React component is the entry point for the whole algorithm. There's only one state which shows the solution from the currently best solution from all the members. The constructor of the component also exposes some settings for the algorithm:
```
// Simulation settings
this.targetPhrase = 'Hello Web on Devices';
this.mutationRate = 0.01;
this.populationSize = 300;
```

This is also the place where the population class is initialised with the settings:
```
this.population = new Population(this.targetPhrase, this.mutationRate, this.populationSize);
```

When the component is mounted we call the `draw()` method which recursively calls itself using `requestAnimationFrame()`. The `draw()` method is where most of the things happen:
```
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
```

Then in the render function you can use the state to display the result as you wish.

## What else is this good for?

The boilerplate is universal which means the underlying principle can be used to any problems where you can:
 - Define the goal with a function that can calculate the fitness score of each member
 - Define the DNA of each member that drives their behavior towards the solution
 
WHen you have these two defined then all you need to do is let the computer workout the logic.

## Can I see some examples?
If you still find it difficult to imagin what can Genetic ALgorithms do on their own have a look at these inspiring examples:
 - https://www.youtube.com/watch?v=qv6UVOQ0F44
 - https://www.youtube.com/watch?v=bBt0imn77Zg
 - https://www.youtube.com/watch?v=Gl3EjiVlz_4
 - https://www.youtube.com/watch?v=uwz8JzrEwWY
 - https://www.youtube.com/watch?v=8vzTCC-jbwM
 - https://www.youtube.com/watch?v=pgaEE27nsQw

## 
