function checkCashRegister(price, cash, cid) {
  var change = cash - price;
  // Here is your change, ma'am.
  let changeObj = {};
  let totalCID = cid.map(el => el[1]).reduce((accum, value) => accum + value);
  console.log(`totalCID: ${totalCID}`)
  if (totalCID === change) {
    changeObj.status = "CLOSED";
    changeObj.change = cid;
    return changeObj;
  }
  
  function getChange() {
    const denoms = {
      "PENNY": 0.01,
      "NICKEL": 0.05,
      "DIME": 0.1,
      "QUARTER": 0.25,
      "ONE": 1,
      "FIVE": 5,
      "TEN": 10,
      "TWENTY": 20,
      "ONE HUNDRED": 100
    };
    
    let i = cid.length-1;
    let change_arr = [];

    for (i; i >= 0; i--){
      // check if the change is more than the denom and there is enough of the denom available
      let denom = denoms[cid[i][0]];
      let denomName = cid[i][0];
      let cidOfDenom = cid[i][1];
      let reduction = Math.floor(change/denom)*denom;
      
      if (change >= denom && cidOfDenom !== 0) {
        if (cidOfDenom >= reduction){
          change -= reduction;
          change_arr.push([denomName, reduction]);
        } else if (cidOfDenom <= change || change - cidOfDenom === 0) {
          change -= cidOfDenom;
          change_arr.push([denomName, cidOfDenom]);
        }
      }
      
      //adjust for precision errors
      change = Math.round(change*100)/100;
    }
    if (change > 0) {
      return [];
    }
    return change_arr;
  }
  
  changeObj.change = getChange();
  
  if (change > 0){
    changeObj.status = "INSUFFICIENT_FUNDS";
    return changeObj;
  }
  changeObj.status = "OPEN";
  return changeObj;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))
