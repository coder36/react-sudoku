var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var MongoClient = require('mongodb').MongoClient;

let mongo;

MongoClient.connect("mongodb://localhost:27017/demo", function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
    mongo = db;
});


const PersonType = new GraphQLObjectType( {
    name: 'Person',
    description: '...',

    fields: () => ({
        firstName: {type: GraphQLString, resolve: (person) => person.first_name },
        lastName: { type: GraphQLString, resolve: (person) => person.last_name},
        email: {type: GraphQLString},
        friends: {
            type: new GraphQLList(PersonType),
            resolve: (person) => person.friends.map( getPerson )
        }
    })
});

function getPerson(id) {
    return mongo.collection('persons').findOne({id})
}

const QueryType = new GraphQLObjectType( {
    name: 'Query',
    description: '...',
    fields: () => ({
        person: {
            type: PersonType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: (root,args) => {
                return getPerson(args.id);
            }

        }
    })
});

module.exports = new GraphQLSchema( {
    query: QueryType
});

