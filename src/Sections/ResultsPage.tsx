import React, { useState } from 'react';
import './resultsPage.css';
import {PageContainer, PagesSelector, PagesSelectorContainer, PageSizeSelector, NextPageButton, ResultsContainer, TitleLine, ResultsList, ResultCard, CardContainer, CardContent, CardContentText, EndLine, CardTitle, ButtonsContainer, PlainCardButton, CardButton} from '../components/SearchResults/Elements'; 
import { Footer, Copyright, TextLine } from '../components/Footer/Elements';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCopyright, faCheckCircle, faContactCard } from '@fortawesome/free-regular-svg-icons';

function ResultsPageSection(props: {
    jobSearchRef: (jobTitle: string, jobLocation: string, jobIndustry: string, jobType: number, pageNo: number, pageSize: number) => void, 
    fields: {
        jobTitle: string, 
        jobLocation: string, 
        jobIndustry: string, 
        jobType: number
    }, 
    results: {
        jobs: never[],
        maxResults: number,
    }, 
    resultsRef: React.RefObject<HTMLDivElement>,
    pageDetails: {
        pageNo: number, 
        pageSize: number
    },
    setPageDetails: React.Dispatch<React.SetStateAction<{
        pageNo: number, 
        pageSize: number
    }>>}) {

    const [moreBtnPressed, setMoreBtnPressed] = useState("");

    /* Constants to map special page cases to integers that cannot be normally reached. */
    const PREV_PAGE = -1;
    const NEXT_PAGE = -2;
    const FIRST_PAGE = -3;
    const FINAL_PAGE = -4;

    const PAGE_COUNT = Math.floor(props.results['maxResults'] / props.pageDetails.pageSize) + 1;

    function workTypeConverter(code: string) {
        switch (code) {
            case "1":
                return "WORK";
            case "2":
                return "SELF-EMPLOYMENT";
            case "3":
                return "EDUCATION";
            case "34":
                return "INTERNSHIP/TRAINEE";
        }
    }

    function handlePageSizeChange(value: string) {
        const pageSize = parseInt(value);
        props.setPageDetails({
            /* We need to reset the page number as the count changes */
            pageNo: 1, 
            pageSize: pageSize});
        updateSearch(1, pageSize);
    }

    function handlePageChange(pageNo: number) {
        switch (pageNo) {
            case PREV_PAGE:
                if (props.pageDetails.pageNo > 1) {
                    pageNo = props.pageDetails.pageNo - 1;
                } else {
                    pageNo = 1;
                }
                break;
            case NEXT_PAGE:
                if (props.pageDetails.pageNo < PAGE_COUNT - 1) {
                    pageNo = props.pageDetails.pageNo + 1;
                } else {
                    pageNo = PAGE_COUNT;
                }
                break;
            case FIRST_PAGE:
                pageNo = 1;
                break;
            case FINAL_PAGE:
                pageNo = PAGE_COUNT;
                break;
        }

        props.setPageDetails({
            pageNo: pageNo,
            pageSize: props.pageDetails.pageSize,
        });

        updateSearch(pageNo, props.pageDetails.pageSize);
    }

    function updateSearch(pageNo: number, pageSize: number) {
        props.jobSearchRef(
            props.fields.jobTitle, 
            props.fields.jobLocation, 
            props.fields.jobIndustry, 
            props.fields.jobType, 
            pageNo, 
            pageSize);
    }

    function getPages() {
        let pages = [];

        let start_index = 1;
        let end_index = PAGE_COUNT;
        
        /* Show at most 9 pages at once */
        if (PAGE_COUNT > 9) {
            if (props.pageDetails.pageNo > 5) {
                if (props.pageDetails.pageNo < PAGE_COUNT - 4) {
                    start_index = props.pageDetails.pageNo - 4;
                    end_index = props.pageDetails.pageNo + 4;
                } else {
                    start_index = PAGE_COUNT - 8;
                }
            } else {
                end_index = 9;
            }
        }

        for (let i = start_index; i <= end_index; i++) {
            pages.push(i);
        }

        return pages;
    }

    function handleMoreDetails(hashId: string, expand: boolean) {
        if (expand) {
            setMoreBtnPressed(hashId);
        } else {
            setMoreBtnPressed("");
        }
    }

    function parseDescription(description: string) {
        const text = description;
        let key = 0;
        return text.split('\n').map(str => <p key={key++}>{str}<br/></p>);
    }
    
    return (
        <PageContainer ref={props.resultsRef}>
            <ResultsContainer>
                <TitleLine>
                    <FontAwesomeIcon icon={faCheckCircle} color="green" className="ResultsIcon"/>
                    <h4>Search Results</h4>
                    <p>We found approximately {props.results['maxResults']} results to your search</p>
                </TitleLine>
                <ResultsList>
                    {props.results['jobs'].map((result) => (
                        result['titel'] && (
                            <ResultCard key={result['hashId']}>
                                <CardContainer>
                                    <EndLine>
                                        <p>Updated: {result['aktuelleVeroeffentlichungsdatum']}</p>
                                    </EndLine>
                                    <CardTitle>
                                        <h2>{result['titel']}</h2>
                                        <h3>- {result['arbeitgeber']} -</h3>
                                    </CardTitle>
                                    <CardContent>
                                        <FontAwesomeIcon icon={faContactCard} className="NoLogoIcon"/>
                                        {/* {result['logo']['status'] !== 200 && (
                                            <FontAwesomeIcon icon={faContactCard} className="NoLogoIcon"/>
                                        )}
                                        {result['logo']['status'] === 200 && (
                                            <img src={result['logo']['img']} /> 
                                        )}*/}
                                        <CardContentText>
                                            {result['angebotsart'] && (
                                                <p><strong>Offer Type</strong><br/>{workTypeConverter(result['angebotsart'])}</p>
                                            )}
                                            {result['anzahlOffeneStellen'] && (
                                                <p><strong>Vaccancies</strong><br/>{result['anzahlOffeneStellen']}</p>
                                            )}
                                            {result['arbeitgeberAdresse']['land'] && result['arbeitgeberAdresse']['plz'] && (
                                                <p><strong>Company Address</strong><br/>
                                                    {result['arbeitgeberAdresse']['strasse'] && (result['arbeitgeberAdresse']['strasse']) + ", "}
                                                    {result['arbeitgeberAdresse']['region'] && (result['arbeitgeberAdresse']['region']) + ", "} 
                                                    {result['arbeitgeberAdresse']['land'] + ", "}
                                                    {result['arbeitgeberAdresse']['plz']}
                                                </p>
                                            )}
                                            {result['branchengruppe'] && (
                                                <p><strong>Branch Group</strong><br/>{result['branchengruppe']}</p>
                                            )}
                                            {result['branche'] && (
                                                <p><strong>Industry</strong><br/>{result['branche']}</p>
                                            )} 
                                            {result['arbeitgeberdarstellungUrl'] && (
                                                <p><strong>Company Website</strong><br/>
                                                    <a href={result['arbeitgeberdarstellungUrl']} target="_blank" rel="noreferrer">
                                                        {result['arbeitgeberdarstellungUrl']}
                                                    </a>
                                                </p>
                                            )}
                                            <div className={moreBtnPressed === result['hashId'] ? 'section-active' : 'section-closed'}>
                                                {result['stellenbeschreibung'] && (
                                                    <div>
                                                        <p><strong>Description</strong><br/></p>
                                                        {parseDescription(result['stellenbeschreibung'])}
                                                    </div>
                                                )} 
                                            </div>  
                                        </CardContentText>
                                    </CardContent>
                                    <ButtonsContainer>
                                        {moreBtnPressed !== result['hashId'] && (
                                            <PlainCardButton onClick={() => handleMoreDetails(result['hashId'], true)}>
                                                More Details
                                            </PlainCardButton>
                                        )}
                                        {moreBtnPressed === result['hashId'] && (
                                            <PlainCardButton onClick={() => handleMoreDetails(result['hashId'], false)}>
                                                Less Details
                                            </PlainCardButton>
                                        )}
                                        {result['externeUrl'] && (
                                            <CardButton href={result['externeUrl']} target="_blank">
                                                Apply Now
                                            </CardButton>
                                        )}
                                    </ButtonsContainer>
                                </CardContainer>
                            </ResultCard>
                        )
                    ))}
                </ResultsList>
                <PagesSelector>
                    <h3>Select Page</h3>
                    <PagesSelectorContainer>
                        <NextPageButton onClick={() => handlePageChange(FIRST_PAGE)}>First Page {'<<'}</NextPageButton>
                        <NextPageButton onClick={() => handlePageChange(PREV_PAGE)}>Prev {'<'}</NextPageButton>
                        {getPages().map(page => (
                            <NextPageButton
                                onClick={() => handlePageChange(page)} 
                                key={page}
                                className={props.pageDetails.pageNo === page ? "Selected" : ""}>
                                    {page}
                            </NextPageButton>
                        ))}
                        <NextPageButton onClick={() => handlePageChange(NEXT_PAGE)}>{'>'} Next</NextPageButton>
                        <NextPageButton onClick={() => handlePageChange(FINAL_PAGE)}>{'>>'} Last Page</NextPageButton>
                    </PagesSelectorContainer>
                    <h3>Results per page: </h3>
                    <PageSizeSelector
                        name="pageDetails"
                        defaultValue="10"
                        onChange={(event) => handlePageSizeChange(event.target.value)}>
                        <option key="10" value="10">10</option>
                        <option key="20" value="20">20</option>
                        <option key="30" value="30">30</option>
                        <option key="40" value="40">40</option>
                        <option key="50" value="50">50</option>
                    </PageSizeSelector>
                </PagesSelector>
            </ResultsContainer>
            <Footer>
                <Copyright>
                    <TextLine>
                        Copyright
                        <FontAwesomeIcon icon={faCopyright} className="copyright-icon"/>
                        2022 Vlad-Ioan Nicolaescu. All rights reserved.
                    </TextLine>
                    <TextLine>
                        Images & icons are either from personal sources, free licensed or from the API used to fetch the job data.
                    </TextLine>
                </Copyright>
            </Footer>
        </PageContainer>
    )
}

export default ResultsPageSection;


