const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit } = require("./functions");

// getYieldForPlant
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

    const input = {
        crop: corn,
    }

    const environmentFactors = {
    sun: "low",
    wind: "high",
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(input)).toBe(30);
    });

    test("Get yield for plant with environment factors", () => {
        expect(getYieldForPlant(input, environmentFactors)).toBe(9);
    });
});

// getYieldForCrop
describe("getYieldForCrop", () => {
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

    test("Get yield for crop with no environment factors", () => {
        expect(getYieldForCrop(input)).toBe(50);
    });

    test("Get yield for crop with environment factors", () => {
        expect(getYieldForCrop(input, environmentFactors)).toBe(15);
    });

});

// getTotalYield
describe("getTotalYield", () => {
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

    test("Get yield for all crops with no environment factors", () => {
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Get yield for all crops with environment factors", () => {
        expect(getTotalYield({crops}, environmentFactors)).toBe(7.3);
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

    const input = {
        crop: corn,
        numCrops: 2,
    }

    const environmentFactors = {
        sun: "low",
        wind: "high",
    };
    

    test("Get revenue for crop without environmental factors", () => {
        expect(getRevenueForCrop(input)).toBe(40);
    });

    test("Get revenue for crop with environmental factors", () => {
        expect(getRevenueForCrop(input, environmentFactors)).toBe(14);
    });
});

// calculate the profit for a crop: getProfitForCrop.

describe("getProfitForCrop", () => {
    const corn = {
        name: "corn",
        salePrice: 2,
        yield: 10,
        cost: 1,
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

    const input = {
        crop: corn,
        numCrops: 3,
    }

    const environmentFactors = {
        sun: "low",
        wind: "high",
    };

    // cost = cost*numCrops
    // revenue = salePrice*yield*numCrops - (environmentalFactors)
    // profit = revenue - cost

    test("Get profit for crop with environmental factors", () => {
        expect(getProfitForCrop(input, environmentFactors)).toBe(18);
    });

    test("Get profit for crop without environmental factors", () => {
        expect(getProfitForCrop(input)).toBe(57);
    });
});

// calculate the profit for multiple crops 
// (without environmental factors): getTotalProfit.

describe("getTotalProfit", () => {
    const corn = {
        name: "corn",
        salePrice: 3,
        yield: 10,
        cost: 2,
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
        salePrice: 2,
        yield: 20,
        cost: 1,
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

    const environmentFactors = {
        sun: "low",
        wind: "high",
    };
    
    const crops = [
        { crop: corn, numCrops: 4},
        { crop: pumpkin, numCrops: 7},
    ];

    // totalcost = cost*numCrops
    // totalrevenue = salePrice*yield*numCrops - (environmentalFactors) 
    // totalprofit = totalrevenue - totalcost

    test("Get total profit for crops with environmental factors", () => {
        expect(getTotalProfit({crops}, environmentFactors)).toBe(119);
    });

    test("Get total profit for crops without environmental factors", () => {
        expect(getTotalProfit({crops})).toBe(385);
    });
});

