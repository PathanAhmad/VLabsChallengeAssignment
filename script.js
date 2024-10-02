/*                                          /////////////////
 *                                         //    INDEX    //
 *                                        /////////////////
 * 
 * 
 * 
 * - Variables:
 *    - records:                  I store chemical records here.
 *    - selectedChemicalRows:     This I use to track which rows are highlighted.
 *    - sortState:                Tracks current sorting setup. (Look up below the function for explanation. It somehow works now.)
 *    - chemicalAttributeMapping: Maps column numbers to their names.
 *
 * 
 * 
 * 1. Data Management
 *    - loadChemicalData():     Simple data fetch from chemicals.json.
 *    - addNewChemical():       Adds a new chemical.
 *    - removeChemical():       Removes selected chemical records from the table.
 *    - reloadChemicalRecord(): Reloads the chemical records from the data source.
 *    - saveRecords():          Saves the current records to the console.
 *
 * 
 * 
 * 2. Table Display and Interaction
 *    - showChemicalRecords():  Displays the chemical records in the table.
 *    - selectChemicalRow(idx): Highlights or unhighlights a row when selected.
 *
 * 
 * 
 * 3. Row Manipulation
 *    - moveChemicalUp():   Moves the selected chemical records up in the table.
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
        const chemicalAttributeMapping = {
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
                    showChemicalRecords();
            } catch (error) {
                    // console.error('Error fetching data:', error);
                        alert('Failed to load records. Check the console for more details.');
            }
        }



        function addNewChemical() {
            records.push({
                  id:           records.length + 1,
                  chemicalName: "Unnamed Chemical",
                  vendor:       "Unknown Vendor",
                  density:      "Unknown",
                  viscosity:    "Unknown",
                  packaging:    "Unknown",
                  packSize:     0,
                  unit:         "Unknown",
                  quantity:     0
            });
               showChemicalRecords();
          }



        function removeChemical() {
            if (selectedChemicalRows.length > 0) {
                 selectedChemicalRows.sort((a, b) => b - a);
                 selectedChemicalRows.forEach(idx => records.splice(idx, 1));
                 selectedChemicalRows = [];
                showChemicalRecords();
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
    /*
    Explanation:
    I save the records to the console since I can’t change the JSON file directly without using a framework or I'm too inexperienced for this.
    */







// ================================
// 2. Table Display and Interaction
// ================================



        function showChemicalRecords() {
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
    /*
    Explanation:
    I designed this function to show the chemical records in a table format. It first clear the body of the table.Then, for each record, I create a new row. I check if the row should be highlighted based on user selection. It took me some time to figure out the event listeners, but it turned out to be useful.
    */



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
                showChemicalRecords();
    }
    
    /*
    Explanation:
    It first checks if the row is already selected or not. If it is, I remove it from the selection and update the visual indicators If not, I add it to the selection. 
    */







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
            showChemicalRecords();
        }
    /*
    Explanation:
    I first checks if the rows can move without going out of bounds. Sorted the selected rows in descending order so when I swap them, I don't mess up the remaining indices. 
    */



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
            showChemicalRecords();
        }
    /*
    Explanation:
    This is sort of similar to the previous function, just slight difference. First, I sort the selected rows so that I can handle the highest index first, preventing any out-of-bounds errors. Then, if the last selected row can move down, I swap it with the one below and update its index. 
    */
    






// =========================
// 4. Sorting
// =========================



        document.querySelectorAll('th').forEach(th => {
            th.addEventListener('click', function () {
                const columnIndex = Array.from(th.parentNode.children).indexOf(th);
                const columnKey = chemicalAttributeMapping[columnIndex];
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

                    // THis is where I was forced to learn about localeCompare T_T (Wasted too much time with bugs) 
                    if (isNumericA && isNumericB) {
                        return isAscending ? valueA - valueB : valueB - valueA;
                    } else {
                        return isAscending 
                            ? String(valueA).localeCompare(String(valueB)) 
                            : String(valueB).localeCompare(String(valueA));
                    }
                });

                showChemicalRecords();
            });
        });
    /*
    Explanation and Source:
    I first determine which column was clicked and check if it's valid. Then, I toggle the sort order if the same column is clicked again. The sorting logic handles both numeric and string values. Finally, refressshhh! (Problematic logic to speedrun through in 2 days, tbh, but it works now and I'm happy!) 
    This logic was kinda tricky to get right, ngl
    This time, I'll give due credit to a discussion on StackOverflow: https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values.
    */



        loadChemicalData();
