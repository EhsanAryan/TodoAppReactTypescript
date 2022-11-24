import React from 'react';
import swal from 'sweetalert';
import "./Input.css";
import { JobType } from "../Types/JobType";


type SetAllJobsParameterType = (prevState: JobType[]) => JobType[];

type SetJobParameterType = (prevJob: string) => string;

type SetSelectedJobIdParameterType = (prevJobId: string) => string;

type InputProps = {
    allJobs : JobType[] ,
    setAllJobs : (newAllJobs: JobType[] | SetAllJobsParameterType) => void ,
    job : string ,
    setJob : (newJob: string | SetJobParameterType) => void ,
    selectedJobId : string ,
    setSelectedJobId : (newSelectedJobId: string | SetSelectedJobIdParameterType) => void
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
    const {setAllJobs , job , setJob , selectedJobId , setSelectedJobId} = props;


    const addNewJob = () => {
        if(selectedJobId.length === 0) {
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
        else {
            if(!handleJobValidation(job)) {
                return;
            }
            
            let jobs: JobType[] = JSON.parse(localStorage.getItem("jobs")!);
            jobs = jobs.map((j: JobType) => {
                if(j.id === selectedJobId) {
                    j = {...j , text: job};
                }
                return j;
            });
            setAllJobs(jobs);
            localStorage.setItem("jobs" , JSON.stringify(jobs));

            setSelectedJobId("");
            setJob("");
        }
    }

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter"){
            addNewJob();
        }
    }

    const cancelEditting = () => {
        setSelectedJobId("");
        setJob("");
    }


    return (
        <div className="input-section mx-auto mt-4 rounded-4 
        d-flex flex-column justify-content-center align-items-center">
            <input type="text" className="form-control w-75 mx-auto my-2" placeholder="Enter new job..."
            value={job} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setJob(event.target.value)}
            onKeyDown={handleEnter} />
           <div className="my-2">
                <button type="button" className="btn btn-success btn-lg mx-1"
                onClick={addNewJob}>
                    {selectedJobId.length !== 0 ? "Edit" : "Add"}
                </button>
                {selectedJobId.length !== 0 ? (
                    <button type="button" className="btn btn-danger btn-lg mx-1"
                    onClick={cancelEditting}>
                        Cancel
                    </button>
                ) : null}
           </div>
        </div>
    )
}

export default Input;
