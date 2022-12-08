/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "query AllUsers {\n    users: user {\n      id\n    }\n}": types.AllUsersDocument,
};

export function graphql(source: "query AllUsers {\n    users: user {\n      id\n    }\n}"): (typeof documents)["query AllUsers {\n    users: user {\n      id\n    }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;