// Seleção de elementos para gerar a senha
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");
const registerButton = document.querySelector("#btn-register");

// Seleção de elementos para gerar erro ou sucesso no preenchimento dos inputs
const form = document.querySelector("#register-form");
const username = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmpassword = document.querySelector("#confirmpassword");

// Função para validar o preenchimento correto dos inputs
function checkInputs() {
    const nameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const confirmpasswordValue = confirmpassword.value;

    if (nameValue === "") {
        setErrorFor(username, "O nome de usuário é obrigatório.");
    } else {
        setSuccessFor(username);
    }

    if (emailValue === "") {
        setErrorFor(email, "O email é obrigatório.");
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, "Por favor, insira um email válido.");
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === "") {
        setErrorFor(password, "Uma senha com o mínimo de 8 caracteres é obrigatório.");
    } else if (passwordValue.length < 8) {
        setErrorFor(password, "A senha inserida não possui 8 caracteres.");
    } else {
        setSuccessFor(password);
    }

    if (confirmpasswordValue === "") {
        setErrorFor(confirmpassword, "A confirmação da senha é obrigatória.");
    } else if (confirmpasswordValue != passwordValue) {
        setErrorFor(confirmpassword, "As senhas não conferem.");
    } else {
        setSuccessFor(confirmpassword);
    }

    const formControls = form.querySelectorAll(".form-control");

    const formIsValid = [...formControls].every((formControl) => {
        return formControl.className === "form-control success";
    })

    if (formIsValid) {
        setTimeout(() => { confirm("Cadastro realizado com sucesso!") }, 300);
        setTimeout(() => { location.reload() }, 300);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    // Adiciona a mensagem de erro
    small.innerText = message;

    // Adiciona a classe de erro
    formControl.className = "form-control error";
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    // Adiciona a classe de sucesso
    formControl.className = "form-control success";
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}

// Funções para gerar a senha (letras, Números e Símbolos)
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
}

const getSymbol = () => {
    const symbols = "(){}[]=<>/\,.!@#$%&*+-_"
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
    let password = "";

    const passwordLength = 10;

    const generators = [getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol]

    for (i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {
            const randomValue = generators[Math.floor(Math.random() * generators.length)]();

            password += randomValue;
        })
    }

    password = password.slice(0, passwordLength);

    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = password;
}

// Eventos
generatePasswordButton.addEventListener("click", () => {
    generatePassword(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol);
})

registerButton.addEventListener("click", () => {
    checkInputs();
})
