const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

// Show error outline
const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector('small');
    small.innerText = message;
};

// Show success outline
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
};

// Get fieldname 
const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Check email is valid 
const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
       showError(input, "Email is not valid");
    }
};

// Check input length
const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
};

// Check required fields
const checkRequired = (inputArr) => {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });  
};

// Check password match
const checkPasswordsMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        showError(input2, "Passwords do not match");
    }
};

// Form submission
form.addEventListener('submit', event => {
    event.preventDefault();
    checkRequired([username, email, password, confirmPassword]);
    checkLength(username, 3, 15);
    checkLength(email, 5, 25);
    checkEmail(email);
    checkPasswordsMatch(password, confirmPassword);
});