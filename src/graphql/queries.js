/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getExp1 = /* GraphQL */ `
  query GetExp1($id: ID!) {
    getExp1(id: $id) {
      id
      tag
      type
      time
      user
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listExp1s = /* GraphQL */ `
  query ListExp1s(
    $filter: ModelExp1FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExp1s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tag
        type
        time
        user
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncExp1s = /* GraphQL */ `
  query SyncExp1s(
    $filter: ModelExp1FilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncExp1s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        tag
        type
        time
        user
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
