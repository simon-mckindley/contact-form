const form = document.querySelector("form");
const dialog = document.querySelector(".success-diag");

const textInputs = document.querySelectorAll("input[type=text], input[type=email], textarea");
const firstnameWrapper = document.getElementById("fname-wrapper");
const lastnameWrapper = document.getElementById("lname-wrapper");
const emailWrapper = document.getElementById("email-wrapper");
const messageWrapper = document.getElementById("message-wrapper");

const radioInputs = document.querySelectorAll("input[type=radio]");
const radioError = document.getElementById("query-error");

const checkboxInputs = document.querySelectorAll("input[type=checkbox]");
const checkboxError = document.getElementById("consent-error");


function validateInputs() {
    let isValid = true;

    const validations = [
        () => validateText(firstnameWrapper),
        () => validateText(lastnameWrapper),
        () => validateText(emailWrapper),
        () => validateText(messageWrapper),
        () => validateChecked(radioInputs, radioError),
        () => validateChecked(checkboxInputs, checkboxError)
    ];

    validations.forEach(validation => {
        if (!validation()) {
            isValid = false;
        }
    });

    return isValid;
}


function validateText(wrapper) {
    const input = wrapper.querySelector("input") || wrapper.querySelector("textarea");

    // Has non-blank text
    if (input.value.trim() != "") {
        if (input.tagName === "TEXTAREA") {
            return true;
        } else {
            return validateTextContent(wrapper, input);
        }
    }

    wrapper.classList.add("input-invalid");
    wrapper.querySelector(".error").textContent = "This field is required";
    return false;
}


function validateTextContent(wrapper, input) {
    let type = "name";
    let regex = /^[a-zA-Z\s]+$/;

    if (input.type === "email") {
        type = "email address";
        regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    }

    if (regex.test(input.value)) {
        return true;
    }

    wrapper.classList.add("input-invalid");
    wrapper.querySelector(".error").textContent = "Please enter a valid " + type;
    return false;
}


function validateChecked(inputs, errorEl) {
    let valid = false;

    inputs.forEach((input) => {
        if (input.checked) {
            valid = true;
            return;
        }
    });

    errorEl.style.display = (valid) ? "" : "block";
    return valid;
}


function resetTextError(input) {
    input.parentElement.classList.remove("input-invalid");
}


function resetError(errorElement) {
    errorElement.style.display = "";
}


form.addEventListener("submit", function (event) {
    event.preventDefault();

    let valid = validateInputs();
    console.log(valid);

    if (valid) {
        dialog.showModal();
    }
});

textInputs.forEach((input) => {
    input.addEventListener("keyup", function () {
        resetTextError(this);
    });
});

radioInputs.forEach((input) => {
    input.addEventListener("change", () => resetError(radioError));
});

checkboxInputs.forEach((input) => {
    input.addEventListener("change", () => resetError(checkboxError));
});

document.querySelector(".diag-close").addEventListener("click", () => dialog.close());

