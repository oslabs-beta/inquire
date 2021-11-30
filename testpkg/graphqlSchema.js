const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Query {

}
type Subscription {

}
type animals { 
   noise: String! 
   category: categoryType! 
}
type categoryType { 
   undefined: Undefined! 
}
`);