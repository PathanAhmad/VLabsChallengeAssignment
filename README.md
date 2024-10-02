# Chemical Supplies Management - IIT Bombay Assignment

This project is a simple web-based interface to manage a table of chemical supplies, created as part of an assignment for the Javascript Web Programmer position at IIT Bombay. The application allows users to view, add, remove, sort, and edit chemical records. Additionally, it is implemented as a Progressive Web App (PWA), allowing it to work offline and on multiple devices.

---

## Design Approach

### 1. **HTML and Table Structure:**

The main structure of the webpage consists of a **table** that displays a list of chemical records, with sortable columns and editable fields. Each table column represents a property of a chemical (such as Name, Vendor, Density, etc.). Buttons in the top toolbar allow for interaction, including adding new records, moving rows up and down, and removing selected rows.

I used **Bootstrap** for basic styling and responsive layout, while keeping the JavaScript entirely vanilla to comply with the assignment's restrictions of "No frameworks."

The table supports:
- Sorting when column headers are clicked.
- Inline editing of certain fields, like `Density`, `Viscosity`, and `Quantity`, directly in the table.
- Selection of rows using tick icons to apply batch actions (like deleting or moving rows).

### 2. **Data Management and JavaScript Functionality:**

- **Data Handling:** The data for the chemicals is loaded from a JSON file (`chemicals.json`). This file contains an array of chemical records, which are then dynamically displayed in the table.
- **Adding Records:** New records can be added through the "Add" button, which automatically assigns an ID to the new entry.
- **Sorting:** Clicking a table header sorts the rows based on the column, with toggling between ascending and descending orders. The sorting logic can handle both numerical and string-based data.
- **Row Manipulation:** Rows can be moved up or down within the table based on the user’s selection.
- **Editing:** Fields such as `Density` and `Viscosity` are editable directly within the table cells using `contenteditable`.

### 3. **Progressive Web App (PWA) Implementation:**

I implemented PWA functionality to make the app available offline and installable on mobile devices.

Steps for PWA:
- **Service Worker:** A service worker (`service-worker.js`) is registered to enable caching and offline functionality. This file caches the essential resources (HTML, CSS, JS, and the JSON data file) to ensure the app works even without an internet connection.
  
- **Manifest File:** A `manifest.json` file was added, which contains metadata about the app, such as the name, icons, and display properties. This file allows the app to be installed on users' home screens like a native app.

#### How It Works as a PWA:
- Once you open the page, it registers a service worker.
- The service worker caches files so that if the app is accessed again, it works offline.
- The manifest file provides instructions to make it installable on devices, with specific icons and names.
  
---

## Implementation Choices

### 1. **UI Design:**
   - I chose Bootstrap components for a clean and mobile-responsive design.
   - Font Awesome icons were used for the buttons to give a modern and visually clear representation of actions like adding, saving, and deleting rows.
   
### 2. **File Structure:**
   - All external libraries like Bootstrap and Font Awesome are loaded via CDN to keep the project lightweight.
   - JSON data is stored locally in `chemicals.json`, with an async function to load the records.
   
### 3. **Sorting & Editing:**
   - Sorting is handled using vanilla JavaScript event listeners on the table headers. I used the `.localeCompare()` function for string sorting and `parseFloat()` for numerical comparisons.
   - Editing functionality is applied directly within the table cells, making it intuitive for users to modify chemical properties in place.
   
### 4. **Progressive Web App:**
   - PWA functionality was added to make the app more versatile, especially for use cases where internet access might be limited. 
   - The app can be added to a mobile device's home screen for quick access.
   - The service worker ensures the app works offline by caching static assets and data on the first load.
   - I referred to [this guide](https://tudip.com/blog-post/how-to-turn-a-website-or-web-application-into-pwa-with-example/) for assistance in implementing PWA features like the service worker and manifest file setup.

---

## Future Improvements
- **Improved Error Handling:** I could enhance error messaging when loading records or interacting with the app, making it more user-friendly.
- **Data Persistence:** Currently, data is logged to the console. A future improvement could include saving records to local storage or integrating a backend API for persistent data management.
- **Enhanced Mobile Experience:** While the app is mobile-responsive, there is room to further optimize the UI for small screens.

---




