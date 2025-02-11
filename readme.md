# RulesEngine

## Overview

`RulesEngine` is a lightweight JavaScript class designed to evaluate a set of rules against an input data object and execute corresponding actions when conditions are met. It processes rules sequentially and stops at the first match, executing the associated actions.

## Features

- **Configurable Rules** – Supports multiple comparison operations (`<`, `>`, `=`, `!=`, `includes`, `!includes`, etc.).
- **First-Match Execution** – Evaluates rules in order and stops at the first successful match.
- **Custom Actions** – Executes user-defined functions when a rule set is satisfied.
- **Simple & Extensible** – Easy to modify or extend for various use cases.

## Installation

This module is designed as a standalone class and can be used in any JavaScript or Node.js environment.

### Using in a Project

Simply copy `RulesEngine.js` into your project and import it:

```js
import RulesEngine from './RulesEngine.js';
```

## Usage

### Example

```js
import RulesEngine from './RulesEngine.js';

const data = {
  title: "Hello World",
  description: "This is a hello world example",
  value: 5
};

const rulesList = [
  {
    name: "thumbs-up",
    icon: "👍",
    rules: [{ type: "value", operation: ">", value: 5 }]
  },
  {
    name: "fingersCross",
    icon: "🤞",
    rules: [
      { type: "value", operation: "=", value: 5 },
      { type: "title", operation: "=", value: "Hello World" }
    ]
  },
  {
    name: "thumbs-down",
    icon: "👎",
    rules: [{ type: "value", operation: "<", value: 6 }]
  }
];

const actionsList = [
  (data, ruleItem) => console.log(ruleItem.icon + " " + data.title)
];

// Initialize RulesEngine
new RulesEngine(data, rulesList, actionsList);
```

**Expected Output:**

🤞 Hello World

## API Documentation

### Constructor
```js
new RulesEngine(data, rulesList, actionsList)
```

| Parameter    | Type           | Description |
|-------------|---------------|-------------|
| `data`      | `Object`       | Input object with key-value pairs to evaluate. |
| `rulesList` | `Array`        | Ordered array of rule items, each containing conditions. |
| `actionsList` | `Array` (Functions) | Functions to execute when a rule set is satisfied. |

### RuleItem Object
```js
{
  name: "thumbs-up",
  icon: "👍",
  rules: [
    { type: "value", operation: ">", value: 5 }
  ]
}
```

| Key        | Type     | Description |
|------------|---------|-------------|
| `name`     | `String` | Identifier for the rule. |
| `icon`     | `String` | Optional icon representation (for logging/UI purposes). |
| `rules`    | `Array`  | List of individual rule conditions. |

### Rule Object
```js
{ type: "value", operation: ">", value: 5 }
```

| Key        | Type     | Description |
|------------|---------|-------------|
| `type`     | `String` | The key in the `data` object to evaluate. |
| `operation` | `String` | Comparison operator (`<`, `>`, `=`, `!=`, `includes`, `!includes`). |
| `value`    | `Any`    | The value to compare against. |

### ActionItem (Function)

Each function in the actionsList receives:
```js
function(data, ruleItem) {
  // Custom logic
}
```

| Parameter   | Type     | Description |
|-------------|---------|-------------|
| `data`      | `Object` | The input data object. |
| `ruleItem`  | `Object` | The matched rule item. |

## Notes
	•	The RulesEngine evaluates rules in order and stops at the first successful match.
	•	If no rules match, no actions are executed.
	•	Additional attributes can be added to RuleItem objects, which will be available in actionList functions.

## License

This project is open-source and available under the MIT License.

## Future Enhancements (Optional)
	•	Add support for rule chaining.
	•	Allow multiple rule matches before stopping execution.
	•	Provide custom logging/debugging support.
