import { test, expect } from '@playwright/test';
import axios from 'axios';

test('resolver captcha con 2captcha', async ({ page }) => {
  test.setTimeout(70000)
  // Configurar user-agent si deseas
  await page.context().setExtraHTTPHeaders({
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  //const url = 'https://www.google.com/recaptcha/api2/demo';
  //const url = 'https://rider-litigation-finance-web-stating-dot-total-pad-308418.uc.r.appspot.com/preregistro-cliente-step0';
  const url = 'https://rider-litigation-finance-web-stating-dot-total-pad-308418.uc.r.appspot.com/preregister-financial-monitor0';
  await page.goto(url);

      // Pagina de Preregistro
  
      await page.locator('input#preregistered_user-email').fill('rider.tester23+e2emonitor1@gmail.com');
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
  //await page.locator('button[id="unete-btn"').click();
  
  //await page.pause();
  
  //await page.locator('button[id=unete-btn]).click()
  await page.waitForTimeout(3_000);

//await page.locator('input[id="preregistered_user-email"]').fill('dorantesm82+referido1@gmail.com');

  await page.locator('input[id="user_first_name"]').fill('e2emonitor1 Martin2e');

  await page.waitForTimeout(3_000);

  await page.locator('input[id="user_last_name"]').fill('Dorantese2e2');
  //await page.pause();

  await page.waitForTimeout(3_000);

  
  await page.locator('select[id="user_country_id"]').selectOption('United States')

  await page.locator('select[id="user_state_id"]').selectOption('California')

  await page.locator('select[id="user_city_id"]').selectOption('Los Angeles')

  await page.locator('input[id="user_postal_code"]').fill('03600')
  
  //await page.pause();

  await page.locator('select[id="user_phone-prefix"]').selectOption('52')

  await page.locator('input[id="user_phone"]').fill('(722) 294-0235')

  await page.locator('select[id="user_lang"]').selectOption('English')

  await page.waitForTimeout(3_000);

  await page.getByRole('checkbox', { name: 'I agree with Terms and Conditions' }).check();

  await page.locator('//button[contains(text(), \'Continue\')]').click()

  //await page.pause();

  await page.locator('id=js-file-nda').setInputFiles('../images/CV_Monitor.pdf')
  //await page.locator('name="monitor_cv_file"').fill('CV_Monitor.pdf')

  await page.locator('textarea[name="monitor_cv_description"]').fill('Test e2e Experto en Promoción de Inersiones')

  //await page.pause();

  await page.locator('//button[contains(text(), \'Continue\')]').click()

  //await page.pause();

  await page.locator('input[id="monitor_personal_reference_1_first_name"]').fill('Juan 1')
                      
  await page.locator('input[id="monitor_personal_reference_1_last_name"]').fill('Diaz 1')

  await page.locator('input[id="monitor_personal_reference_1_email"]').fill('juandiaz1@gmail.com')

  await page.locator('select[id="monitor_personal_reference_1_phone_prefix"]').selectOption('52')

  await page.locator('input[id="monitor_personal_reference_1_phone"]').fill('(722) 294-0211')

  //await page.pause();

  await page.locator('input[id="monitor_personal_reference_2_first_name"]').fill('Juan 2')
                     
  await page.locator('input[id="monitor_personal_reference_2_last_name"]').fill('Diaz 2')

  await page.locator('input[id="monitor_personal_reference_2_email"]').fill('juandiaz2@gmail.com')

  await page.locator('select[id="monitor_personal_reference_2_phone_prefix"]').selectOption('52')

  await page.locator('input[id="monitor_personal_reference_2_phone"]').fill('(722) 294-0222')

  //await page.pause();

  await page.locator('input[id="monitor_personal_reference_3_first_name"]').fill('Juan 3')
                      
  await page.locator('input[id="monitor_personal_reference_3_last_name"]').fill('Diaz 3')

  await page.locator('input[id="monitor_personal_reference_3_email"]').fill('juandiaz3@gmail.com')

  await page.locator('select[id="monitor_personal_reference_3_phone_prefix"]').selectOption('52')

  await page.locator('input[id="monitor_personal_reference_3_phone"]').fill('(722) 294-0233')

  //await page.pause();

  await page.locator('//button[contains(text(), \'Continue\')]').click()

  //await page.pause();

  await page.locator('//button[contains(text(), \'Continue\')]').click()

  await page.close();

});
