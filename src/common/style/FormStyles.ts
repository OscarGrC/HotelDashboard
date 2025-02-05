import styled from 'styled-components';

export const Card = styled.div`
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: 1fr auto; 
    grid-template-rows: auto; 
    margin-top: 0;
    width:70%;
    margin-left:14%;
`;
export const Card2 = styled.div`
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: 1fr auto; 
    grid-template-rows: auto; 
    margin-top: 0;
    width:60%;
    margin-left:18%;
`;

export const Error = styled.p`
    color: red;
    font-size: 0.875rem;
`;

export const InputWrapper = styled.div`
    display: flex;
    margin:1rem;
    
`;
export const Label = styled.label  < { mr: string, ml: string } >`
    margin-right:${props => props.mr};
    margin-left:${props => props.ml};
    font-size: 1.2rem;
    font-weight: 600;  
    color: #222222;
    font-family: 'Poppins', sans-serif;
    margin-top:0.5rem;
`;

export const FormColumn = styled.div`
    display: flex;
    flex-direction: column;
    grid-column: 1 / 2; 
`;

export const SubmitButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    grid-column: span 2; 
    
`;

export const PhotosWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const AmenitiesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
export const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    margin-top:0px;
`;
export const TextArea = styled.textarea`
    width: 300px; 
    height: 150px;
    padding: 10px;
    border-radius: 8px;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    resize: none; 
`;

