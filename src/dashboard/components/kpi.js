import styled from 'styled-components';

export const KpiContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0.8rem;
    background-color:#F8F8F8;
`;

export const IconContainer = styled.div`
    background-color: #FFEDEC;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2rem; 
    
`;
export const Card = styled.div`
    border-radius: 10px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    text-align: left;
    width: 200px;
    margin: 10px;   

    &:hover ${IconContainer} {
        background-color: red; 
    }

    &:hover ${IconContainer} svg {
        color: white !important; 
    }
    
`;


export const CardContent = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    
`;

export const Number = styled.div`
    font-size: 24px; 
    font-weight: bold;
`;

export const Title = styled.div`
    margin-top: 5px; 
    color: #777;
    font-size: 14px;
`;
