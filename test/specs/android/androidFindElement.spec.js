import { $, $$, expect, driver } from '@wdio/globals';

describe('Contains tets related to Android element identification', () => {
    it('Finding element by accessibility id', async () => {
        // find element by accessibility id
        const appOption = await $('~App');
        // click on element
        await appOption.click();
        // assertion
        const actionBar = await $('~Action Bar');
        await expect(actionBar).toBeExisting();

    });

    it('Finding element by class name', async () => {
        // find element by class name
        const className = await $('android.widget.TextView');
        // assert the name of the element
        await expect(className).toHaveText('API Demos');
    });

    it('Find element by xpath', async () => {
        // find by accessibility id
        await $('~App').click();
        // find element by xpath(content description)
        await $('//android.widget.TextView[@content-desc="Alert Dialogs"]').click();
        // find element by xpath(resource id)
        await $('//android.widget.Button[@resource-id="io.appium.android.apis:id/select_button"]').click();
        // find element by xpath(text)
        await $('//android.widget.TextView[@text="Command two"]').click();
        const message = await $('//android.widget.TextView[@resource-id="android:id/message"]');
        // Verify text as assertion.
        await expect(message).toHaveText('You selected: 1 , Command two');
    });

    it('Finding element usign Android UIAutomator', async () => {
        // find by accessibility id
        await $('~App').click();
        // find element by UiAutomator
        await $('android=new UiSelector().textContains("Alert")').click();
    });

    it('Finding multiple elements', async () => {
        // Find all elements match the class name
        // '$$' will return all the matching elements of the locator
        const expectedElements = [
            'API Demos', "Access'ibility",
            'Accessibility', 'Animation',
            'App', 'Content',
            'Graphics', 'Media',
            'NFC', 'OS',
            'Preference', 'Text',
            'Views']
        const actualElementList = [];
        const allElements = await $$('android.widget.TextView');
        // print all the element text in console
        for (let element of allElements) {
            actualElementList.push(await element.getText());
        }
        // Asset actual element list is equal to expected element list
        await expect(expectedElements).toEqual(actualElementList);
    });

    it.only('Working with text fields', async () => {
        // Click on views.
        await $('~Views').click();
        // Click on autocomplete
        await $('~Auto Complete').click();
        // Click on screen top
        await $('~1. Screen Top').click();
        // Write country name as India
        const editBox = await $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/edit"]');
        await editBox.setValue('India');
        // Verify the text is present in the field.
        await expect(editBox).toHaveText('India');
    });
});