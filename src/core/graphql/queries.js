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
        description
        brand
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
      }
    }
  }
`;

export const DETAILS = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      gallery
      description
      brand
      inStock
      prices {
        currency {
          symbol
        }
        amount
      }
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
    }
  }
`;
