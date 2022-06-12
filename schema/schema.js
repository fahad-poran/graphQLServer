const {clients,projects} = require('../sampleData');
const {graphQLObjectType,
    GraphQLID,
    GraphQLString, 
    GraphQLObjectType, 
    GraphQLSchema,
    GraphQLList
} = require('graphql');

const Project = require('../models/Project');
const Client = require('../models/Client');

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent,args){
                // return clients.find(client=>client.id === parent.clientId);
                return Client.find(parent.ClientId);
            }
        }

    })
});

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},

    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RoteQieryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent,args){
                // return projects;
                return Project.find();
            }
        },
        project: {
            type: ClientType,
            args: {id: {type:GraphQLID}},
            resolve(parent,args){
                // return projects.find(project => project.id == args.id);
                return Project.findById(args.id);
            }
        },

        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent,args){
                return clients;
            }
        },
        client: {
            type: ClientType,
            args: {id: {type:GraphQLID}},
            resolve(parent,args){
                return clients.find(client => client.id == args.id);
            }
        }
    }
})
module.exports = new GraphQLSchema({
     query: RootQuery
})