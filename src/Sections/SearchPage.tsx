import React from 'react';
import './searchPage.css';
import {MainPage, MainPageVideo, MainPageContent, LandingPageBg, TitleLine, TitleDescription, MainBoxContainer, MainBox, SearchFormContainer, SearchForm, SearchLabel, InputArea, SelectInputArea, SubmitButton} from '../components/SearchPage/Elements'; 

const TitleLineSection = (props: {title: string, description: string}) => {
    return (
        <TitleLine>
            <p>{props.title}</p>
            <TitleDescription>
                <p>{props.description}</p>
            </TitleDescription>
        </TitleLine>
    );
}

const MainSearchBox = (props: {
    jobSearchRef: (jobTitle: string, jobLocation: string, jobIndustry: string, jobType: number, pageNo: number, pageSize: number) => void, 
    fields: {
        jobTitle: string, 
        jobLocation: string, 
        jobIndustry: string, 
        jobType: number
    }, 
    setFields: React.Dispatch<React.SetStateAction<{
        jobTitle: string, 
        jobLocation: string, 
        jobIndustry: string, 
        jobType: number
    }>>,
    setPageDetails: React.Dispatch<React.SetStateAction<{
        pageNo: number, 
        pageSize: number
    }>>}) => {

    return (
        <MainBoxContainer>
            <MainBox>
                <TitleLineSection title="Germany Job Search" description="Retrieve details of job advertisements and information about employers" />
                <Form jobSearchRef={props.jobSearchRef} fields={props.fields} setFields={props.setFields} setPageDetails={props.setPageDetails} />
            </MainBox>
        </MainBoxContainer>
    );
}

const Form = (props: {
    jobSearchRef: (jobTitle: string, jobLocation: string, jobIndustry: string, jobType: number, pageNo: number, pageSize: number) => void, 
    fields: {
        jobTitle: string, 
        jobLocation: string, 
        jobIndustry: string, 
        jobType: number
    }, 
    setFields: React.Dispatch<React.SetStateAction<{
        jobTitle: string, 
        jobLocation: string, 
        jobIndustry: string, 
        jobType: number
    }>>,
    setPageDetails: React.Dispatch<React.SetStateAction<{
        pageNo: number, 
        pageSize: number
    }>>}) => {

    const positionTypes = ["WORK", "SELF-EMPLOYMENT", "EDUCATION", "INTERNSHIP/TRAINEE"]

    function handleSearch(event: any) {
        props.jobSearchRef(props.fields.jobTitle, props.fields.jobLocation, props.fields.jobIndustry, props.fields.jobType, 1, 10);
        props.setPageDetails({pageNo: 1, pageSize: 10});
        event.preventDefault();
    }

    function workTypeConverter(code: string) {
        switch (code) {
            case "WORK":
                return "1";
            case "SELF-EMPLOYMENT":
                return "2";
            case "EDUCATION":
                return "3";
            case "INTERNSHIP/TRAINEE":
                return "34";
        }
    }

    return (
        <SearchFormContainer onSubmit={handleSearch}>
            <SearchForm>
                <SearchLabel>
                    Job Title
                    <InputArea
                        type="text"
                        name="jobTitle"
                        placeholder="e.g. Referatsleiter"
                        value={props.fields.jobTitle}
                        onChange={(event) => props.setFields({
                            jobTitle: event.target.value, 
                            jobLocation: props.fields.jobLocation, 
                            jobIndustry: props.fields.jobIndustry, 
                            jobType: props.fields.jobType})}/>
                </SearchLabel>
                <SearchLabel>
                    Location
                    <InputArea
                        type="text"
                        name="jobLocation"
                        placeholder="e.g. Berlin"
                        value={props.fields.jobLocation}
                        onChange={(event) => props.setFields({
                            jobTitle: props.fields.jobTitle, 
                            jobLocation: event.target.value, 
                            jobIndustry: props.fields.jobIndustry, 
                            jobType: props.fields.jobType})}/>
                </SearchLabel>
                <SearchLabel>
                    Industry
                    <InputArea
                        type="text"
                        name="jobIndustry"
                        placeholder="e.g. Informatik"
                        value={props.fields.jobIndustry}
                        onChange={(event) => props.setFields({
                            jobTitle: props.fields.jobTitle, 
                            jobLocation: props.fields.jobLocation, 
                            jobIndustry: event.target.value, 
                            jobType: props.fields.jobType})}/>
                </SearchLabel>
                <SearchLabel>
                    Position Type
                    <SelectInputArea
                        name="jobType" 
                        className="InputArea"
                        defaultValue="1"
                        onChange={(event) => props.setFields({
                            jobTitle: props.fields.jobTitle, 
                            jobLocation: props.fields.jobLocation, 
                            jobIndustry: props.fields.jobIndustry, 
                            jobType: parseInt(event.target.value)})}>
                        {positionTypes.map((type) => (
                            <option key={workTypeConverter(type)} value={workTypeConverter(type)}>{type}</option>
                        ))}
                    </SelectInputArea>
                </SearchLabel>
                <SubmitButton type="submit" value="Search" />
            </SearchForm>
        </SearchFormContainer>
    );
}

function SearchPageSection(props: {
    jobSearchRef: (jobTitle: string, jobLocation: string, jobIndustry: string, jobType: number, pageNo: number, pageSize: number) => void, 
    fields: {
        jobTitle: string, 
        jobLocation: string, 
        jobIndustry: string, 
        jobType: number
    },
    setFields: React.Dispatch<React.SetStateAction<{
        jobTitle: string, 
        jobLocation: string, 
        jobIndustry: string, 
        jobType: number}>>,
    setPageDetails: React.Dispatch<React.SetStateAction<{
        pageNo: number, 
        pageSize: number
    }>>}) {

    return (
        <div id="searchPage">
            <MainPage>
                <MainPageVideo loop autoPlay muted>
                    <source src={require('../assets/mainBgVideo')} type="video/mp4" />
                </MainPageVideo>
                <MainPageContent>
                    <MainSearchBox jobSearchRef={props.jobSearchRef} fields={props.fields} setFields={props.setFields} setPageDetails={props.setPageDetails} />
                </MainPageContent>
            </MainPage>
            <LandingPageBg />
        </div>
    )
}

export default SearchPageSection;