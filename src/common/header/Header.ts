import styled from 'styled-components';
export const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
      justify-content: space-between;
    padding: 1rem;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HamburgerIcon = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    display:inline;
outline: none;
    &:hover {
        opacity: 0.8;
    }
`;

export const PageTitle = styled.h1`
    font-size: 1.75rem;  
    font-weight: 600;
    display:inline;    
    color: #222222;
    font-family: 'Poppins', sans-serif;
   
`;


export const SearchBar = styled.div`
    display: flex;
    align-items: center;
    background-color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.1rem;
    width: 400px;
    margin-right:3rem;
`;

export const SearchInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    color: #333;
`;

export const SearchButton = styled.button`
    background: none;
    border: none;
    font-size: 1.2rem;
    color: #888;
    cursor: pointer;

    &:hover {
        color: #333;
    }
`;

export const IconsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 3rem;
margin-right:3rem;
    svg {
        font-size: 1.5rem;
        cursor: pointer;

        &:hover {
            color: #007bff;
        }
    }
`;

export const UserAvatar = styled.img`
    width: 3rem;
    height: 3rem;
    border-radius: 10%;
    border: 2px solid #ddd;
    cursor: pointer;
margin-right:3rem;
    &:hover {
        border-color: #007bff;
    }
`;

export const LanguageSelector = styled.select`
    border: none;
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    color: #333;
    background-color: #fff;
`;
export const NotificationBadge = styled.div<{ bgcolor: string }>`
    position: absolute;
        left: 55%;
    bottom: 55%;
    width: 1.2rem;
    height: 1.2rem;
    background-color: ${props => props.bgcolor === "red" ? "red" : "black"};
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    border-radius: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.1rem;
`;
