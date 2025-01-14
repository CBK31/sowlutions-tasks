import Papa from "papaparse";
import fs from "fs";

const csvData = fs.readFileSync("prediction.csv", "utf8");

if (!csvData) {
  console.warn("prediction.csv not found");
}

// CSV into JSON (array of rows)
const parsed = Papa.parse(csvData, {
  header: true,
  dynamicTyping: true,
});

const allRows = parsed.data;
// console.log(allRows);

// aggregator that counts total matches vs wins for each combination
const aggregator = {};

// helper to create a unique key from the three features
function makeKey(suit, animal, fruit) {
  return `${suit.toLowerCase()}-${animal.toLowerCase()}-${fruit.toLowerCase()}`;
}

allRows.forEach((row) => {
  // read fields from the CSV row
  const suit = row["Card Suit"];
  const animal = row["Animal Name"];
  const fruit = row["Fruit"];
  const result = String(row["Result"]).toUpperCase() == "TRUE";
  //   console.log("row : ", suit, animal, fruit, result);
  // skip malformed rows
  if (!suit || !animal || !fruit || typeof result != "boolean") {
    // console.log("enter malformed or done ");
    return;
  }

  const key = makeKey(suit, animal, fruit);
  console.log("keys are : ", key);
  if (!aggregator[key]) {
    // console.log("enter no aggregation");
    aggregator[key] = { total: 0, wins: 0 };
  }

  aggregator[key].total++;

  if (result) {
    aggregator[key].wins++;
  }
});

// function to return the probability of beating the boss
function probabilityToBeatTheBoss(suit, animal, fruit) {
  const key = makeKey(suit, animal, fruit);
  //   return a 0 in case never seen this exact combination
  if (!aggregator[key]) {
    return 0;
  }

  const { total, wins } = aggregator[key];
  return wins / total;
}
try {
  // example
  const prob = probabilityToBeatTheBoss("diamonds", "fox", "bananas");
  console.log(` Probability: ${(prob * 100).toFixed(2)}%`);
} catch (error) {
  console.warn(error);
}

// NOTE :
// i should implement another logic : my keys now are static and limited to the combination already given in the CSV
// if i want a new combination that are not in the CSV my implementation will return 0 (its a wrong answer)

// solution 1 : (new code from scratch)
// i should implement another probability logic that are based on each field and not the combination of the fields
