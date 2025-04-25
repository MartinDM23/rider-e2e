import { Locator, Page } from "@playwright/test"

export class LoginPage {

    private readonly emailloginTextbox: Locator;
    private readonly emailpasswordTextbox: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page){
        this.emailloginTextbox = page.locator('input#email-login')
        this.emailpasswordTextbox = page.locator('input#email-password')
        this.loginButton = page.locator('button#send-login')
    }

    private async fillEmaillogin(useremail: string){
        await this.emailloginTextbox.fill(useremail);
    }

    private async fillEmailpassword(password: string){
        await this.emailpasswordTextbox.fill(password);
    }
    
    async clickOnLoginButton(){
        this.loginButton.click();
    }

    async doLogin(useremail: string, password: string){
        await this.fillEmaillogin(useremail);
        await this.fillEmailpassword(password);
        await this.clickOnLoginButton();
    }
}