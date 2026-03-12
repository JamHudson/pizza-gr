export function validateForm(data) {
    console.log("Server side validation happens here");
    console.log(data);

    const errors = [];

    if (!data.fname || data.fname.trim() == "") {
        errors.push("First name is required.");
    }
    if (!data.lname || data.lname.trim() == "") {
        errors.push("Last name is required.");
    }
    if (!data.email || data.email.trim() == "") {
        errors.push("Email is required.");
    }
    const validMethods = ['pickup', 'delivery'];
    if (!validMethods.includes(data.method)) {
        errors.push("Method is required.");
    }
    const validSize = ['small','medium','large'];
    if (!validSize.includes(data.size)) {
        errors.push("Size is not valid.");
    }

    console.log(errors);
    return {
        isValid: (errors.length === 0),
        errors
    };
}