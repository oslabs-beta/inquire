const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Query {

}
type Subscription {
    
}
type animals { 
  category: categoryType 
  noise: String 
}
enum categoryType { 
  DOG
  CAT
}
`);