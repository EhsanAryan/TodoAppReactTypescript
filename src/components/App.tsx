import React , { useEffect, useState } from 'react';
import Input from "./Input";
import Table from "./Table";
import "./App.css";
import { JobType } from "../Types/JobType";


const App: React.FC = () => {
  const [allJobs , setAllJobs] = useState<JobType[]>([]);

  useEffect(() => {
    if(localStorage.getItem("jobs")) {
      setAllJobs(JSON.parse(localStorage.getItem("jobs")!));
    }
  } , []);

  return (
    <div className='app-div'>
      <Input allJobs={allJobs} setAllJobs={setAllJobs} />
      <Table allJobs={allJobs} setAllJobs={setAllJobs} />
    </div>
  );
}

export default App;
