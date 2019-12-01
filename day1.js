const fs = require('fs');
const path = "./day1.txt";

const fileContents = fs.readFileSync(path, 'utf8');
const arrayOfModuleMasses = fileContents.split('\n');

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const calculateFuelForMass = (mass) => {
  if (typeof mass === 'string') { mass = parseInt(mass, 10); }
  return Math.floor(mass / 3) - 2;
};

const calculateAdditionalFuel = (originalFuelMass) => {
  let arrayOfAdditionalFuel = [];
  let additionalFuel = calculateFuelForMass(originalFuelMass);
  
  while (additionalFuel > 0) {
    arrayOfAdditionalFuel.push(additionalFuel);
    additionalFuel = calculateFuelForMass(additionalFuel);
  }
  
  return arrayOfAdditionalFuel;
};

const calculateFuelForModules = (array) => {
  const fuelArrayFromFile = array.map(massString => {
    return calculateFuelForMass(massString);
  });
  
  return fuelArrayFromFile;
};

const calculateFuelForFuel = (fuelForModules) => {
  let fuelArray = [];
  
  fuelForModules.forEach(fuelForModule => {
    let additionalFuelNeeded = calculateAdditionalFuel(fuelForModule);
    let fuelForModuleAndFuel = [fuelForModule].concat(additionalFuelNeeded);
    fuelArray.push(fuelForModuleAndFuel);
  });
  
  let arrayOfFuelTotals = fuelArray.map(arrayPerModule => {
    return arrayPerModule.reduce(reducer);
  });
  
  return arrayOfFuelTotals;
};

const part1 = (arrayOfModuleMasses) => {
  const arrayOfFuelNeededForModules = calculateFuelForModules(arrayOfModuleMasses);
  return arrayOfFuelNeededForModules.reduce(reducer);
};

const part2 = (arrayOfModuleMasses) => {
  const arrayOfFuelNeededForModules = calculateFuelForModules(arrayOfModuleMasses);
  const arrayOfFuelTotals = calculateFuelForFuel(arrayOfFuelNeededForModules);
  return arrayOfFuelTotals.reduce(reducer);
};

console.log(part1(arrayOfModuleMasses));
console.log(part2(arrayOfModuleMasses));
