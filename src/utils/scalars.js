import {GraphQLScalarType} from 'graphql';
import {Kind} from 'graphql/language/index.js';

export const Long = new GraphQLScalarType({
    name: 'Long',
    description: 'A 64-bit integer (BigInt)',
    serialize(value) {
        return Number(value); // Convert to a number for JSON responses
    },
    parseValue(value) {
        return Number(value); // Convert input value to a number
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10);
        }
        return null; // Invalid input
    }
});


export const JSON = new GraphQLScalarType({
    name: "JSON",
    description: "Arbitrary JSON values",
    serialize(value) {
        return value; // Send JSON data to the client as is
    },
    parseValue(value) {
        return value; // Receive JSON data from the client as is
    },
    parseLiteral(ast) {
        switch (ast.kind) {
            case Kind.STRING:
            case Kind.BOOLEAN:
                return ast.value;
            case Kind.INT:
            case Kind.FLOAT:
                return parseFloat(ast.value);
            case Kind.OBJECT:
                return ast.value;
            case Kind.LIST:
                return ast.values.map((value) => value.value);
            default:
                return null;
        }
    },
});
