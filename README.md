# Chemical Supplies Management - IIT Bombay Assignment

This project implements a web-based interface for managing chemical supplies, created for the task for Javascript Web Programmer position at IIT Bombay.

The application allows users to view, add, remove, sort, and edit chemical records. The table features sortable columns, editable fields, and row manipulation functionality. Additionally, it is built as a Progressive Web App (PWA) to allow offline use.

## Problem Statement

- Build a UI that presents a table of chemicals, with functionalities to sort, edit, and manage rows as per the requirements.
- The toolbar at the top-left includes the following options:
  - Add a new row
  - Move a row up or down
  - Delete a row
  - Refresh the table
  - Save the current table state
- The table contains 15 rows of chemical data, including:
  - `id`, `Chemical Name`, `Vendor`, `Density`, `Viscosity`, `Packaging`, `Pack Size`, `Unit`, and `Quantity`.

## Features Implemented

### 1. **Table Structure**
   - A dynamic table displaying 15 chemical entries with the above properties.
   - Sort functionality implemented on column headers, toggling between ascending and descending order.

### 2. **Toolbar Functionalities**
   - **Add Row**: Adds a new row with an automatically assigned ID.
   - **Move Row Up/Down**: Moves the selected row up or down.
   - **Delete Row**: Removes the selected row from the table.
   - **Refresh Table**: Reloads the data from the initial JSON file.
   - **Save Data**: Saves the current state of the table locally.

### 3. **Data Handling**
   - Data is loaded from a local JSON array, `chemicals.json`, containing details for each chemical.
   - Each chemical includes fields like `id`, `Chemical Name`, `Vendor`, `Density`, `Viscosity`, `Packaging`, `Pack Size`, `Unit`, and `Quantity`.
   
### 4. **Sorting**
   - Clickable column headers allow sorting of rows based on the selected column, with toggling for ascending and descending order.
   - String sorting is handled using `.localeCompare()`, and numerical fields are sorted using `parseFloat()`.

### 5. **Editing**
   - Editing is done via inline `contenteditable` fields for properties like `Density`, `Viscosity`, and `Quantity`. This ensures a user-friendly interface instead of random buttons that would force a deviation from the image shared in the project requirement.

### 6. **Progressive Web App (PWA)**
   - **Offline Access**: The app registers a service worker to cache essential resources, ensuring it works without an internet connection.
   - **Installable**: A `manifest.json` is included to make the app installable on mobile devices.
   - **Cross-Device Compatibility**: The app is responsive and works well on mobile, tablet, and desktop, though the structure and requirement of the project itself makes it non-ideal for mobile devices.
   - **Reference**: I used this site to learn about PWA implementation: https://tudip.com/blog-post/how-to-turn-a-website-or-web-application-into-pwa-with-example/

## Project Structure

- **HTML**: The main structure of the page.
- **CSS**: Custom styling, with Bootstrap for responsiveness.
- **JavaScript**: Handles table functionalities like sorting, adding, deleting, and saving rows.
- **JSON**: Stores the initial list of chemical data.

## Design Choices

- **No Frameworks**: Only vanilla JavaScript, HTML, and CSS were used, in compliance with the assignment's requirements.
- **Local Libraries**: All external libraries like Bootstrap and FontAwesome are stored locally in the repository—no external CDN links.
- **Small Project Size**: The app’s total size is kept minimal by locally storing all resources and only using essential CSS and JS.

## Deliverables

- Hosted Page: [Link to Hosted Page](https://pathanahmad.github.io/VLabsChallengeAssignment/)

## Additional Enhancements

- Implemented PWA features for offline access and installability, providing a better user experience across devices.
- Clear and responsive UI design using Bootstrap, ensuring accessibility on both desktop and mobile devices.
- Sorting functionality for both numerical and text columns, along with easy inline editing for key fields.

## Future Improvements

- **Data Persistence**: Currently, data is saved locally in the browser. Future improvements could include integration with a backend API for persistent storage.
- **Improved Mobile Experience**: Although responsive, further UI optimizations for small screens could improve user interactions on mobile. But as of right now and given the specific project requirements and the nature of the software itself, the room for improving compatibility for phones/mobile devices is quite small in my humble, inexperienced opinion.
- **Logo Matching**: If I could find logos that were closer to the design requirement, I could match them as well, but I'm out of time.