// getYieldForPlant
const getYieldForPlant = (plant, environmentFactors) => {
    const newArray = [];
    for (x in environmentFactors){
        newArray.push(((100 + (plant['factor'][x][environmentFactors[x]]) )/100))
    }

    const multiplyWithInitial = newArray.reduce(
    (previousValue, currentValue) => previousValue * currentValue,
    plant['yield']
    );

    return multiplyWithInitial;

}


// getYieldForCrop
const getYieldForCrop = (input, environmentFactors) => {
    const yieldWithoutEnvironment = input['crop']['yield']*input['numCrops'];

    const newArray = [];
    for (x in environmentFactors){
        newArray.push(((100 + (input['crop']['factor'][x][environmentFactors[x]]) )/100))
    }

    const multiplyWithInitial = newArray.reduce(
    (previousValue, currentValue) => previousValue * currentValue,
    yieldWithoutEnvironment
    );

    return multiplyWithInitial;

}


//getTotalYield
const getTotalYield = (crops, environmentFactors) => {
    const arrayOfCrops = crops['crops'];
    const finalArray = [];
    for (z in arrayOfCrops){

        const newArray = [];
        for (x in environmentFactors){
            newArray.push(((100 + (arrayOfCrops[z]['crop']['factor'][x][environmentFactors[x]]) )/100))
        }
       
        const multiplyWithInitial = newArray.reduce(
        (previousValue, currentValue) => previousValue * currentValue,
        arrayOfCrops[z]['crop']['yield']*arrayOfCrops[z]['numCrops']
        );
        finalArray.push(multiplyWithInitial);
            
    }
    const addAllYields = finalArray.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
    );
    
    return addAllYields
}    


// getCostsForCrop
const getCostsForCrop = input => {
    return input['crop']['cost']*input['numCrops'];
}


//getRevenueForCrop
const getRevenueForCrop = (crop, environmentFactors) => {
    const revenueWithoutEnvironment = crop['salePrice']*crop['yield'];

    const newArray = [];
    for (x in environmentFactors){
        newArray.push(((100 + (crop['factor'][x][environmentFactors[x]]) )/100))
    }

    const multiplyWithInitial = newArray.reduce(
    (previousValue, currentValue) => previousValue * currentValue,
    revenueWithoutEnvironment
    );

    return multiplyWithInitial;
}


// getProfitForCrop
const getProfitForCrop = (crop, environmentFactors) => {
    const cost = crop['numCrops']*crop['cost'];
    const revenueWithoutEnvironment = crop['salePrice']*crop['yield']*crop['numCrops'];
    const newArray = [];

    for (x in environmentFactors){
        newArray.push(((100 + (crop['factor'][x][environmentFactors[x]]) )/100))
    }

    const multiplyWithInitial = newArray.reduce(
    (previousValue, currentValue) => previousValue * currentValue,
    revenueWithoutEnvironment
    );

    const revenueWithEnvironment = multiplyWithInitial;
    const profit = revenueWithEnvironment - cost;
    return profit;
}


// getTotalProfit
const getTotalProfit = (crops, environmentFactors) => {
    const arrayOfCrops = crops['crops'];
    const arrayCosts = arrayOfCrops.map(x => (x['crop']['numCrops']*x['crop']['cost']));
    const totalCosts = arrayCosts.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
    );
    const finalArray = [];

    for (z in arrayOfCrops){

        const newArray = [];
        for (x in environmentFactors){
            newArray.push(((100 + (arrayOfCrops[z]['crop']['factor'][x][environmentFactors[x]]) )/100))
        }
        
        const multiplyWithInitial = newArray.reduce(
        (previousValue, currentValue) => previousValue * currentValue,
        arrayOfCrops[z]['crop']['yield']*arrayOfCrops[z]['crop']['salePrice']*arrayOfCrops[z]['crop']['numCrops']
        );
        finalArray.push(multiplyWithInitial); 
    }
    
    const addAllRevenues = finalArray.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
    );
    
    const totalProfit = addAllRevenues - totalCosts;
    return totalProfit;
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