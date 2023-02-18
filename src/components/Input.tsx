import React, { useRef } from 'react';
import "./Input.css";
import { JobType } from "../types/JobType";
import { jobValidation } from '../utils/jobValidation';
import { InputPropsType } from '../types/InputPropsType';


const Input: React.FC<InputPropsType> = ({
    setAllJobs,
    job,
    setJob,
    selectedJobId,
    setSelectedJobId
}) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleAddNewJob = () => {
        if (selectedJobId.length === 0) {
            if (!jobValidation(job)) {
                return;
            }

            const newJob: JobType = {
                id: Math.random().toString(),
                text: job,
                isCompleted: false
            }

            setAllJobs(prevState => [...prevState, newJob]);

            let jobs: JobType[] = localStorage.getItem("jobs") ? JSON.parse(localStorage.getItem("jobs")!) : [];
            jobs = [...jobs, newJob];
            localStorage.setItem("jobs", JSON.stringify(jobs));

            setJob("");
        }
        else {
            if (!jobValidation(job)) {
                return;
            }

            let jobs: JobType[] = JSON.parse(localStorage.getItem("jobs")!);
            jobs = jobs.map((j: JobType) => {
                if (j.id === selectedJobId) {
                    j = { ...j, text: job };
                }
                return j;
            });
            setAllJobs(jobs);
            localStorage.setItem("jobs", JSON.stringify(jobs));

            setSelectedJobId("");
            setJob("");
        }
        inputRef.current?.focus();
    }

    const handleAddNewJobWithKeyboard = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleAddNewJob();
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
                ref={inputRef} value={job}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setJob(event.target.value)}
                onKeyDown={handleAddNewJobWithKeyboard} />
            <div className="my-2">
                <button type="button" className="btn btn-success btn-lg mx-1"
                    onClick={handleAddNewJob}>
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
