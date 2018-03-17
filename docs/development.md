## Types

### `operator`
|key|type|description|nullable|
|:--|:---|:----------|:-------|
|`id`|`string`|Snake cased unique id of the operator|`false`|
|`operator`|`string`|Actual operator that will be inserted to the form|`false`|
|`insertWhiteSpace`|`boolean`|Whether insert white space after the operator, `false` by default|`true`|
|`cursorPosition`|`number`|How much the cursor moves when an operator is selected. For example `AROUND()` should move 7 from left because a user might be want to specify the number inside of the brackets. If `null` specified, the cursor will move to far right|`true`|

## Storage
|key|type|description|nullable|
|:--|:---|:----------|:-------|
|`hide_descriptions`|`boolean`|Whether the description of operators won't be shown in the right of suggestion, `false` by default|`true`|
|`max_suggestions`|`number`|Maximum number of suggestions, `null` specified, considered as infinity|`true`|
|`operator_blacklist`|`array`|List of excluded oeprator's `id`|`true`|
