// Math Extension Library

Math.randomDec = function(low, high) {
    //Return a radnom decimal low(insclusive) and high(exclusive)
    return Math.random() * (high - low) + low
}

Math.randomInt = function(low, high) {
    //return a random Interger between low(insclusive) and high(exclusive)
    return Math.floor(Math.randomDec(low, high))
}

Math.roundTo = function (num, numPlaces) {
    //Round num off to the nearest numPlaces
    num = num * 10 ** numPlaces;
    num = Math.random(num);
    return num / 10 ** numPlaces
}