const duplicatedReturn = () => {
  if (seniority < 2) {
    return 0;
  }
  if (monthsDisabled > 12) {
    return 0;
  }
  if (isPartTime) {
    return 0;
  }

  console.log("Rest of the code");
};

const duplicatedCalls = () => {
  if (isSpecialDeal()) {
    total = price * 0.95;
    send();
  } else {
    total = price * 0.98;
    send();
  }
};

const controlFlags = flag => {
  if (flag) console.log("branch 1");
  else console.log("branch 2");
};

const guardClauses() {
  let result;

  if (isDead){
    result = deadAmount();
  }
  else {
    if (isSeparated){
      result = separatedAmount();
    }
    else {
      if (isRetired){
        result = retiredAmount();
      }
      else{
        result = normalPayAmount();
      }
    }
  }

  return result;
}
