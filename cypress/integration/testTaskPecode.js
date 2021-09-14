/// <reference types="Cypress" />

import {
    loginPage
} from "../support/selectors";

const LOP = new loginPage()

describe("testTask", () => {
    ////////////////////////////////////////////////////////////////////////
    function randomNumber() {
        let text = ""
        let possible = "123456789";
        for (let i = 0; i < 3; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    function randomWord() {
        var text = ""
        var possible = "qwertyuiopasdfghjklzxcvbnm";
        for (var i = 0; i < 8; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    /////////////////////////////////////////////////////////////////////////
    var randomNumers = randomNumber();
    var randomWords = randomWord();
    /////////////////////////////////////////////////////////////////////////
    beforeEach(() => {
        LOP.visitLoginPage();
        cy.intercept({
            method: "GET",
        }).as("registerlogin.php");
        cy.get(LOP.loginPageForm).should('be.visible');
        cy.get(LOP.loginPageLogoIcon).should('be.visible');
        cy.get(LOP.loginPageTitle).should('be.visible');
        cy.get(LOP.loginPageEmailFiled).should('be.visible');
        cy.get(LOP.loginPagePasswordFiled).should('be.visible');
        cy.get(LOP.loginPageLoginButton).should('be.visible');
    });
    it("checksAllErrors", () => {
        cy.get(LOP.loginPageLoginButton).click();
        cy.get(LOP.loginPagePasswordFiled).clear();
        cy.get(LOP.loginPageEmailFiled).clear();
        cy.get(LOP.loginPageEmailError).should('contain.text', 'Please enter username.');
        cy.get(LOP.loginPagePasswordError).should('contain.text', 'Please enter your password.');
        cy.screenshot('Capturing the screenshot after feiles login');
    });
    it("checksEmailError", () => {
        cy.get(LOP.loginPageEmailFiled).clear();
        cy.get(LOP.loginPagePasswordFiled).clear().type(randomWords);
        cy.get(LOP.loginPageLoginButton).click();
        cy.get(LOP.loginPageEmailError).should('contain.text', 'Please enter username.');
        cy.screenshot('Capturing the screenshot after feiles login');
    });
    it("checksPasswordError", () => {
        cy.get(LOP.loginPageEmailFiled).clear().type(randomWords + '@gmail.com');
        cy.get(LOP.loginPagePasswordFiled).clear()
        cy.get(LOP.loginPageLoginButton).click();
        cy.get(LOP.loginPagePasswordError).should('contain.text', 'Please enter your password.');
        cy.screenshot('Capturing the screenshot after feiles login');
    });
    it("checksVerificationUsers", () => {
        cy.get(LOP.loginPageEmailFiled).clear().type(randomWords + '@gmail.com');
        cy.get(LOP.loginPagePasswordFiled).clear().type(randomNumers + randomWords);
        cy.get(LOP.loginPageLoginButton).click();
        cy.get(LOP.LoginPageVerificationError).should('contain.text', 'No account found with that username.');
        cy.screenshot('Capturing the screenshot after feiles login');
    });
});