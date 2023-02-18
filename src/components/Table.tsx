import React from "react";
import "./Table.css"
import { JobType } from "../types/JobType";
import swal from "sweetalert";
import { TablePropsType } from "../types/TablePropsType";


const Table: React.FC<TablePropsType> = ({
    allJobs,
    setAllJobs,
    setJob,
    selectedJobId,
    setSelectedJobId
}) => {

    let draggedTagIndex: number | null = null;
    let dropTargetIndex: number | null = null;

    const handleDeleteJob = async (jobId: string) => {
        const response = await swal({
            title: "Removing the job",
            icon: "warning",
            text: "Are you sure?",
            buttons: ["No", "Yes"],
            dangerMode: true
        });
        if (response) {
            setAllJobs(prevAllJobs => prevAllJobs.filter(job => job.id !== jobId));

            let jobs: JobType[] = JSON.parse(localStorage.getItem("jobs")!);
            jobs = jobs.filter((job: JobType) => job.id !== jobId);
            localStorage.setItem("jobs", JSON.stringify(jobs));
        }

    }

    const handleSelectJob = (jobId: string) => {
        const currentJob: JobType = allJobs.filter(job => job.id === jobId)[0];

        setJob(currentJob.text);
        setSelectedJobId(jobId);
    }

    const handleSetCompleteness = (jobId: string): void => {
        let jobs: JobType[] = JSON.parse(localStorage.getItem("jobs")!);
        jobs = jobs.map(job => {
            if (job.id === jobId) {
                return { ...job, isCompleted: !job.isCompleted };
            }
            return job;
        })

        setAllJobs(jobs);

        localStorage.setItem("jobs", JSON.stringify(jobs));
    }

    const deleteAllJobs = async () => {
        const respsonse = await swal({
            title: "Confirmation",
            icon: "warning",
            text: "Are you sure?",
            buttons: ["No", "Yes"],
            dangerMode: true
        });
        if (respsonse) {
            setAllJobs([]);
            localStorage.removeItem("jobs");
        }
    }

    const deleteCompletedJobs = async () => {
        const response = await swal({
            title: "Confirmation",
            icon: "warning",
            text: "Are you sure?",
            buttons: ["No", "Yes"],
            dangerMode: true
        });
        if(response) {
            let jobs: JobType[] = JSON.parse(localStorage.getItem("jobs")!);
            jobs = jobs.filter(job => !job.isCompleted);
            setAllJobs(jobs);
            localStorage.setItem("jobs", JSON.stringify(jobs));
        }
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
        const draggedJob: JobType = jobs.splice(draggedTagIndex, 1)[0];
        jobs.splice(dropTargetIndex, 0, draggedJob);

        setAllJobs(jobs);
        localStorage.setItem("jobs", JSON.stringify(jobs));

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
                        <tbody className={`${selectedJobId.length > 0 ? "none-pointer-event" : ""}`}>
                            {allJobs.map((job, jobIndex) => {
                                return (
                                    <tr key={job.id} className={`${job.isCompleted ? "table-active" : ""}`}
                                        draggable={true}
                                        onDragStart={handleDragStart} onDragEnd={handleDragEnd}
                                        onDragOver={handleDragOver} onDragLeave={hanldeDragLeave}
                                        onDrop={handleDrop}>
                                        <td>{jobIndex + 1}</td>
                                        <td>{job.text}</td>
                                        <td>
                                            <button type="button" className={`btn 
                                        ${job.isCompleted ? "btn-success" : "btn-danger"}`}
                                                onClick={() => handleSetCompleteness(job.id)}>
                                                {job.isCompleted ? "Completed" : "Incomplete"}
                                            </button>

                                        </td>
                                        <td>
                                            <button type="button" className="btn mx-1 my-1 btn-outline-light"
                                                onClick={() => handleDeleteJob(job.id)}>
                                                Delete
                                            </button>
                                            <button type="button" className="btn mx-1 my-1 btn-outline-light"
                                                onClick={(event: React.MouseEvent) => handleSelectJob(job.id)}>
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className={`mt-4 text-center 
                    ${selectedJobId.length > 0 ? "none-pointer-event" : ""}`}>
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