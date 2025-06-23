import { browser, expect } from '@wdio/globals'

describe('GitHub Sign Up flow', () => {
  it('should navigate to Sign Up, check h2 and fill form', async () => {
    await browser.url('https://github.com/');

    const signUpBtn = await $('a[href*="/signup?ref_cta=Sign+up"]');
    await expect(signUpBtn).toBeDisplayed();
    await signUpBtn.click();

    const h2 = await $('h2#signup-form-fields');
    await h2.waitForDisplayed({ timeout: 7000 });
    await expect(h2).toBeDisplayed();

    const h2Text = await h2.getText();
    expect(h2Text).toContain('Sign up to GitHub');

    // Cookies (якщо треба прийняти)
    const acceptCookiesBtn = await $('button=Accept');
    if (await acceptCookiesBtn.isDisplayed()) {
      await acceptCookiesBtn.click();
      await browser.pause(1000);
    }

    const unique = Date.now();

    const emailInput = await $('#email');
    await expect(emailInput).toBeDisplayed();
    await emailInput.setValue('testuser' + unique + '@example.com');

    const passwordInput = await $('#password');
    await expect(passwordInput).toBeDisplayed();
    await passwordInput.setValue('POIUgf12345!');

    const usernameInput = await $('#login');
    await expect(usernameInput).toBeDisplayed();
    await usernameInput.setValue('testuser' + unique);

    const countryBtn = await $('button[id^="select-panel"][aria-haspopup="dialog"]');
    await expect(countryBtn).toBeDisplayed();
    await countryBtn.click();

    const dialog = await $('dialog[class*="Overlay--size-small-portrait"]');
    await dialog.waitForDisplayed({ timeout: 7000 });
    const countryOption = await dialog.$('span=Ukraine');
    await countryOption.waitForDisplayed({ timeout: 5000 });
    await countryOption.click();

    const continueBtn = await $('button.signup-form-fields__button');
    await continueBtn.waitForDisplayed({ timeout: 5000 });
    await expect(continueBtn).toBeEnabled();
    await expect(continueBtn).toBeClickable();
    await continueBtn.click();
  });
});


describe('GitHub Copilot bottom CTA flow', () => {
  it('should scroll to bottom CTA, check elements and go to Copilot Pro trial page', async () => {
    await browser.url('https://github.com/');

    const bottomH2 = await $('h2=Millions of developers and businesses call GitHub home');
    await bottomH2.scrollIntoView();
    await expect(bottomH2).toBeDisplayed();

    const copilotBtn = await $('a[href*="/github-copilot/pro?cft=copilot_lo.copilot_plans.cfi"]');
    await expect(copilotBtn).toBeDisplayed();
    await expect(copilotBtn).toBeClickable();
    await expect(copilotBtn).toBeEnabled();
    await copilotBtn.click();

    await browser.pause(2000);

    const h1 = await $('h1=Try Copilot Pro for 30 days free');
    await expect(h1).toBeDisplayed();

    const tryNowBtn = await $('span.Button-label=Try now');
    await expect(tryNowBtn).toBeDisplayed();

    const parentButton = await tryNowBtn.parentElement();
    await expect(parentButton).toBeClickable();
  });
});



describe('GitHub Newsletter Subscribe flow', () => {
  async function acceptCookiesIfVisible() {
    const acceptBtn = await $('button=Accept');
  }

  it('should go to GitHub newsletter and submit the form', async () => {
    await browser.url('https://github.com/');
    await acceptCookiesIfVisible();
  
    const subscribeBtn = await $('a.btn-mktg[href="https://resources.github.com/newsletter/"]');
    await subscribeBtn.scrollIntoView();
    await subscribeBtn.waitForDisplayed({ timeout: 5000 });
    await subscribeBtn.click();
  
    await browser.pause(1000);
    await acceptCookiesIfVisible();
  
    const heading = await $('h1#hero-section-brand-heading');
    await heading.waitForDisplayed({ timeout: 5000 });
    const headingText = await heading.getText();
    console.log('Heading:', headingText);
  
    const emailInput = await $('input[type="email"][name="emailAddress"]');
    await emailInput.setValue(`testuser${Date.now()}@example.com`);
  
    const countrySelect = await $('#country');
    await countrySelect.selectByVisibleText('Ukraine');
  
    const marketingCheckbox = await $('#gated-agree-marketingEmailOptin1');
    const checkboxLabel = await $('label[for="gated-agree-marketingEmailOptin1"]');
  
    if (!await marketingCheckbox.isSelected()) {
      await checkboxLabel.click();
    }
  
    const submitBtn = await $('button[type="submit"]');
    await submitBtn.scrollIntoView();
    await submitBtn.click();
  
    const confirmHeading = await $('h1#hero-section-brand-heading');
    await confirmHeading.waitForDisplayed({ timeout: 5000 });
    const confirmText = await confirmHeading.getText();
    console.log('Confirm heading:', confirmText);
  });
});

describe('GitHub Search flow', () => {
  it('should search for "act" and check result exists', async () => {
    await browser.url('https://github.com/');

    const searchBtn = await $('button.header-search-button');
    await searchBtn.waitForDisplayed({ timeout: 7000 });
    await searchBtn.click();

    const searchInput = await $('#query-builder-test');
    await searchInput.waitForDisplayed({ timeout: 5000 });

    await searchInput.setValue('act');

    await browser.keys('Enter');

    const resultSelector = 'span.search-match, em';
    await browser.waitUntil(async () => {
      const results = await $$(resultSelector);
      for (let r of results) {
        const text = await r.getText();
        if (text.toLowerCase().includes('act')) return true;
      }
      return false;
    });
  });
});


describe('GitHub Pricing page test', () => {
  it('should navigate to Pricing, scroll and open Compare Features section', async () => {
    await browser.url('https://github.com');

    const pricingLink = await $('a[href="https://github.com/pricing"]');
    await pricingLink.click();

    const headingH1 = await $('h1.h2-mktg');
    await headingH1.waitForExist({ timeout: 10000 });
    
    const text = await headingH1.getText();
    expect(text).toContain('Try the Copilot-powered platform');

    const compareLink = await $('a[href="#compare-features"]');
    await compareLink.scrollIntoView();
    await compareLink.click();

    const compareHeading = await $('h1.h1=Compare features');
    await compareHeading.waitForExist({ timeout: 5000 });
    await expect(compareHeading).toBeDisplayed();
  });
});
