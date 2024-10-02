Chemical Supplies Table - Design and Implementation Documentation
1. Introduction
The purpose of this document is to provide a detailed explanation of the design choices and technical approach taken for the development of the Chemical Supplies Table web application. The project adheres to the given requirements using only HTML, CSS, and plain JavaScript, and offers features such as sorting, editing, and row manipulation.

2. Design Approach
2.1 Page Layout
The page is structured with a header (h2) and a toolbar at the top for various actions (add, delete, move rows, etc.).
The core of the page is a table wrapped in a Bootstrap-responsive div to ensure adaptability to different screen sizes.
Bootstrap 5.3 is used for basic styling and layout, while custom CSS is applied for table styling and interactive elements.
2.2 HTML Table Structure
The table contains the following columns:

ID
Chemical Name
Vendor
Density
Viscosity
Packaging
Pack Size
Unit
Quantity
Each column can be sorted, and certain fields (density, viscosity, quantity) are made editable for user input.

The table is dynamically generated using JavaScript based on an array of objects that store chemical information. The data is fetched from a local JSON file (chemicals.json), which contains an array of 15 chemical records.

3. Functional Features
3.1 Data Loading
The chemical data is loaded into the table using the loadChemicalData() function.
Data is fetched asynchronously from chemicals.json using the fetch() API, and then displayed dynamically by creating table rows in JavaScript.
3.2 Adding New Chemicals
A new row with default values (e.g., Unnamed Chemical, Unknown Vendor, 0) is added to the table when the "Add" button is clicked.
This functionality is handled by the addNewChemical() function. It increments the id based on the current number of records.
3.3 Removing Chemicals
Users can select one or more rows using checkboxes, and the selected rows can be deleted with the "Delete" button.
This is achieved using the removeChemical() function, which identifies the selected rows and removes them from the records array.
3.4 Row Movement
Rows can be moved up or down using the "Move Up" and "Move Down" buttons.
The movement logic is controlled by two functions: moveChemicalUp() and moveChemicalDown(). These functions modify the records array by swapping the selected rows with adjacent rows.
3.5 Saving Data
The "Save" button logs the current state of the records array (chemical data) into the console. This is implemented via the saveRecords() function.
This decision was made to simplify the process, as modifying the original JSON file on the client side is not feasible without a backend.
3.6 Reloading Data
The "Reload" button reloads the chemical records from the JSON file, effectively restoring the table to its original state.
The reloadChemicalRecord() function reloads the data by re-invoking the loadChemicalData() function.
3.7 Sorting
Each column in the table can be sorted in both ascending and descending order. This is accomplished by clicking on the table headers.
Sorting is handled by a click event listener attached to each th (table header). When a header is clicked, the corresponding column is sorted either in ascending or descending order based on the current state (sortState object).
Sorting logic differentiates between numeric and string data, ensuring that fields like density and quantity are sorted numerically, while chemicalName and vendor are sorted lexicographically.
3.8 Editing Cells
Certain table cells, like density, viscosity, and quantity, are editable via the browser's content-editable feature.
The showChemicalRecords() function is responsible for rendering these fields in an editable div inside the table cells. Changes made by the user are saved back into the records array using the updateCell() function, which tracks cell edits.
4. Code Design
4.1 File Structure
index.html: The main HTML file containing the structure of the page, including the table and toolbar.
style.css: Custom CSS file for styling the table, rows, and various interactive elements (e.g., hover effects, row selection).
script.js: The core JavaScript file responsible for data management, table rendering, sorting, and event handling.
chemicals.json: Contains the initial data (15 rows of chemical records) loaded into the table.
4.2 Data Structure
The chemical records are stored in an array of objects (records array), where each object represents a chemical with the following structure:

javascript
Copy code
{
    id: 1,
    chemicalName: "Sample Chemical",
    vendor: "Vendor A",
    density: "1.2",
    viscosity: "0.89",
    packaging: "Box",
    packSize: 10,
    unit: "Kg",
    quantity: 20
}
4.3 CSS Styling
Bootstrap 5.3 is used for basic layout (e.g., grid system, responsive design).
Custom CSS is applied for table design, row highlighting, and hover effects.
The styling ensures a clean and intuitive user interface, with clear indicators for selected rows and editable fields.
4.4 JavaScript Logic
The main functions are categorized as follows:

Data Management: Functions like loadChemicalData(), addNewChemical(), and saveRecords() handle the loading, adding, and saving of records.
Table Display: The showChemicalRecords() function renders the table by dynamically creating rows and cells based on the data in the records array.
Sorting and Interaction: Sorting is implemented through event listeners attached to the headers, and interaction (e.g., selecting, moving rows) is managed by updating the selectedChemicalRows array.
5. Challenges and Solutions
5.1 Sorting
Sorting by both numeric and string values posed challenges. Initially, string-based comparisons caused incorrect ordering for numbers. This was resolved using the localeCompare() method for strings and parsing numeric values with parseFloat() for numeric sorting.
5.2 Editable Cells
Making certain fields editable while retaining a clean design required a creative solution. The choice to use contenteditable for inline editing ensured a smooth user experience without introducing complex modal dialogs or popups.
5.3 Row Manipulation
Maintaining the integrity of row indices while moving multiple rows up or down was tricky. The solution involved sorting selected rows before performing the move operations to avoid index collisions.
6. Conclusion
This project demonstrates a simple yet robust approach to building a dynamic, interactive table using only HTML, CSS, and JavaScript. The key design choices focused on usability, clarity, and adherence to the project requirements.

Further enhancements, such as adding a backend for data persistence or making the app a Progressive Web App (PWA), could elevate this project, but the current implementation meets the core functionality expected.

