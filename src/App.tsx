import React, { useState, CSSProperties } from 'react';
import SearchPageSection from './Sections/SearchPage';
import ResultsPageSection from './Sections/ResultsPage';
import RingLoader from "react-spinners/RingLoader";
import { Buffer } from 'buffer';
import utf8 from 'utf8';
import './App.css';
import {NoResults, TryAgainButton} from "./components/Utils/Elements";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEye } from '@fortawesome/free-regular-svg-icons';

const override: CSSProperties = {
    display: "block",
    margin: "40vh auto",
    borderColor: "green",
}

function App() {
  const resultsRef = React.useRef<HTMLDivElement>(null);
  const loadingRef = React.useRef<HTMLDivElement>(null);
  const loaderRef = React.useRef<HTMLDivElement>(null);
  const noResultsRef = React.useRef<HTMLDivElement>(null);
  const [results, setResults] = useState({
    jobs: [],
    maxResults: 0,
  });

  const [fields, setFields] = useState({
      jobTitle: "",
      jobLocation: "",
      jobIndustry: "",
      jobType: 1,
  });

  const [pageDetails, setPageDetails] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const encode = (str: string):string => Buffer.from(str, 'binary').toString('base64');

  let params = "";

  function addParam(label: string, value: string) {
      if (value) {
          if (params.length > 0) {
              params += "&";
          }
          params += label + "=" + value;
      }
  }

  function jobSearch(jobTitle: string, jobLocation: string, jobIndustry: string, jobType: number, pageNo: number, pageSize: number) {
      addParam("what", jobTitle);
      addParam("where", jobLocation);
      addParam("industry", jobIndustry);
      addParam("type", jobType.toString());
      addParam("page_no", pageNo.toString());
      addParam("page_size", pageSize.toString());

      if (params.length > 0) {
          params = "?" + params;
      }

      loadingRef.current!.style.display = "block";

      fetch("https://germany-job-search-server.herokuapp.com/job-search" + params, {
          "method": "GET",
      }).then(async response => {
          const results = await response.json();
          results['jobs'].map((job: any) => {
            const base64string = encode(utf8.encode(job['logo']['img']));
            job['logo']['img'] = "data:image/png;base64," + base64string;
            return job['logo']['img'];
          });
          setResults(results);
          if (results['maxResults'] > 0) {
              resultsRef.current!.style.display = "block";
              resultsRef.current!.scrollIntoView({behavior: "smooth"});
              loadingRef.current!.style.display = "none";
          } else {
              resultsRef.current!.style.display = "none";
              loaderRef.current!.style.display = "none";
              noResultsRef.current!.style.display = "block";
          }
      }).catch(err => { 
          console.log(err); 
      });
  }

  function closeNoResultsPage() {
    loadingRef.current!.style.display = "none";
    noResultsRef.current!.style.display = "none";
    loaderRef.current!.style.display = "block";
  }

  return (
    <div className="App">
      <SearchPageSection 
        jobSearchRef={jobSearch} 
        fields={fields} 
        setFields={setFields} 
        setPageDetails={setPageDetails}/>
      <ResultsPageSection 
        jobSearchRef={jobSearch} 
        resultsRef={resultsRef}
        results={results} fields={fields} 
        pageDetails={pageDetails} 
        setPageDetails={setPageDetails} />
      <div className="LoadingScreen" ref={loadingRef}>
        <NoResults ref={noResultsRef}>
          <FontAwesomeIcon icon={faEye} className="NoResultsIcon"/>
          <p>Sorry, we could not find any results for your search </p>
          <TryAgainButton onClick={closeNoResultsPage}>
            <p>Try Again</p> 
          </TryAgainButton>
        </NoResults>
        <div ref={loaderRef}>
          <RingLoader
              color="green"
              cssOverride={override}
              size={150}
            />
          </div>
        </div>
    </div>
  );
}

export default App;
