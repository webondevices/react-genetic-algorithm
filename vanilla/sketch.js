var target;
var popmax;
var mutationRate;
var population;

var running = true;

function setup() {
    target = 'Hello Web on Devices';
    mutationRate = 0.01;
    popmax = 300;

    // Create a population with a target phrase, mutation rate, and population max
    population = new Population(target, mutationRate, popmax);

    // Initialise first generation
    draw();
}

function draw() {

    // Generate weighed mating pool with the fittest members
    population.naturalSelection();

    // Generate new population of offsprings from parents in the mating pool
    population.generate();

    // Calculate fitness of the new population
    population.calcFitness();

    // Find the fittest member of the population and see if target is reached
    population.evaluate();

    // If target phrase is found, stop
    if (population.isFinished()) running = false;

    // Display best result so far
    displayInfo();

    // Loop and start new generation
    if (running) window.requestAnimationFrame(draw);
}

function displayInfo() {
    var answer = population.getBest();
    var element = document.getElementById('result');

    element.innerHTML = answer;
}

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function randomInt(min, max) {
    return Math.floor( Math.random() * (max - min + 1) + min );
}

function newChar() {
    var c = randomInt(63, 122 - 1);
    
    if (c === 63) c = 32;
    if (c === 64) c = 46;

    return String.fromCharCode(c);
}

window.onload = setup;
