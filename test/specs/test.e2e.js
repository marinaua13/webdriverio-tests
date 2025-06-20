import { browser, expect } from '@wdio/globals'

describe('WebdriverIO site test', () => {
  xit('should open the WebdriverIO main page', async () => {
    await browser.url('https://webdriver.io/');
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain('webdriver.io');
  });

  xit('should navigate to the API section via the top menu', async () => {
    await browser.url('https://webdriver.io/');

    const apiLink = await $('a.navbar__link[href="/docs/api"]');
    await apiLink.waitForClickable({ timeout: 5000 });

    await apiLink.click();

    const url = await browser.getUrl();
    expect(url).toContain('/docs/api');
});

  xit('should display the correct H1 heading on the API page', async () => {
    await browser.url('https://webdriver.io/docs/api');
    const h1 = await $('h1');
    const h1Text = await h1.getText();
    expect(h1Text).toContain('Introduction');
  });

  xit('should display the breadcrumb "Introduction" text', async () => {
    await browser.url('https://webdriver.io/docs/api');
    const breadcrumb = await $('.breadcrumbs__item--active');
    const text = await breadcrumb.getText();
    expect(text).toContain('Introduction');
  });

  xit('should verify element with attribute name "Webdriver" exists', async () => {
    await browser.url('https://webdriver.io/docs/api');
    const link = await $('=WebDriver');
    expect(await link.isExisting()).toBe(true);
    const href = await link.getAttribute('href');
    expect(href).toBe('/docs/api/webdriver');
  });

  xit('should activate the search bar and type a query', async () => {
    await browser.url('https://webdriver.io/');
    const searchBtn = await $('button.DocSearch-Button');
    await searchBtn.click();

    const input = await $('input.DocSearch-Input');
    await input.setValue('all is done');
    await browser.pause(2000);
  });

  it('should clear the search input by clicking the X button', async () => {
    await browser.url('https://webdriver.io/');
    const searchBtn = await $('button.DocSearch-Button');
    await searchBtn.click();

    const input = await $('input.DocSearch-Input');
    await input.setValue('all is done');
    await browser.pause(2000);
    
    const closeBtn = await $('button[title="Clear the query"]');
    await closeBtn.click();
    await browser.pause(1000);
  });
});

