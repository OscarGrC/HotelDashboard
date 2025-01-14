import styled from 'styled-components';

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f6f9;
`;

export const LoginBox = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  text-align: center;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 1rem;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #333;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 0.5rem;
    display: block;
  }

  input {
    width: 90%;
    padding: 0.8rem;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    margin-top: 0.3rem;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

export const SubmitButton = styled.button`
  width: 90%;
  margin-left:1rem;
  padding: 0.8rem;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;