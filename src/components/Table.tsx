import React from "react";
import "./Table.css"
import { JobType } from "../Types/JobType";
import swal from "sweetalert";

type SetAllJobsParameter = (prevState: JobType[]) => JobType[]

type TableProps = {
    allJobs : JobType[] ,
    setAllJobs : (newAllJobs: JobType[] | SetAllJobsParameter) => void
}


const Table: React.FC<TableProps> = (props) => {
    const {allJobs , setAllJobs} = props;

    const deleteJob = (jobId: string): void => {
        swal({
            title: "Confirmation" ,
            icon : "warning" ,
            text : "Are you sure?" ,
            buttons : ["No" , "Yes"] ,
            dangerMode : true
        })
        .then(value => {
            if(value) {
                setAllJobs(prevState => {
                    return prevState.filter(job => job.id !== jobId)
                });
        
                let jobs: JobType[] = JSON.parse(localStorage.getItem("jobs")!);
                jobs = jobs.filter((job: JobType) => job.id !== jobId);
                localStorage.setItem("jobs" , JSON.stringify(jobs));
            }
        });
    }

    const handleCompleteness = (jobId : string): void => {
        let jobs: JobType[] = JSON.parse(localStorage.getItem("jobs")!);
        jobs.forEach(job => {
            if(job.id === jobId) {
                job.isCompleted = !job.isCompleted;
            }
        })

        setAllJobs(jobs);

        localStorage.setItem("jobs" , JSON.stringify(jobs));
    }

    const deleteAllJobs = () => {
        swal({
            title: "Confirmation" ,
            icon : "warning" ,
            text : "Are you sure?" ,
            buttons : ["No" , "Yes"] ,
            dangerMode : true
        })
        .then(value => {
            if(value) {
                setAllJobs([]);
                localStorage.removeItem("jobs");
            }
        });
    }

    const deleteCompletedJobs = () => {
        swal({
            title: "Confirmation" ,
            icon : "warning" ,
            text : "Are you sure?" ,
            buttons : ["No" , "Yes"] ,
            dangerMode : true
        })
        .then(value => {
            if(value) {
                let jobs: JobType[] = JSON.parse(localStorage.getItem("jobs")!);
                jobs = jobs.filter(job => job.isCompleted === false);
                setAllJobs(jobs);
                localStorage.setItem("jobs" , JSON.stringify(jobs));
            }
        });
    }


    return (
        <div className={`table-container mx-auto rounded-4 my-5 px-3 py-4 
        ${allJobs.length === 0 ? "d-flex justify-content-center align-items-center" : "table-responsive"}`}>
           {allJobs.length > 0 ? (
             <>
                <h1 className="text-center mb-4">Jobs Table</h1>
                <table className="table table-dark table-bordered table-hover
                w-100 mx-auto text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Job</th>
                            <th>Completeness</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allJobs.map((job , jobIndex) => {
                            return (
                                <tr key={job.id} className={`${job.isCompleted ? "table-active" : ""}`}>
                                    <td>{jobIndex}</td>
                                    <td>{job.text}</td>
                                    <td>
                                        <button type="button" className={`btn 
                                        ${job.isCompleted ? "btn-success" : "btn-danger"}`}
                                        onClick={() => handleCompleteness(job.id)}>
                                            {job.isCompleted ? "Completed" : "Incomplete"}
                                        </button>
                                        
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-outline-light" 
                                        onClick={() => deleteJob(job.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="mt-4 text-center">
                        <button type="button" className="btn btn-danger btn-lg mx-2 my-1"
                        onClick={deleteAllJobs}>
                            Delete All Jobs
                        </button>
                        <button type="button" className="btn btn-secondary btn-lg mx-2 my-1"
                        onClick={deleteCompletedJobs}>
                            Delete Completed Jobs
                        </button>
                </div>
             </>
           ) : (
            <h1>No jobs to show!</h1>
           )}
        </div>
    )
}

export default Table;