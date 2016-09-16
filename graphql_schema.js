const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList,GraphQLNonNull } = require('graphql');
const {Grid} = require('./mongoose_models');


const GridType = new GraphQLObjectType( {
    name: 'Grid',
    description: 'A sudoku grid',

    fields: {
        name: {type: GraphQLString},
        id: {type: GraphQLString, resolve: (g) => g._id},
        grid: {type: new GraphQLList(GraphQLInt), resolve: (g) => g.grid },
    }
});



const SudokuMutationType = new GraphQLObjectType( {
    name: 'Sudoku_mutation',
    description: 'mutations',
    fields: () => ({
        create: {
            type: GridType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                grid: { type: new GraphQLList(GraphQLInt)}
            },
            resolve: (root,{name,grid}) => {
                let newGrid = new Grid( {name, grid})
                return newGrid.save()
            }
        },
        remove: {
            type: GraphQLString,
            description: "Remove grid by id",
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (root,{id}) => Grid.remove( {_id: id}).then( () => "success")
        }
    })

})

const SudokuType = new GraphQLObjectType( {
    name: 'Sudoku',
    description: "fetching and saving suoku grids",
    fields: {
        grid: {
            type: GridType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: (root,args) => {
                return Grid.findOne({_id: args.id})
            }
        },
        search: {
            type: new GraphQLList(GridType),
            args: {
                limit: {
                    description: "Maximum number of results",
                    type: GraphQLInt
                }
            },
            resolve: (root,args) => {
                return Grid.find({}).limit(args.limit)
            }
        },

    }
});

const QueryType = new GraphQLObjectType( {
    name: 'query',
    description: '...',
    fields: {
        sudoku: {
            type: SudokuType,
            resolve: () => ({})
        },
    }
});

const MutationType = new GraphQLObjectType( {
    name: 'mutation_query',
    description: '...',
    fields: {
        sudoku: {
            type: SudokuMutationType,
            resolve: () => ({})
        },
    }
});

module.exports = new GraphQLSchema( {
    query: QueryType,
    mutation: MutationType
});
