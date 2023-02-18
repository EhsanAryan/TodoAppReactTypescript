import swal from "sweetalert";

export const jobValidation = (job: string): boolean => {
    let isValid = true;
    const jobPattern = /^[a-zA-Z\u0600-\u06FF0-9\s]+$/;

    isValid = isValid && job.trim().length > 0;
    if (!isValid) {
        swal({
            title: "Empty Field!",
            icon: "error",
            text: "The job field can't be empty!"
        });
        return isValid;
    }

    isValid = isValid && jobPattern.test(job);
    if (!isValid) {
        swal({
            title: "Wrong Format!",
            icon: "error",
            text: "Only use Persian and English letters and numbers!"
        });
        return isValid;
    }

    return isValid;
}