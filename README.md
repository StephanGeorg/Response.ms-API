# Nearest! API

## GraphQL

We will use this GraphQL Structure:

[GraphQL folder structure](https://github.com/ParabolInc/action/tree/master/src/server/graphql)

You can find more informations about it here:
[Medium article](https://hackernoon.com/graphql-tips-after-a-year-in-production-419341db52e3)

### Structure

#### Defining a Type
1. Schemas
2. Resolver

#### Defining a Model

1. Mutations
2. Queries
3. (Schemas) as Type
4. (Resolver) as Type



**1. Structure**

First we need to define a model. For example the ``nodes`` model. Each model gets an own folder. In its we will define the ``queries`` and ``schemas``.

**2. Files**

```javascript
// Queries.js
import { GetNode } from './schemas';

export default {
	getNodeById: {
		type: GetNode,
		description: 'Get a node by its id',
		args: {
			nodeId: {
				type: ...
			},
		},
	}
};
```

```javascript
// Schemas.js
export const GetNode = new GraphQLObjectType({
	name: 'GetNode',
	....
});
```