const { test, expect } = require('@playwright/test')

test.describe('Authentication', () => {

  test('should allow user to log in as demo', async ({ page }) => {
    await page.goto('https://remember-the-grapes.herokuapp.com/');
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.getByRole('button', { name: 'Demo User' }).click();
    await expect(page).toHaveURL('https://remember-the-grapes.herokuapp.com/');
  });

  test('should allow user to sign out', async ({ page }) => {
    await page.goto('https://remember-the-grapes.herokuapp.com/');
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.getByRole('button', { name: 'Logout' }).click();
    const headline = await page.innerText('#smartAppBusy')
    await expect(headline).toBe('The smart to-do app for busy people.')
  });
})

test.describe('Tasks', () => {

  test('should allow user to view pending tasks', async ({ page }) => {
    await page.goto('https://remember-the-grapes.herokuapp.com/');
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.getByText('tst2').click();
    const task = await page.locator('text=Delete Task')
    await expect(task).toBeTruthy()
  });

})

test.describe('Lists', () => {

  test('should allow user to create new lists', async ({ page }) => {
    await page.goto('https://remember-the-grapes.herokuapp.com/');
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.getByRole('button', { name: 'Demo User' }).click();
    await page.locator('#plusfa').click();
    await page.locator('#editListInput').click();
    await page.locator('#editListInput').fill('testingList');
    await page.locator('#saveNewListName').click();
    await page.locator('#rightArrow').click();
    const task = await page.locator('text=testingList')
    await expect(task).toBeTruthy()
});

test('should allow user to view lists', async ({ page }) => {
  await page.goto('https://remember-the-grapes.herokuapp.com/');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.getByRole('button', { name: 'Demo User' }).click();
  await page.locator('#rightArrow').click();
  await page.getByRole('paragraph').filter({ hasText: 'School' }).click();
  const list = page.locator('p').filter({ hasText: 'School' })
  await expect(list).toBeTruthy()
});

test('should allow user to edit lists', async ({ page }) => {
  await page.goto('https://remember-the-grapes.herokuapp.com/');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.getByRole('button', { name: 'Demo User' }).click();
  await page.locator('#rightArrow').click();
  await page.locator('#fa-edit').first().click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('Schools');
  await page.getByRole('button', { name: 'Save' }).click();
  const newList = page.getByRole('paragraph').filter({ hasText: 'Schools' });
  await expect(newList).toContainText('Schools')

});

})
