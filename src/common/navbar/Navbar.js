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
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 2rem;
`;

export const LogoIcon = styled.div`
    font-size: 2rem;
    color: #007bff;
    margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
    font-size: 1rem;
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
    color: #222;
`;

export const Subtitle = styled.h2`
    font-size: 0.75rem;
    font-weight: 300;
    font-family: 'Poppins', sans-serif;
    color: #555;
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
    transition: background-color 0.3s;

    &:hover {
        background-color: #e9ecef;
    }

    svg {
        font-size: 1.2rem;
        color: #007bff;
    }
`;

export const UserProfile = styled.div`
    text-align: center;
    margin-top: 2rem;

    img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        margin-bottom: 0.5rem;
    }

    h3 {
        font-size: 1rem;
        font-weight: 600;
        font-family: 'Poppins', sans-serif;
        margin: 0.3rem 0;
        color: #222;
    }

    p {
        font-size: 0.75rem;
        font-family: 'Poppins', sans-serif;
        color: #555;
    }
`;

export const ContactSection = styled.div`
    text-align: center;
    margin-top: 2rem;

    h4 {
        font-size: 0.85rem;
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
        margin-bottom: 0.5rem;
        color: #222;
    }
`;

export const Footer = styled.footer`
    text-align: center;
    font-size: 0.75rem;
    font-family: 'Poppins', sans-serif;
    color: #777;
    margin-top: 2rem;

    p {
        margin: 0.3rem 0;
    }

    svg {
        color: red;
        font-size: 0.9rem;
    }
`;