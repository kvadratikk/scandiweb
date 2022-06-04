import { gql } from '@apollo/client';

export const CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
