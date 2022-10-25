import styled from 'styled-components';

export const MainPage = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100%;
    box-sizing: border-box;
    position: relative;
`;

export const MainPageVideo = styled.video`
    width: 100%;
    height: 100%;
    min-height: 1000px;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center;
    overflow: hidden;
`;

export const MainPageContent = styled.div`
    width: 100%;
    height: 100%;
    min-height: 1000px;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 auto;
`;

export const LandingPageBg = styled.div`
    padding-top: 1000px;
    position: relative;
    z-index: -10;
`;

// -------------- Search Box -----------------

export const MainBoxContainer = styled.div`
    padding: 0 20px;
`;

export const MainBox = styled.div`
    max-width: 699px;
    min-width: 224px;
    height: 800px; 
    padding: 40px;
    margin: 50px auto;
    background: #fafafa;
    border-radius: 10px;
    box-shadow: 2px 5px #888888;
    border: 1px solid #aaaaaa;
`;

export const TitleLine = styled.div`
    height: auto;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
`;

export const TitleDescription = styled.div`
    margin: 10px 0;
    font-size: 16px;
    font-weight: 500;
`;

export const SearchFormContainer = styled.div`
    height: auto;
    margin: 40px auto;
`;

export const SearchForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: auto;
`;

export const SearchLabel = styled.label`
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    width: 80%;
    max-height: 80px;
    font-size: 24px;
    font-weight: 700;
`;

export const InputArea = styled.input`
    margin: 2.5px auto;
    padding: 0 10px;
    height: 50px;
    width: 100%;
    font-size: 24px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 1px 2px #888888;
    border: 1px solid #aaaaaa;
`;

export const SelectInputArea = styled.select`
    margin: 2.5px auto;
    padding: 0 10px;
    height: 50px;
    width: 100%;
    font-size: 24px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 1px 2px #888888;
    border: 1 solid #aaaaaa;

    option {
        background: white;
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
        border-radius: 50px;
    }
`;

export const SubmitButton = styled.input`
    background: green;
    color: white;
    width: 200px;
    height: 50px;
    font-size: 20px;
    font-weight: 700;
    margin: 35px auto;
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

