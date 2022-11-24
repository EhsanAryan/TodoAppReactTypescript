import React , { useRef } from "react";
import "./Table.css"
import { JobType } from "../Types/JobType";
import swal from "sweetalert";


type SetAllJobsParameterType = (prevState: JobType[]) => JobType[]

type SetJobParameterType = (prevJob: string) => string;

type SetSelectedJobIdParameterType = (prevJobId: string) => string;

type TableProps = {
    allJobs : JobType[] ,
    setAllJobs : (newAllJobs: JobType[] | SetAllJobsParameterType) => void ,
    job : string ,
    setJob : (newJob: string | SetJobParameterType) => void  ,
    selectedJobId : string ,
    setSelectedJobId : (newSelectedJobId: string | SetSelectedJobIdParameterType) => void
}


const Table: React.FC<TableProps> = (props) => {
    const {allJobs , setAllJobs , setJob , selectedJobId , setSelectedJobId} = props;

    const tableBodyRef = useRef<HTMLTableSectionElement>(null)

    let draggedTagIndex: number | null = null;
    let dropTargetIndex: number | null = null;

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

    const selectJob = (jobId : string , event: React.MouseEvent) => {
        const currentJob: JobType = allJobs.filter(job => job.id === jobId)[0];

        setJob(currentJob.text);
        setSelectedJobId(jobId);
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

    const handleDragStart = (event: React.DragEvent<HTMLTableRowElement>) => {
        event.currentTarget.classList.add("dragged");
        draggedTagIndex = Number(event.currentTarget.querySelector("td:first-child")!.innerHTML) - 1;
    }

    const handleDragEnd = (event: React.DragEvent<HTMLTableRowElement>) => {
        event.currentTarget.classList.remove("dragged");
        draggedTagIndex = null;
    }

    const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
        event.preventDefault();
        dropTargetIndex = Number(event.currentTarget.querySelector("td:first-child")!.innerHTML) - 1;
    }

    const hanldeDragLeave = () => {
        dropTargetIndex = null;
    }

    const handleDrop = (event: React.DragEvent<HTMLTableRowElement>) => {
        event.preventDefault();
        const jobs = JSON.parse(localStorage.getItem("jobs")!);
        const draggedJob: JobType = jobs.splice(draggedTagIndex , 1)[0];
        jobs.splice(dropTargetIndex , 0 , draggedJob);

        setAllJobs(jobs);
        localStorage.setItem("jobs" , JSON.stringify(jobs));
        
        draggedTagIndex = null;
        dropTargetIndex = null;
    }

    return (
        <div className={`table-container container mx-auto rounded-4 my-5 px-3 py-4
        ${allJobs.length === 0 ? "d-flex justify-content-center align-items-center" : "table-responsive"}`}>
           {allJobs.length > 0 ? (
             <>
                <h1 className="text-center mb-4">Jobs Table</h1>
                <table className="table table-dark table-bordered table-hover
                w-100 mx-auto text-center align-middle">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Job</th>
                            <th>Completeness</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody ref={tableBodyRef}>
                        {allJobs.map((job , jobIndex) => {
                            return (
                                <tr key={job.id} className={`${job.isCompleted ? "table-active" : ""}
                                ${selectedJobId.length !== 0 ? "none-pointer-event" : ""}`}
                                draggable={true}
                                onDragStart={handleDragStart} onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver} onDragLeave={hanldeDragLeave}
                                onDrop={handleDrop}>
                                    <td>{jobIndex+1}</td>
                                    <td>{job.text}</td>
                                    <td>
                                        <button type="button" className={`btn 
                                        ${job.isCompleted ? "btn-success" : "btn-danger"}`}
                                        onClick={() => handleCompleteness(job.id)}>
                                            {job.isCompleted ? "Completed" : "Incomplete"}
                                        </button>
                                        
                                    </td>
                                    <td>
                                        <button type="button" className="btn mx-1 my-1 btn-outline-light" 
                                        onClick={() => deleteJob(job.id)}>
                                            Delete
                                        </button>
                                        <button type="button" className="btn mx-1 my-1 btn-outline-light" 
                                        onClick={(event: React.MouseEvent) => selectJob(job.id , event)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="mt-4 text-center">
                        <button type="button" className={`btn btn-danger btn-lg mx-2 my-1
                        ${selectedJobId.length !== 0 ? "none-pointer-event" : ""}`}
                        onClick={deleteAllJobs}>
                            Delete All Jobs
                        </button>
                        <button type="button" className={`btn btn-secondary btn-lg mx-2 my-1
                        ${selectedJobId.length !== 0 ? "none-pointer-event" : ""}`}
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