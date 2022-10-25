import styled from 'styled-components';

export const PageContainer = styled.div`
    margin: 0 auto;
    margin-top: 25px;
    width: 100%;
    display: none;
    z-index: 11;
`;

export const PagesSelector = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 10px auto;

    h3 {
        font-size: 22px;
    }
`;

export const PagesSelectorContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px auto;
`;

export const PageSizeSelector = styled.select`
    margin: 10px auto;
    padding: 0 10px;
    height: 35px;
    font-size: 20px;
    background-color: white;
    box-shadow: 1px 2px #888888;
    border: 1 solid #aaaaaa;

    option {
        background: white;
        font-size: 20px;
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
    }
`;

export const NextPageButton = styled.button`
    margin: 0 10px;
    font-size: 20px;
    background: white;
    border: none;
    color: green;
`;

export const ResultsContainer = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 10px;
    background: white;
`;

export const TitleLine = styled.div`
    height: auto;
    text-align: center;
    margin: 15px auto;

    h4 {
        margin: 20px auto;
        font-size: 32px;
        font-weight: 700;
    }
`;

export const ResultsList = styled.ul`
    list-style-type: none;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
`;

export const ResultCard = styled.li`
    width: 100%;
    margin: 10px auto;
    padding: 20px 15px;
    background: #fefefe;
    border-radius: 10px;
    box-shadow: 2px 5px #888888;
    border: 1px solid #aaaaaa;
`;

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 10px;

    p {
        line-height: 18px;
        word-wrap: break-word;
    }
`;

export const CardContent = styled.div`
    display: flex;
    flex-direction: row;
    // align-items: center;

    @media screen and (max-width: 499px) {
        flex-direction: column;
    }
`;

export const CardImage = styled.img`
    height: 150px;
    max-width: 200px;
    max-width: 20vw;
    margin: 0 10px;
`;

export const CardContentText = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 10px;

    p {
        margin: 5px 0;
        word-wrap: break-word;
    }
`;

export const EndLine = styled.div`
    text-align: right;
    height: 25px;
`;

export const CardTitle = styled.div`
    text-align: center;
    margin: 25px auto;

    h2 {
        color: green;
        font-size: 24px;
        font-weight: 700;
        word-wrap: break-word;
        margin: 5px 0;
    }

    h3 {
        font-size: 20px;
        font-weight: 500;
        word-wrap: break-word;
        margin: 5px 0;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PlainCardButton = styled.a`
    max-width: 200px;
    text-decoration: none;
    text-align: center;
    color: green;
    font-size: 20px;
    margin: 25px auto;
    margin-bottom: 0;
    padding: 10px 25px;

    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

export const CardButton = styled.a`
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
    box-shadow: 0.5px 1px #888888;
    border: 2px solid #aaaaaa;

    :hover {
        background: white;
        color: green;
        border: 2px solid green;
        cursor: pointer;
    }
`;