import styled from 'styled-components';
export const Wrapper = styled.div`
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h1 {
    font-size: 1.5rem;
    color: #333;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;

  th, td {
    padding: 0.8rem;
    border: 1px solid #ddd;
    text-align: center; 
    font-size: 0.9rem;
  }

  th {
    background-color: #f4f6f9;
    cursor: pointer;
  }

  td {
    img {
      width: 50px;
      height: 50px;
      border-radius: 4px;
    }

    .actions {
      display: flex;
      gap: 0.5rem;

      button {
        padding: 0.3rem 0.5rem;
        font-size: 0.8rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .edit {
        background-color: #28a745;
        color: white;

        &:hover {
          background-color: #218838;
        }
      }

      .delete {
        background-color: #dc3545;
        color: white;

        &:hover {
          background-color: #c82333;
        }
      }
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }

    &:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
  }
`;

export const ButtonStyled = styled.button`
    background-color: ${props => props.type === "true" ? "#00cc00" : "#FF0000"};
    color: black;
    padding: 10px 28px;
    border-radius: 5px;
`