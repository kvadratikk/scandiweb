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

export const PRODUCTS = gql`
  query ($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        inStock
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;
