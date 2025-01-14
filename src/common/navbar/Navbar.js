import styled from 'styled-components';

export const SidebarWrapper = styled.div`
    width: 250px;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    padding: 1rem;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    text-align: left;
    margin-bottom: 2rem;
`;

export const LogoIcon = styled.div`
    margin-right: 1rem;
    display: flex;
    align-items: center;
    margin-left:1rem;

    img {
        width: 2rem;
        height: 2rem;
    }
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h1`
    font-size: 1rem;
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
    color: #222;
    margin: 0;
  
`;

export const Subtitle = styled.h2`
    font-size: 0.5rem;
    font-weight: 300;
    font-family: 'Poppins', sans-serif;
    color: #555;
    margin: 0;
`;


export const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
`;


export const NavItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    color: #7992b3;

    svg {
        font-size: 1.2rem;
        color: #c5c5c5;
    }

    &.navActive {
        color: #FF0000;

        svg {
            color: #FF0000;
        }
    }
`;

export const UserProfile = styled.div`
    text-align: center;
  

    img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        margin-bottom: 0.5rem;
    }

    h3 {
        font-size: 0.9rem;
        font-weight: 600;
        font-family: 'Poppins', sans-serif;
        margin: 0.3rem 0;
        color: #222;
    }

    p {
        font-size: 0.5rem;
        font-family: 'Poppins', sans-serif;
        color: #555;
    }
`;

export const ContactButton = styled.button`
    display: inline-block;
    margin-top: 0.5rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    color: #135846;
    background-color: #c5c5c5;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;

    &:focus {
        outline: none;
    }
`;


export const Footer = styled.footer`
    text-align: center;
    font-size: 0.66rem;
    font-family: 'Poppins', sans-serif;
    color: #777;
    margin-top: 2rem;

    p {
        margin: 0.3rem 0;
    }
         h4 {
       color:#222222;
        margin: 0.3rem 0;
    }
              h3 {
     margin-top:2rem;
     font-size: 0.66rem;
    }

    svg {
        color: red;
        font-size: 0.9rem;
    }
`;