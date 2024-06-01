const form = document.querySelector('form');

const fullName = document.querySelector('#name');
const email = document.querySelector('#email');
const subject = document.querySelector('#subject');
const message = document.querySelector('#message');
const errorMsg = document.querySelector('.error-message'); 
let isEmpty = false;
let isValid = false;

function sendEmail(){
    const messageBody = `Name: ${fullName.value}<br>Email: ${email.value}<br>Subject: ${subject.value}<br>Message: ${message.value}`;

    Email.send({
        SecureToken: "10843fe4-b542-45d0-8b4e-0fdb04659d04",
        To : "buchidevv@gmail.com",
        From : "buchidevv@gmail.com",
        Subject : subject.value,
        Body : messageBody,
    }).then(
        message => {
            if (message === "OK") {
                Swal.fire({
                    title: "Message sent!",
                    text: "I would contact you shortly",
                    icon: "success"
                });
            }
        }
    );
}

const checkInputs = () => {
  const formControl = document.querySelectorAll('.form-control');

  for (const input of formControl) {
    if (input.value == '') {
        input.classList.add('border');
        input.classList.add('border-danger');
    }

    if (input.name == 'email' && input.value != '') { 
        checkEmail(input);
    }
    
    formControl[1].addEventListener('keyup', () => {
        errorMsg.classList.remove('d-block');
        checkEmail(formControl[1]);
    })
    input.addEventListener('keyup', () => {
        if (input.value != "") {
            input.classList.remove('border');
            input.classList.remove('border-danger');
        } else {
            input.classList.add('border');
            input.classList.add('border-danger');
        }
    })
  };  
};

const checkEmail = (input) => {
    const emailRegex = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    if (!input.value.match(emailRegex)) {
        input.classList.add('danger');
        input.classList.add('border-danger');
        errorMsg.innerText='Please provide a valid email address';
        errorMsg.classList.add('d-block');
    } else {
        input.classList.remove('danger');
        input.classList.remove('border-danger');
        errorMsg.classList.remove('d-block');
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkInputs();
    
    if (!fullName.classList.contains('border-danger') && !email.classList.contains('border-danger') && !subject.classList.contains('border-danger') && !message.classList.contains('border-danger')) {
        sendEmail();
        form.reset();
        return false;
    }    
})