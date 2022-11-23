import React , { useState } from 'react';
import swal from 'sweetalert';
import "./Input.css";
import { JobType } from "../Types/JobType";

type SetAllJobsParameter = (prevState: JobType[]) => JobType[]

type InputProps = {
    allJobs : JobType[] ,
    setAllJobs : (newAllJobs: JobType[] | SetAllJobsParameter) => void
}

const handleJobValidation = (job: string): boolean => {
    let isValid = true;
    const jobPattern = /[a-zA-Z]/;

    isValid = isValid && job.length > 0;
    if(!isValid) {
        swal({
            title : "Error!" ,
            icon : "error" ,
            text: "The job field can't be empty."
        });
        return isValid;
    }

    isValid = isValid && jobPattern.test(job);
    if(!isValid) {
        swal({
            title : "Error!" ,
            icon : "error" ,
            text: "The job must also contain letters of the alphabet."
        });
        return isValid;
    }

    return isValid;
}


const Input: React.FC<InputProps> = (props) => {
    const {setAllJobs} = props;

    const [job , setJob] = useState<string>("");

    const addNewJob = () => {
        if(!handleJobValidation(job)) {
            return;
        }

        const newJob: JobType = {
            id: Math.random().toString() ,
            text : job ,
            isCompleted : false
        }

        setAllJobs(prevState => {
            return [...prevState , newJob];
        });

        let jobs: JobType[] = localStorage.getItem("jobs") ? JSON.parse(localStorage.getItem("jobs")!) : [];
        jobs = [...jobs , newJob];
        localStorage.setItem("jobs" , JSON.stringify(jobs));

        setJob("");
    }

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter"){
            addNewJob();
        }
    }


    return (
        <div className="input-section mx-auto mt-5 rounded-4 
        d-flex flex-column justify-content-center align-items-center">
            <input type="text" className="form-control w-75 mx-auto my-2" placeholder="Enter new job..."
            value={job} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setJob(event.target.value)}
            onKeyDown={handleEnter} />
            <button type="button" className="btn btn-success btn-lg my-2"
            onClick={addNewJob}>
                Add
            </button>
        </div>
    )
}

export default Input;
