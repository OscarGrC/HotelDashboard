import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 0rem;
`;
export const DivCenter = styled.div`
  padding: 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
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
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  border: none;
  th, td {
    padding: 0.69rem;
    text-align: center; 
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0px;
    color:#212121;
    border-bottom: 1px solid #f5f5f5;
    border-left: none;
    border-right: none;
  }

  th {
    background-color: #ffffff;
    cursor: pointer;
     font-size: 1.125rem;
  }

  td {
    font-weight: 400; 
    max-width: 280px;
    img {
      width: 9.68rem;
      height: 4.8rem;
      border-radius: 8px;
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
