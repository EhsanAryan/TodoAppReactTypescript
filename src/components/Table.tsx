import React, { useEffect, useState } from "react";
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

    const [searchChars, setSearchChars] = useState<string>("");

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
            let jobs: JobType[] = JSON.parse(localStorage.getItem("jobs")!);
            setAllJobs(jobs.filter(job => job.id !== jobId));
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
        if (response) {
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
        let jobs = JSON.parse(localStorage.getItem("jobs")!);
        const draggedJob: JobType = jobs.splice(draggedTagIndex, 1)[0];
        jobs.splice(dropTargetIndex, 0, draggedJob);

        setAllJobs(jobs);
        localStorage.setItem("jobs", JSON.stringify(jobs));

        draggedTagIndex = null;
        dropTargetIndex = null;
    }

    useEffect(() => {
        const jobs: JobType[] = localStorage.getItem("jobs") ? JSON.parse(localStorage.getItem("jobs")!) : [];
        const newJobs = jobs.filter((j: JobType) => {
            return j.text.toLowerCase().includes(searchChars.trim().toLowerCase())
        });
        setAllJobs(newJobs);
    }, [searchChars])


    return (
        <div className="table-container container mx-auto rounded-4 my-5 px-3 py-4 table-responsive">
            <div className="row mb-4">
                <h1 className="col-12 col-md-6 col-lg-4 m-0 text-center text-md-start">
                    Jobs Table
                </h1>
                <div className="col-12 col-md-6 col-lg-4 ms-auto mt-3 mt-md-0">
                    <input type="text" className="form-control" placeholder="Enter job title..."
                        value={searchChars}
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setSearchChars(ev.target.value)} />
                </div>
            </div>
            {allJobs.length > 0 ? (
                <>
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
                                                onClick={() => handleSelectJob(job.id)}>
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
                <div className="h1 text-center my-5">No jobs to show!</div>
            )}
        </div>
    )
}

export default Table;