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


