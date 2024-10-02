/*
 * Index for script.js
 * 
 * - Variables:
 *    - records: Stores chemical records.
 *    - selectedChemicalRows: Tracks which rows are highlighted.
 *    - sortState: Tracks current sorting setup.
 *    - columnMapping: Maps column numbers to their corresponding names.
 *
 * 
 * 
 * 1. Data Management
 *    - loadChemicalData(): Fetches data from a JSON file and updates the table.
 *    - addNewChemical(): Adds a new chemical record to the table.
 *    - removeChemical(): Removes selected chemical records from the table.
 *    - reloadChemicalRecord(): Reloads the chemical records from the data source.
 *    - saveRecords(): Saves the current records to the console.
 *
 * 
 * 
 * 2. Table Display and Interaction
 *    - displayTable(): Displays the chemical records in the table.
 *    - selectChemicalRow(idx): Highlights or unhighlights a row when clicked.
 *
 * 
 * 
 * 3. Row Manipulation
 *    - moveChemicalUp(): Moves the selected chemical records up in the table.
 *    - moveChemicalDown(): Moves the selected chemical records down in the table.
 *
 * 
 * 
 * 4. Sorting
 *    - Event Listener on Table Headers: Sets up sorting for the table columns based on header clicks.
 * 
 * 
 * 
 */

let records = [];
let selectedChemicalRows = [];
let sortState = { columnIndex: null, isAscending: true };
const columnMapping = {
    1: 'id',
    2: 'chemicalName',
    3: 'vendor',
    4: 'density',
    5: 'viscosity',
    6: 'packaging',
    7: 'packSize',
    8: 'unit',
    9: 'quantity'
};







// =========================
// 1. Data Management
// =========================



    async function loadChemicalData() {
        try {
            const response = await fetch('chemicals.json');
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            records = await response.json();
            displayTable();
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to load records. Check the console for more details.');
        }
    }



    function addNewChemical() {
        records.push({
            id: records.length + 1,
            chemicalName: "Unnamed Chemical",
            vendor: "Unknown Vendor",
            density: "Unknown",
            viscosity: "Unknown",
            packaging: "Unknown",
            packSize: 0,
            unit: "Unknown",
            quantity: 0
        });
        displayTable();
    }



    function removeChemical() {
        if (selectedChemicalRows.length > 0) {
            selectedChemicalRows.sort((a, b) => b - a);
            selectedChemicalRows.forEach(idx => records.splice(idx, 1));
            selectedChemicalRows = [];
            displayTable();
        } else {
            alert("Select at least one row to delete.");
        }
    }



    function reloadChemicalRecord() {
        loadChemicalData();
    }



    function saveRecords() {
        console.log("Saving records:", JSON.stringify(records, null, 2));
        alert("Data saved to console.");
    }







// =========================
// 2. Table Display and Interaction
// =========================



    function displayTable() {
        const body = document.querySelector("#chemical-table tbody");
        body.innerHTML = '';

        records.forEach((entry, idx) => {
            const row = document.createElement("tr");
            if (selectedChemicalRows.includes(idx)) {
                row.classList.add("selected");
            }
            const checkBoxCell = document.createElement("td");
            checkBoxCell.innerHTML = `
                <i class="fas fa-check ${selectedChemicalRows.includes(idx) ? 'blue-tick' : 'grey-tick'}"
                onclick="selectChemicalRow(${idx})" style="cursor: pointer;"></i>`;
            row.appendChild(checkBoxCell);
            
            Object.keys(entry).forEach(prop => {
                const cell = document.createElement("td");
                if (prop === 'density' || prop === 'viscosity' || prop === 'quantity') {
                    cell.innerHTML = `<div class="${prop}-box" contenteditable="true">${entry[prop]}</div>`;
                } else {
                    cell.contentEditable = true;
                    cell.textContent = entry[prop];
                }
                cell.addEventListener("blur", (event) => updateCell(event, idx, prop));
                row.appendChild(cell);
            });

            body.appendChild(row);
        });
    }



    function selectChemicalRow(idx) {
        const tickIcon = document.querySelectorAll("#chemical-table tbody td i")[idx];
        const row = tickIcon.closest('tr');

        if (selectedChemicalRows.includes(idx)) {
            selectedChemicalRows = selectedChemicalRows.filter(i => i !== idx);
            tickIcon.classList.remove('blue-tick');
            tickIcon.classList.add('grey-tick');
            row.classList.remove('selected');
        } else {
            selectedChemicalRows.push(idx);
            tickIcon.classList.remove('grey-tick');
            tickIcon.classList.add('blue-tick');
            row.classList.add('selected');
        }

        console.log("Highlighted Rows:", selectedChemicalRows);
        displayTable();
    }







// =========================
// 3. Row Manipulation
// =========================



    function moveChemicalUp() {
        selectedChemicalRows.sort((a, b) => b - a);
        let canMove = selectedChemicalRows[0] > 0;

        if (canMove) {
            for (let i = 0; i < selectedChemicalRows.length; i++) {
                const index = selectedChemicalRows[i];
                [records[index], records[index - 1]] = [records[index - 1], records[index]];
                selectedChemicalRows[i] -= 1;
            }
        }
        displayTable();
    }



    function moveChemicalDown() {
        selectedChemicalRows.sort((a, b) => a - b);
        let canMove = selectedChemicalRows[selectedChemicalRows.length - 1] < records.length - 1;

        if (canMove) {
            for (let i = selectedChemicalRows.length - 1; i >= 0; i--) {
                const index = selectedChemicalRows[i];
                [records[index], records[index + 1]] = [records[index + 1], records[index]];
                selectedChemicalRows[i] += 1;
            }
        }
        displayTable();
    }







// =========================
// 4. Sorting
// =========================



    document.querySelectorAll('th').forEach(th => {
        th.addEventListener('click', function () {
            const columnIndex = Array.from(th.parentNode.children).indexOf(th);
            const columnKey = columnMapping[columnIndex];
            if (!columnKey) return;

            const isAscending = sortState.columnIndex === columnIndex ? !sortState.isAscending : true;
            sortState = { columnIndex, isAscending };

            records.sort((a, b) => {
                let valueA = a[columnKey];
                let valueB = b[columnKey];

                const isNumericA = !isNaN(valueA);
                const isNumericB = !isNaN(valueB);

                if (isNumericA) valueA = parseFloat(valueA);
                if (isNumericB) valueB = parseFloat(valueB);

                if (isNumericA && isNumericB) {
                    return isAscending ? valueA - valueB : valueB - valueA;
                } else {
                    return isAscending 
                        ? String(valueA).localeCompare(String(valueB)) 
                        : String(valueB).localeCompare(String(valueA));
                }
            });

            displayTable();
        });
    });


    loadChemicalData();
