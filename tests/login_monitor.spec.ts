import { test, expect } from '@playwright/test';

import { LoginPage } from '../pageobjects/login/LoginPage';

test('monitor', async ({ page }) => {

    //await page.goto('https://www.riderlitigationfinance.com/')
    await page.goto('https://rider-litigation-finance-web-stating-dot-total-pad-308418.uc.r.appspot.com/')
   
    await page.waitForTimeout(6_000)

    await page.locator('//button[@class="btn btn-outline-light btn-sm"]').click()

    await page.waitForTimeout(3_000);

    const loginPage = new LoginPage(page);

    await loginPage.doLogin('mdmraider+e2emonitor3@gmail.com', 'Uuyvrjpk');
 
    await page.waitForTimeout(8_000);
    //await page.pause();
    await page.close();

});
