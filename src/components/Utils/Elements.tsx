import styled from 'styled-components';

export const NoResults = styled.div`
    display: none;
    height: 250px;
    width: 90vw;
    max-width: 400px;
    margin: 40vh auto;
    padding: 20px;
    padding-top: 40px;
    background: green;
    color: white;
    border-radius: 10px;
    text-align: center;

    p {
        font-size: 20px;
    }
`;

export const TryAgainButton = styled.button`
    background: green;
    max-width: 200px;
    text-decoration: none;
    text-align: center;
    color: white;
    font-size: 20px;
    margin: 25px auto;
    margin-bottom: 0;
    padding: 10px 25px;
    border-radius: 10px;
    border: 2px solid white;

    :hover {
        background: white;
        color: green;
        cursor: pointer;
    }
`;