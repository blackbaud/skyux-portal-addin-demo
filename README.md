# SkyuxPortalAddinDemo

This project serves to demonstrate creating SKYUX Add-ins for the Blackbaud Raiser's Edge NXT Portal by mimicking an event registration application. It's an Angular 18 project that manually deploys to Github pages.

# Running Locally
`ng serve` will run the project locally.

# Deploying to Github Pages (Blackbaud Employees Only)
Running `ng deploy --base-href=/skyux-portal-addin-demo/` will deploy your current local project to Github pages, assuming you have access to the repo.

The code that is deployed will be available at `https://blackbaud.github.io/skyux-portal-addin-demo/`.

**Note that it will not automatically deploy the main branch - it will deploy whatever branch you are currently on.**

# Code structure
This SPA contains 3 main components under the addins folder. Each component is designed to demonstrate a different extension point of the Portal. It loosely follows the theme of registering for an event.
None of the data is persisted, so each part is not connected to any of the others; however, you can add data persistence to this application to make it fully functional.

### Settings add-in
This add-in demonstrates how to create a settings add-in used by a back-office user in RENXT. It is located in the `addins/settings` folder. It displays a small item in the Portal settings that allows the back-office user to turn off event registration or view events that are eligible for registration.

### Portal Action add-in
This add-in demonstrates creating a home page action for a portal user. It is located in the `addins/portal-action` folder. It displays an action button in the Portal home page that when clicked opens a modal that allows the portal user to register for an event. This uses the portal user's RENXT Constituent ID as the identifier for the user, and demonstrates how to get that ID from the User Identity Token.

### Profile Tab add-in
This add-in demonstrates creating a profile tab for a portal user. It is located in the `addins/profile-tab` folder. It displays a tab in the Portal profile page that allows the portal user to view events that they have registered for. This uses the portal user's RENXT Constituent ID as the identifier for the user, and demonstrates how to get that ID from the User Identity Token.

# Viewing the Add-ins
If you want to see what these look like in RENXT and the portal, you can create an application that uses the add-ins.
1. Create a SKY Application or find an existing one
2. Register the add-ins in the application:
    1. On the `Portal Feature Configuration Item` extension point, register an add-in with URL `https://blackbaud.github.io/skyux-portal-addin-demo/addins/settings`
    2. On the `Portal Home Page Action` extension point, register an add-in with URL `https://blackbaud.github.io/skyux-portal-addin-demo/addins/action`
    3. On the `Portal Profile Page Tab` extension point, register an add-in with URL `https://blackbaud.github.io/skyux-portal-addin-demo/addins/profile`
4. Connect your application to an RENXT environment that has the Portal enabled (or enable the Portal https://host.nxt.blackbaud.com/tools-settings/)
5. The Settings add-in can be seen by a back-office user https://host.nxt.blackbaud.com/tools-settings/
6. The other two add-ins can be seen by launching the portal at your configured URL, and viewing both the home page of the portal and the profile page of the portal.

# More Information
For more information on Blackbaud's SKY Add-in framework, see https://developer.blackbaud.com/skyapi/docs/addins.
    
