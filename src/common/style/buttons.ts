import styled from 'styled-components';


export const ButtonModelsHeader = styled.div`
  background-color: #135846;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-weight: 500; 
    font-size:1rem;
    letter-spacing: 0px;
    padding: 10px 28px;
    border-radius: 12px;
    cursor: pointer;

    &:hover {
      background-color:#5Ad07A;
    }
`;

export const ButtonTable = styled.button<{ status: string }>`
    background-color: ${(props) => {
        switch (props.status) {
            case "Check In":
                return "#5Ad07A";
            case "Check Out":
                return "#E23428";
            case "In Progress":
                return "#F5C623";
            default:
                return "#D3D3D3";
        }
    }};
    color: white;
    font-family: 'Poppins', sans-serif;
    font-weight: 500; 
    padding: 10px 28px;
    border-radius: 12px;
    width: 10rem;
    border: none;
`;


export const ButtonStyled = styled.button < { stade: boolean } > `
    background-color: ${(props) => (props.stade ? "#5Ad07A" : "#E23428")};
    color: white;
    font-family: 'Poppins', sans-serif;
    font-weight: 500; 
    padding: 10px 28px;
    border-radius: 12px;
    width: 8rem;
    border: none;
`;

export const ButtonItem = styled.button`
    background-color: transparent;
    border:none;
    cursor: pointer;
   
`
export const ButtonForm = styled.button`
    background-color: #5Ad07A;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-weight: 500; 
    padding: 10px 38px;
    border-radius: 12px;
    
`



