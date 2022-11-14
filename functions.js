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



const getTotalYield = (crops, environmentFactors) => {
    const arrayOfCrops = crops['crops'];
    
    for (z in arrayOfCrops){

        const newArray = [];
        for (x in environmentFactors){
            newArray.push(((100 + (arrayOfCrops[z]['crop']['factor'][x][environmentFactors[x]]) )/100))
        }
        // return newArray
        const finalArray = [];
            const multiplyWithInitial = newArray.reduce(
            (previousValue, currentValue) => previousValue * currentValue,
            arrayOfCrops[z]['crop']['yield']*arrayOfCrops[z]['numCrops']
            );
            finalArray.push(multiplyWithInitial);
            return finalArray
    }
}    


const getCostsForCrop = input => {
    return input['crop']['cost']*input['numCrops'];
}

const getRevenueForCrop = crop => {
    return crop['salePrice']*crop['yield'];
}

const getProfitForCrop = crop => {
    return crop['salePrice']*crop['yield'] - crop['numCrops']*crop['cost'];
}

const getTotalProfit = crops => {
    const arrayOfCrops = crops['crops'];
    const map1 = arrayOfCrops.map(x => (x['crop']['salePrice']*x['crop']['yield'] - x['crop']['numCrops']*x['crop']['cost']));
    const sum1 = map1.reduce((partialSum, a) => partialSum + a, 0);
    return sum1; 
}


module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};