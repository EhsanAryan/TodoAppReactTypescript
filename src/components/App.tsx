import React , { useEffect, useState } from 'react';
import Input from "./Input";
import Table from "./Table";
import "./App.css";
import { JobType } from "../Types/JobType";


const App: React.FC = () => {
  const [allJobs , setAllJobs] = useState<JobType[]>([]);
  const [job , setJob] = useState<string>("");
  const [selectedJobId , setSelectedJobId] = useState<string>("");


  useEffect(() => {
    if(localStorage.getItem("jobs")) {
      setAllJobs(JSON.parse(localStorage.getItem("jobs")!));
    }
  } , []);

  return (
    <div className='app-div'>
      <Input allJobs={allJobs} setAllJobs={setAllJobs} job={job} setJob={setJob} 
      selectedJobId={selectedJobId} setSelectedJobId={setSelectedJobId} />
      <Table allJobs={allJobs} setAllJobs={setAllJobs} job={job} setJob={setJob} 
      selectedJobId={selectedJobId} setSelectedJobId={setSelectedJobId} />
    </div>
  );
}

export default App;
