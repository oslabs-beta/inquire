const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Query {

}
type Subscription {

}
type Trip { 
}
type Status { 
  position: Position! 
}
type Position { 
}
`);