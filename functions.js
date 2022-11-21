// getYieldForPlant
const getYieldForPlant = (input, environmentFactors) => {
    const newArray = [];
    if (!environmentFactors){
        return input['crop']['yield'];
    }
    else{
        for (x in environmentFactors){
        newArray.push(((100 + (input['crop']['factor'][x][environmentFactors[x]]) )/100))
    }

    const multiplyWithInitial = newArray.reduce(
    (previousValue, currentValue) => previousValue * currentValue,
    input['crop']['yield']
    );

    return multiplyWithInitial;
    }
}


// getYieldForCrop
const getYieldForCrop = (input, environmentFactors) => {
    return getYieldForPlant(input, environmentFactors)*input['numCrops'];
}


//getTotalYield
const getTotalYield = (crops, environmentFactors) => {
    const arrayOfCrops = crops['crops'];
    const arrayOfYields = [];
    for (z in arrayOfCrops){
        let input = arrayOfCrops[z];
        arrayOfYields.push(getYieldForCrop(input, environmentFactors));
    }
    const addAllYields = arrayOfYields.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
    );
    return addAllYields;
}    


// getCostsForCrop
const getCostsForCrop = input => {
    return input['crop']['cost']*input['numCrops'];
}


//getRevenueForCrop
const getRevenueForCrop = (input, environmentFactors) => {
    return getYieldForCrop(input, environmentFactors)*input['crop']['salePrice'];
}


// getProfitForCrop
const getProfitForCrop = (input, environmentFactors) => {
    return getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input);
}


// getTotalProfit
const getTotalProfit = (crops, environmentalFactors) => {

    const arrayOfCrops = crops['crops'];
    const arrayOfProfits = [];

    for (z in arrayOfCrops){
        let input = arrayOfCrops[z];
        arrayOfProfits.push(getProfitForCrop(input, environmentalFactors));
    }

    const addAllProfits = arrayOfProfits.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
    );
    
    return addAllProfits;
}



// module exports
module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};