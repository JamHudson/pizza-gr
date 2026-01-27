document.getElementById("pizza-form").onsubmit = validate;

function validate() {
    let isValid = true;

    clearErrors();

    let fname = document.getElementById("fname").value.trim();
    if (!fname) {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }
    let lname = document.getElementById("lname").value.trim();
    if (!lname) {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }
    let email = document.getElementById("email").value.trim();
    if (!email) {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }
    
    let size = document.getElementById("size").value;
    if (size == "none") {
        document.getElementById("err-size").style.display = "block";
        isValid = false;
    }

    let pickup = document.getElementById("pickup");
    let delivery = document.getElementById("delivery");
    if (!pickup.checked && !delivery.checked) {
        document.getElementById("err-collection").style.display = "block";
        isValid = false;
    }

    return isValid;
}

// Clear all errors when form is submitted.
function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i=0;i<errors.length;i++) {
        errors[i].style.display = "none";
    }
}