import styled from 'styled-components';

export const CardContainer = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 16px;
    margin: 12px 0;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    width: 320px;
`;


export const CommentText = styled.p`
    font-size: 1rem;
    color: #222222;
    margin-bottom: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width:280px
`;


export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;


export const CustomerInfo = styled.div`
    font-size: 0.9rem;
    color: #555;
    line-height: 1.4;

    .name {
        font-weight: 600;
        color: #333;
        font-size:1.185rem;
    }

    .time {
        font-size: 0.8rem;
        color: #888;
    }
`;
export const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
`;

export const PopupContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    width: 80%;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
export const CloseButtonContainer = styled.div`
    position: absolute;
    top: 0%;
    right: 0%;
    padding: 10px;
    cursor: pointer;
`;



