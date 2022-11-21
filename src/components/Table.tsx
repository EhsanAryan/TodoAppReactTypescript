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
        setAllJobs(prevState => {
            return prevState.filter(job => job.id !== jobId)
        })
    }

    return (
        <div className={`table-container mx-auto rounded-4 my-5 px-3 py-4 
        ${allJobs.length === 0 ? "d-flex justify-content-center align-items-center" : "table-responsive"}`}>
           {allJobs.length > 0 ? (
             <>
                <h1 className="text-center mb-4">Jobs Table</h1>
                <table className="table table-dark table-bordered table-striped table-hover
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
                                <tr key={job.id}>
                                    <td>{jobIndex}</td>
                                    <td>{job.text}</td>
                                    <td>
                                        {job.isCompleted ? "Completed" : "Incomplete"}
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-light" 
                                        onClick={() => deleteJob(job.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
             </>
           ) : (
            <h1>No jobs to show!</h1>
           )}
        </div>
    )
}

export default Table;