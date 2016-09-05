var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var MongoClient = require('mongodb').MongoClient;

let mongo;

MongoClient.connect("mongodb://localhost:27017/demo", function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
    mongo = db;
});


const SudokuType = new GraphQLObjectType( {
    name: 'Sudoku',
    description: '...',

    fields: () => ({
        grid: {type: new GraphQLList(GraphQLInt), resolve: (sudoku) => sudoku.grid },
        id: {type: GraphQLString},
        name: {type: GraphQLString}
    })
});

function getGrid(id) {
    return
}

const QueryType = new GraphQLObjectType( {
    name: 'Query',
    description: '...',
    fields: () => ({
        sudoku: {
            type: SudokuType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: (root,args) => {
                return mongo.collection('sudoku').findOne({id: args.id})
            }
        },
        data: {
            type: new GraphQLList(SudokuType),
            resolve: (root,args) => {
                return mongo.collection('sudoku').find({}).toArray()
            }
        },
        add: {
            type: SudokuType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                grid: { type: new GraphQLList(GraphQLInt)}
            },
            resolve: (root,{name,grid}) => {
                let id = (new Date()).getTime();
                mongo.collection('sudoku').insert({id: id, name: name, grid: grid});
                return {
                    grid: grid,
                    name: name,
                    id: id
                }
            }
        }





    })
});

module.exports = new GraphQLSchema( {
    query: QueryType
});

