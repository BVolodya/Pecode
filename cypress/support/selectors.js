import links from '../../cypress.json';

export class loginPage {
    loginPageForm = '.wrapper'
    loginPageLogoIcon = '#logomini'
    loginPageTitle = 'h1'
    loginPageEmailFiled = ':nth-child(1) > .form-control'
    loginPagePasswordFiled = ':nth-child(2) > .form-control'
    loginPageLoginButton = '.btn'
    loginPageEmailError = '.has-error > .help-block'
    loginPagePasswordError = ':nth-child(2) > .help-block'
    LoginPageVerificationError = '.has-error > .help-block'    

    visitLoginPage() {
        cy.visit(links.loginPageUrl);
    }
}