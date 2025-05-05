import { test, expect } from '@playwright/test';
import axios from 'axios';

test('Registro Referenciador con 2captcha', async ({ page }) => {
   test.setTimeout(70000) 
  // Configurar user-agent si deseas
  await page.context().setExtraHTTPHeaders({
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  //const url = 'https://www.google.com/recaptcha/api2/demo';
  //const url = 'https://rider-litigation-finance-web-stating-dot-total-pad-308418.uc.r.appspot.com/preregistro-cliente-step0';

  const url = 'https://rider-litigation-finance-web-stating-dot-total-pad-308418.uc.r.appspot.com/preregistro-referidos-paso0';
  await page.goto(url);

      // Pagina de Preregistro
  
      await page.locator('input#preregistered_user-email').fill('rider.tester23+e2ereferido1@gmail.com');
      await page.waitForTimeout(3_000);
  
  // Obtener sitekey desde el HTML
  const captchaKey = await page.getAttribute('#captcha', 'data-sitekey');
  if (!captchaKey) throw new Error('No se encontró la sitekey del captcha');

  // Armar solicitud a 2captcha
  const apiKey = '7af20b4a2ab20af55da00a929ac3d988'; // <-- reemplaza con tu API KEY válida
  const inUrl = `https://2captcha.com/in.php?key=${apiKey}&method=userrecaptcha&googlekey=${captchaKey}&pageurl=${url}&json=0`;

  const inResponse = await axios.get(inUrl);
  let captchaServiceKey = inResponse.data;
  //console.log(captchaServiceKey);

    // Parseo para obtener el ID
    //captchaServiceKey = captchaServiceKey.split('|').pop();

  if (!captchaServiceKey.includes('|')) throw new Error('Error en respuesta de 2captcha: ' + captchaServiceKey);
  captchaServiceKey = captchaServiceKey.split('|').pop();

  const resUrl = `https://2captcha.com/res.php?key=${apiKey}&action=get&id=${captchaServiceKey}&json=0`;

  //console.log(resUrl);

  // Esperar según documentación de 2captcha
  await page.waitForTimeout(3_000);

  let captchaSolution: string | null = null;
  for (let i = 0; i < 38; i++) {
    const resResponse = await axios.get(resUrl);
    const resText = resResponse.data;
    console.log(`Intento ${i + 1}: ${resText}`);
    if (resText === 'CAPCHA_NOT_READY') {
      await page.waitForTimeout(6_000);
    } else if (resText.includes('|')) {
      captchaSolution = resText.split('|').pop();
      console.log(`Ya paso con: ${resText}`);
      break;
    } else {
      throw new Error('Error al obtener la solución del captcha: ' + resText);
    }
  }

  if (!captchaSolution) throw new Error('No se pudo obtener la solución del captcha');

  // Insertar la solución en el DOM
  await page.evaluate((token: string) => {
    const textarea = document.getElementById('g-recaptcha-response') as HTMLTextAreaElement;
    if (textarea) textarea.innerHTML = token;
  }, captchaSolution);

  // Click en el botón de submit
  //await page.click('#recaptcha-demo-submit');

  await page.getByRole('checkbox', { name: 'I agree with Terms and Conditions' }).check();
    
  await page.locator('button#unete-btn').click();
 // await page.waitForTimeout(3_000);

  //await page.pause();
  //await page.locator('button[id=unete-btn]).click()
  await page.waitForTimeout(3_000);


  await page.locator('input[id="preregistered_user-first_name"]').fill('Test Referido e2e1');

  await page.waitForTimeout(3_000);

  await page.locator('input[id="preregistered_user-last_name"]').fill('Dorantes e2e1');
  //await page.pause();

  await page.locator('select[id="preregistered_user-lang"]').selectOption('English')

  await page.waitForTimeout(3_000);

  
  await page.locator('select[id="preregistered_user-country_id"]').selectOption('United States')

  await page.locator('select[id="preregistered_user-state_id"]').selectOption('California')

  await page.locator('select[id="preregistered_user-city_id"]').selectOption('Los Angeles')

  await page.waitForTimeout(3_000);
  //await page.pause();

  await page.locator('select[id="preregistered_user-phone-prefix"]').selectOption('52')

  await page.locator('input[id="preregistered_user-phone"]').fill('(722) 294-0235')

  //await page.locator('input[id="preregistered_user-email"]').fill('dorantesm82+referido1@gmail.com');
                      
  await page.pause();

  //await page.getByRole('checkbox', { name: 'I agree with Terms and Conditions' }).check();

  await page.getByRole('checkbox', { name: ' I Agree with the Terms and Conditions' }).check();

  //await page.locator('input[class="form-check-input"]').click();

  await page.locator('//button[contains(text(), \'Continue\')]').click()

  //await page.pause();
  await page.close();

});
