import styled from 'styled-components';
export const ShearchBo = styled.input`
   
   padding:0.5rem;
   border-radius:10px;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

export const Tab = styled.p`
  font-family: 'Poppins', sans-serif;
  font-weight: ${(props) => (props.selected ? '600' : '400')}; 
  color: ${(props) => (props.selected ? '#135846' : '#6E6E6E')}; 
  cursor: pointer;
  margin: 0;
  margin-right:2rem;
  position: relative;
  
  /* Subrayado */
  &:after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${(props) => (props.selected ? '#135846' : 'transparent')}; 
  }

  &:hover {
    color: #135846; 
  }
`;