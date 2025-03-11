describe('Android native feature testing', () => {
    it('Open Screen directly using AppActive', async () => {
        // Use app activity to navigate to a screen directly
        await driver.startActivity("io.appium.android.apis", "io.appium.android.apis.app.AlertDialogSamples");
        // Verify that the given element is present in the screen or not
        const expectedElement = await $('~List dialog');
        await expect(expectedElement).toExist();
    });

    it('Working with Dialog Boxes', async () => {
        // Use app activity to navigate to a screen directly
        await driver.startActivity("io.appium.android.apis", "io.appium.android.apis.app.AlertDialogSamples");
        // Click on the element that ones the alert message
        await $('~OK Cancel dialog with a message').click();
        // Get the alert box text message
        console.log('ALERT MESSAGE --->>', await driver.getAlertText());
        // Once the alert is open either accept or dismiss it
        // await driver.acceptAlert();
        // To dismiss the alert use below command
        await driver.dismissAlert();
        // Verify after the alert is accept or dismissed that the alert is no longer visible
        await expect($('//android.widget.TextView[@resource-id="android:id/alertTitle"]')).not.toExist();
    });

    it('Vertical Scrolling', async () => {
        await $('~App').click();
        await $('~Activity').click();
        // Scroll into view of the element
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Secure Surfaces")').click();
        // Verify secure dialog is present in the screen
        await expect($('~Secure Dialog')).toExist();
    });

    it('Horizontal Scrolling', async () => {
        await $('~Views').click();
        await $('~Gallery').click();
        await $('~1. Photos').click();
        // Scroll into view of the element
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()').click();
        // Verify secure dialog is present in the screen
    });

    it.only('Working with date picker', async () => {
        await $('~Views').click();
        await $('~Date Widgets').click();
        await $('~1. Dialog').click();
        // Verify the data
        const dateValue = await $('//android.widget.TextView[@resource-id="io.appium.android.apis:id/dateDisplay"]');
        // Click on the change date button
        await $('~change the date').click();
        // Scroll into view of the element
        // Using the button
        // await $('~Next month').click();
        // Using horizontal scrolling
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()').click();
        // Select 10th of ther next month
        await $('//*[@text="10"]').click();
        // Click on the Ok button to set the date
        await $('//*[@text="OK"]').click();
        // Verify the date has changed to 10th of the month
        await expect(dateValue).toHaveText(/10/);
    });
});