import { JobType } from "./JobType";

type SetAllJobsParameterType = (prevState: JobType[]) => JobType[]

type SetJobParameterType = (prevJob: string) => string;

type SetSelectedJobIdParameterType = (prevJobId: string) => string;

export type TablePropsType = {
    allJobs: JobType[],
    setAllJobs: (newAllJobs: JobType[] | SetAllJobsParameterType) => void,
    job: string,
    setJob: (newJob: string | SetJobParameterType) => void,
    selectedJobId: string,
    setSelectedJobId: (newSelectedJobId: string | SetSelectedJobIdParameterType) => void
}