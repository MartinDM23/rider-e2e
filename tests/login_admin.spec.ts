import { test, expect } from '@playwright/test';

import { LoginPage } from '../pageobjects/login/LoginPage';

test('Admin', async ({ page }) => {

    //await page.goto('https://www.riderlitigationfinance.com/')
    await page.goto('https://rider-litigation-finance-web-stating-dot-total-pad-308418.uc.r.appspot.com/')
   
    await page.waitForTimeout(5_000)

    await page.locator('//button[@class="btn btn-outline-light btn-sm"]').click()

    await page.waitForTimeout(3_000);

    const loginPage = new LoginPage(page);

    await loginPage.doLogin('litigationrider@gmail.com', '12345678');
 
    await page.waitForTimeout(5_000);
    //await page.pause();
    await page.close();

});
