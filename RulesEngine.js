/*! 
 * @Author KJLKurt
 */
/**
Constructor Config Definition:
  data
    - any object with key value pairings to check against
	{a: "a", b: "b", ...}
  rulesList
    - object array of ruleItems in an ordered list 
	[RuleItem, RuleItem, ...]
  actionsList
    - ordered list of callable functions to perform if successful pass rules
	[ActionItem, ActionItem, ...]
	
Other Defintions:
  RuleItem:
    - Note: you can add other items to your RuleItem objects which is passed to the Actions
	- Note: required items are name and rules
    {name: "", rules: [Rule, Rule, ...]}
  Rule:
    - Note: valid operations are <,>,=,>=,<=,!=,includes,!includes
	- Note: type is the key of the data object
	- Note: value can be any type it is what is compared against from the data to the value based on the operator
    {type: "", operation: "", value: ""}
  ActionItem:
    - Note: is a function and will be supplied the data and ruleItem
	function(data, ruleItem){}
	
	
Example:
  new rulesEngine({
	title: "Hello World",
	description: "This is a hello world example",
	value: 5
  }, [
	{
		name: "thumbs-up",
		icon: "👍",
		rules: [
			{type: "value", operation: ">", value: 5}
		]
	}, {
		name: "fingersCross",
		icon: "🤞",
		rules: [
			{type: "value", operation: "=", value: 5},
			{type, "productTitle", operation: "=", value: "Hello World"}
		]
	}, {
		name: "thumbs-down",
		icon: "👎",
		rules: [
			{type: "value", operation: "<", value: 6}
		]
	}
  ], [
	(data, ruleItem) => console.log(ruleItem.icon+" "+data.title)
  ]);
  
  // Note: even though it matches fingersCross and thumbs-down, it stops once it makes one match and runs the actions
  // Note: if none are a match then no actions are run
  // Expected Console Output:
  🤞 Hello World

 */
export default class RulesEngine {
  /**
   * run upon newly created object with the variables configured
   * data object the data to compare against
   * rulesList object[] the name, icon, and rules in an ordered list
   * actionList callable[] functions to call when a rulesList item has been satisfied function(data, ruleItem)
   */
  constructor(data, rulesList, actionsList) {
    for (let ruleItem of rulesList) {
      /* check if satisfied the rules then skip the other rulesList */
      if (this.checkRules(ruleItem.rules, data)) {
        actionsList.forEach((action) => action(data, ruleItem));
        break;
      }
      /* console.log("###############"); */
    }
  }

  /**
   * Check all the rules on a single data object
   * data object {typeB: "value", typeA: "value"}
   * return: boolean - true if all rules are satisfied
   */
  checkRules(rules, data) {
    let rulesSatisfied = true;
    for (let rule of rules) {
      rulesSatisfied &= this.checkRule(rule, data);
      /* console.log(rule, data); */
      /* exit the checks if false to return false */
      if (!rulesSatisfied) break;
    }
    return rulesSatisfied;
  }

  /**
   * check a single rule on a single data object
   * rules of an array object [{type: "bsr", operation: "<", value: 500},...]
   * data object {typeB: "value", typeA: "value"}
   * return: boolean
   */
  checkRule(rule, data) {
    switch (true) {
      case rule.operation === ">" && data[rule.type] > rule.value:
      case rule.operation === ">=" && data[rule.type] >= rule.value:
      case rule.operation === "<" && data[rule.type] < rule.value:
      case rule.operation === "<=" && data[rule.type] <= rule.value:
      case rule.operation === "=" && data[rule.type] == rule.value:
      case rule.operation === "!=" && data[rule.type] != rule.value:
      case rule.operation === "includes" &&
        data[rule.type].includes(rule.value):
      case rule.operation === "!includes" &&
        !data[rule.type].includes(rule.value):
        return true;
        break;
      default:
        return false;
    }
  }
}
