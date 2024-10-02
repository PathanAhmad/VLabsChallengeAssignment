
        
        
        let records = [];

        let highlightedRows = [];

        // This object tracks my sorting setup. Basically, which column I'm sorting and whether it’s ascending or descending.
        let sortState = { columnIndex: null, isAscending: true};

        // This maps column numbers to their names in the records. It makes sorting and displaying the data way easier.
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







        // This function displays the chemical records in the table.
        function displayTable() {
            const body = document.querySelector("#chemical-table tbody");
            body.innerHTML = '';
        
            records.forEach((entry, idx) => {
                const row = document.createElement("tr");
        
                // Add 'selected' class to the row if it is highlighted
                if (highlightedRows.includes(idx)) {
                    row.classList.add("selected");
                }
        
                // Create a cell for the Font Awesome tick icon
                const checkBoxCell = document.createElement("td");
                checkBoxCell.innerHTML = `
                    <i class="fas fa-check ${highlightedRows.includes(idx) ? 'blue-tick' : 'grey-tick'}"
                       onclick="highlightRow(${idx})" style="cursor: pointer;"></i>`;
                row.appendChild(checkBoxCell);
        
                // Create cells for the rest of the data
                Object.keys(entry).forEach(prop => {
                    const cell = document.createElement("td");
        
                    if (prop === 'density' || prop === 'viscosity' || prop === 'quantity') {
                        // Wrap these values in their respective boxes
                        cell.innerHTML = `<div class="${prop}-box" contenteditable="true">${entry[prop]}</div>`;
                    } else {
                        // Make other cells editable
                        cell.contentEditable = true;
                        cell.textContent = entry[prop];
                    }
        
                    // Update the cell's content when it loses focus
                    cell.addEventListener("blur", (event) => updateCell(event, idx, prop));
                    row.appendChild(cell);
                });
        
                body.appendChild(row);
            });
        }
        
        
        
        







        // This function fetches data from a JSON file and updates the table.
        async function fetchData() {
            try {
                // I make a request to fetch the data from 'chemicals.json'.
                const response = await fetch('chemicals.json');
                
                // If the response isn’t okay, I throw an error with the status code.
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                
                // Once I get a valid response, I parse the JSON data.
                records = await response.json();
                
                // After fetching the data, I call displayTable to show it.
                displayTable();
            } catch (error) {
                // If something goes wrong, I log the error and alert the user.
                console.error('Error fetching data:', error);
                alert('Failed to load records. Check the console for more details.');
            }
        }







        // This function adds a new chemical record to the table.
        function addNewChemical() {
            // I create a new record with default values and push it to the 'records' array.
            records.push({
                id: records.length + 1, // Assign a new ID based on the current number of records.
                chemicalName: "Unnamed Chemical", // Default name.
                vendor: "Unknown Vendor", // Default vendor.
                density: "Unknown", // Default density.
                viscosity: "Unknown", // Default viscosity.
                packaging: "Unknown", // Default packaging type.
                packSize: 0, // Default pack size.
                unit: "Unknown", // Default unit of measurement.
                quantity: 0 // Start with a quantity of 0.
            });
            
            // After adding the new record, I call displayTable to refresh the view.
            displayTable();
        }







        // This function moves the selected chemical records down in the table.
        function moveChemicalDown() {
            // First, I sort the highlighted rows to make sure I move them in the correct order.
            highlightedRows.sort((a, b) => a - b);
            // Check if the last highlighted row can be moved down (not exceeding the last record).
            let canMove = highlightedRows[highlightedRows.length - 1] < records.length - 1;

            // If I can move the highlighted rows down, I start swapping them.
            if (canMove) {
                for (let i = highlightedRows.length - 1; i >= 0; i--) {
                    const index = highlightedRows[i];
                    // Swap the current record with the one below it.
                    [records[index], records[index + 1]] = [records[index + 1], records[index]];
                    // Update the index in highlightedRows to reflect the new position.
                    highlightedRows[i] += 1;
                }
            }

            // Finally, I refresh the table to show the updated order.
            displayTable();
        }







        // This function moves the selected chemical records up in the table.
        function moveChemicalUp() {
            // First, I sort the highlighted rows in reverse order.
            highlightedRows.sort((a, b) => b - a);
            // Check if the first highlighted row can be moved up (not going below the first record).
            let canMove = highlightedRows[0] > 0;

            // If I can move the highlighted rows up, I start swapping them.
            if (canMove) {
                for (let i = 0; i < highlightedRows.length; i++) {
                    const index = highlightedRows[i];
                    // Swap the current record with the one above it.
                    [records[index], records[index - 1]] = [records[index - 1], records[index]];
                    // Update the index in highlightedRows to reflect the new position.
                    highlightedRows[i] -= 1;
                }
            }

            // Finally, I refresh the table to show the updated order.
            displayTable();
        }







        // This function removes selected chemical records from the table.
        function removeChemical() {
            // First, I check if there are any highlighted rows to remove.
            if (highlightedRows.length > 0) {
                // Sort the highlighted rows in reverse order to avoid index issues during deletion.
                highlightedRows.sort((a, b) => b - a);
                
                // Remove each highlighted record from the 'records' array.
                highlightedRows.forEach(idx => records.splice(idx, 1));
                
                // Clear the highlighted rows after deletion.
                highlightedRows = [];
                
                // Refresh the table to reflect the changes.
                displayTable();
            } else {
                // If no rows are selected, alert the user to select at least one.
                alert("Select at least one row to delete.");
            }
        }







        // Need I explain this? Just reloading the records! XD
        function reloadChemicalRecord() {
            fetchData();
        }







        // Time to save the records! 
        function saveRecords() {
            // I'm logging the current records to the console in a nice format.
            console.log("Saving records:", JSON.stringify(records, null, 2));
            // Letting the user know that the data has been saved.
            alert("Data saved to console.");
        }







        // This function highlights or unhighlights a row when I click on it.
        function highlightRow(idx) {
            const tickIcon = document.querySelectorAll("#chemical-table tbody td i")[idx];
            const row = tickIcon.closest('tr');
        
            if (highlightedRows.includes(idx)) {
                highlightedRows = highlightedRows.filter(i => i !== idx);
                tickIcon.classList.remove('blue-tick');
                tickIcon.classList.add('grey-tick');
                row.classList.remove('selected');
            } else {
                highlightedRows.push(idx);
                tickIcon.classList.remove('grey-tick');
                tickIcon.classList.add('blue-tick');
                row.classList.add('selected');
            }
        
            console.log("Highlighted Rows:", highlightedRows); // Debugging
            displayTable(); // Refresh the table display
        }
        
        
        
        
        







        // Oh boy, this one's complicated and took me quite some time too, but here we go! Setting up sorting for the table columns.
        document.querySelectorAll('th').forEach(th => {
            th.addEventListener('click', function () {
                // First, I find out which column was clicked.
                const columnIndex = Array.from(th.parentNode.children).indexOf(th);
                const columnKey = columnMapping[columnIndex]; // Get the right key from the mapping.

                // If it's not a sortable column, I just skip it.
                if (!columnKey) return;

                // Now, I need to decide if I'm sorting ascending or descending.
                const isAscending = sortState.columnIndex === columnIndex ? !sortState.isAscending : true;
                sortState = { columnIndex, isAscending };

                // Time to sort the records based on the selected column!
                records.sort((a, b) => {
                    let valueA = a[columnKey];
                    let valueB = b[columnKey];

                    // Check if these values are numbers.
                    const isNumericA = !isNaN(valueA);
                    const isNumericB = !isNaN(valueB);

                    // Convert to numbers if they are numeric.
                    if (isNumericA) valueA = parseFloat(valueA);
                    if (isNumericB) valueB = parseFloat(valueB);

                    // Do the sorting based on their types and the chosen order.
                    if (isNumericA && isNumericB) {
                        return isAscending ? valueA - valueB : valueB - valueA;
                    } else {
                        return isAscending 
                            ? String(valueA).localeCompare(String(valueB)) 
                            : String(valueB).localeCompare(String(valueA));
                    }
                });

                // Finally, refresh the table to show the sorted records!
                displayTable();
            });
        });







        fetchData();
