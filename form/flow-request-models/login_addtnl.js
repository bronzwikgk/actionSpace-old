/**
 * Assistive Request model for `login_ui`
 */
var switchLogInOrSignup = [{
    objectModel: "document",
    method: "querySelector",
    arguments: ".title-text .login",
    response: "loginText"
}, {
    objectModel: "document",
    method: "querySelector",
    arguments: "form.login",
    response: "loginForm"
}, {
    objectModel: "document",
    method: "querySelector",
    arguments: "input#signup",
    response: "signupCheck"
}, {
    declare: {
        "loginForm.style.marginLeft": "$l.value =='signup' ? '-50%' : '0%'",
        "loginText.style.marginLeft": "$l.value =='signup' ? '-50%' : '0%'",
        "signupCheck.checked": "$l.value =='signup' ? true : false"
    }
}]

/////////////////////////////////////////////////////////////////////////////////////
/* const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (() => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (() => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});
signupLink.onclick = (() => {
    signupBtn.click();
    return false;
}); */