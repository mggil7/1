/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGases = /* GraphQL */ `
  query GetGases($id: ID!) {
    getGases(id: $id) {
      id
      deviceID
      DATA
      He
      ARS
      N2
      ARG
      wd
      Ux
      vb1
      vb2
      vb3
      vb4
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listGases = /* GraphQL */ `
  query ListGases(
    $filter: ModelGasesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGases(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        deviceID
        DATA
        He
        ARS
        N2
        ARG
        wd
        Ux
        vb1
        vb2
        vb3
        vb4
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
