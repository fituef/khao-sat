// Get the input field
// Execute a function when the user releases a key on the keyboard
const form = document.forms['submit-to-google-sheet'];
form.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        form.submit();
    }
});

function stepSetSinhVien() {
    var masv = $.trim($("input[name='txtHoTen']").val());
    if (masv == '') {
        alert("VUI LÒNG NHẬP HỌ TÊN");
        return false;
    } 
    var email = $.trim($("input[name='txtEmail']").val());
    if (email == '') {
        alert("VUI LÒNG NHẬP EMAIL");
        return false;
    }  
    doLoading()
        .then(doSetSinhVien)
        .then(doComplete);
}

function doLoading() {
    return new Promise(function(resolve, reject) {
        document.querySelector('.js-loading').classList.remove('is-hidden');
        resolve();
    });
}

function doSetSinhVien() {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}

function doComplete() {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            document.querySelector('.js-loading').classList.add('is-hidden');
        }, 1000);
        resolve();
    });
}


const scriptURL = 'https://script.google.com/macros/s/AKfycbwSsuq53pvciZjjghnJSBZ57Ge7DUohz8f1H36v8DQ778bqqgrybzf45miMOyZ1dNsT/exec';

const loading = document.querySelector('.js-loading');
const successMessage = document.querySelector('.js-success-message');
const errorMessage = document.querySelector('.js-error-message');

form.addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('.js-loading').classList.remove('is-hidden');
    showLoadingIndicator();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => showSuccessMessage(response))
        .catch(error => showErrorMessage(error));
})

function showLoadingIndicator() {
    form.classList.add('is-hidden');
    document.querySelector('.js-loading').classList.remove('is-hidden');
    $("#loadingOK").show();
}

function showSuccessMessage(response) {
    console.log('Success!', response);
    setTimeout(() => {
        successMessage.classList.remove('is-hidden');
        $("#loadingOK").hide();
    }, 1000);
}

function showErrorMessage(error) {
    console.error('Error!', error.message);
    setTimeout(() => {
        errorMessage.classList.remove('is-hidden');
        $("#loadingOK").hide();
    }, 1000);
}
