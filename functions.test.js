const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit } = require("./functions");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factor: {
        sun: {
        low: -50,
        medium: 0,
        high: 50,
        },
        wind: {
        low: 60,
        medium: 0,
        high: -40,    
        }
        },
    };

    const environmentFactors = {
    sun: "low",
    wind: "high",
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn, environmentFactors)).toBe(9);
    });
});


describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 5,
            factor: {
            sun: {
            low: -50,
            medium: 0,
            high: 50,
            },
            wind: {
            low: 60,
            medium: 0,
            high: -40,    
            }
            },
        };

        const input = {
            crop: corn,
            numCrops: 10,
        };

        const environmentFactors = {
        sun: "low",
        wind: "high",
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(15);
    });
});


describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
            sun: {
            low: -50,
            medium: 0,
            high: 50,
            },
            wind: {
            low: 60,
            medium: 0,
            high: -40,    
            }
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
            sun: {
            low: -30,
            medium: 0,
            high: 70,
            },
            wind: {
            low: 50,
            medium: 0,
            high: -50,    
            }
            },
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        const environmentFactors = {
        sun: "low",
        wind: "high",
        };
        expect(getTotalYield({ crops }, environmentFactors)).toBe(7.3);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

// Cost
// The costs of sowing a plant are fixed per plant.

// Example: Sowing 1 maize plant costs 1 euro.

// If you have a crop of 230 maize plants, the costs for that crop are therefore 230 euros.

describe("getCostsForCrop", () => {
    const corn = {
        name: "corn",
        cost: 5
    };
    const input = {
        crop: corn,
        numCrops: 10,
    };

    test("Get cost for crop", () => {
        expect(getCostsForCrop(input)).toBe(50);
    });
});

// Revenue
// Each plant has a "sale price". That is how many euros you earn with one kilo 
// of fruit or vegetables from that plant.

// If apples have a sale price of 2 euros and we sell 5 kilos of apples, 
// then the revenue is 10 euros.

describe("getRevenueForCrop", () => {
    const corn = {
        name: "corn",
        salePrice: 2,
        yield: 10,
    };
    

    test("Get cost for crop", () => {
        expect(getRevenueForCrop(corn)).toBe(20);
    });
});

// calculate the profit for a crop (without environmental factors): getProfitForCrop.

describe("getProfitForCrop", () => {
    const corn = {
        name: "corn",
        salePrice: 2,
        yield: 10,
        cost: 5,
        numCrops: 3,
    };

    const cost = corn['numCrops']*corn['cost'];
    const revenue = corn['salePrice']*corn['yield'];
    const profit = revenue-cost 

    test("Get cost for crop", () => {
        expect(getProfitForCrop(corn)).toBe(profit);
    });
});

// calculate the profit for multiple crops 
// (without environmental factors): getTotalProfit.

describe("getTotalProfit", () => {
    const corn = {
        name: "corn",
        salePrice: 7,
        yield: 10,
        cost: 5,
        numCrops: 10,
    };
    const pumpkin = {
        name: "pumpkin",
        salePrice: 5,
        yield: 20,
        cost: 3,
        numCrops: 7,
    };
    const crops = [
        { crop: corn},
        { crop: pumpkin},
    ];

    const totalCost = corn['cost']*corn['numCrops'] + pumpkin['cost']*pumpkin['numCrops'];
    const totalrevenue = corn['salePrice']*corn['yield'] + pumpkin['salePrice']*pumpkin['yield'];
    const profit = totalrevenue-totalCost; 

    test("Get cost for crop", () => {
        expect(getTotalProfit({crops})).toBe(profit);
    });
});

// describe("getTotalYield", () => {
//     test("Calculate total yield with multiple crops", () => {
//         const corn = {
//             name: "corn",
//             yield: 3,
//         };
//         const pumpkin = {
//             name: "pumpkin",
//             yield: 4,
//         };
//         const crops = [
//             { crop: corn, numCrops: 5 },
//             { crop: pumpkin, numCrops: 2 },
//         ];
//         expect(getTotalYield({ crops })).toBe(23);
//     });

//     test("Calculate total yield with 0 amount", () => {
//         const corn = {
//             name: "corn",
//             yield: 3,
//         };
//         const crops = [{ crop: corn, numCrops: 0 }];
//         expect(getTotalYield({ crops })).toBe(0);
//     });
// });