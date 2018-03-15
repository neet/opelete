## Types

### `operator`
|key|type|description|nullable|
|:--|:---|:----------|:-------|
|`id`|`string`|Snake cased unique id of the operator|`false`|
|`operator`|`string`|Actual operator that will be inserted to the form|`false`|
|`insertWhiteSpace`|`boolean`|Whether insert white space after the operator, `false` by default|`true`|
|`cursorPosition`|`number`|How much the cursor moves when an operator is selected. For example `AROUND()` should move 7 from left because a user might be want to specify the number inside of the brackets. If `null` specified, the cursor will move to far right|`true`|
|`hidden`|`boolean`|Whether the user has hidden this operator on the management form|`true`|


## Storage
|key|type|description|nullable|
|:--|:---|:----------|:-------|
|`hide_description`|`boolean`|Whether the description of operator won't be shown in the right of suggestion, `false` by default|`true`|
|`max_suggestions`|`number`|Maximum number of suggestions, `null` specified, considered as infinity|`true`|
|`operators`|`operator[]`|User-modified `operator` list|`false`|
