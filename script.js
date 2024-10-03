/*                                          /////////////////  
 *                                         //    INDEX    //  
 *                                        /////////////////  
 *  
 *  
 *  
 * - Variables:  
 *    - recs:                  Stores chemical records.  
 *    - selChemRows:           Tracks which rows are selected.  
 *    - sortSt:                Holds current sorting state (column index and order).  
 *    - chemAttrMap:           Maps column numbers to attribute names.  
 *  
 *  
 *  
 * 1. Data Management  
 *    - loadChemData():     Fetches chemical data from chemicals.json.  
 *    - addNewChem():       Adds a new chemical entry.  
 *    - remChem():          Removes selected chemical rows from the table.  
 *    - reloadChemRec():    Reloads chemical records from the data source.  
 *    - saveRecs():         Saves the current records to the console.  
 *  
 *  
 *  
 * 2. Table Display and Interaction  
 *    - showChemRecs():     Displays chemical records in the table.  
 *    - selChemRow(idx):    Highlights or unhighlights a row when selected.  
 *  
 *  
 *  
 * 3. Row Manipulation  
 *    - moveChemUp():       Moves the selected chemical records up in the table.  
 *    - moveChemDown():     Moves the selected chemical records down in the table.  
 *  
 *  
 *  
 * 4. Sorting  
 *    - Event Listener on Table Headers: Sets up sorting for the table columns based on header clicks.  
 *  
 *  
 *  
 */  



        let recs = [];  
        let selChemRows = [];  
        let sortSt = { colIdx: null, asc: true };  
        const chemAttrMap = {  
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







  //////////////////////
 //1. Data Management///////////////////////////////////////////////////////////////////////////////
//////////////////////



        async function loadChemData() {  
            try {  
                const res = await fetch('chemicals.json');  
                if (!res.ok) throw new Error(`Err: ${res.status}`);  
                recs = await res.json();  
                showChemRecs();  
            } catch (err) {  
                alert('Failed to load recs. Check console.');  
            }  
        }  



        function addNewChem() {  
            recs.push({  
                id: recs.length + 1,  
                chemicalName: "N/A",  
                vendor: "N/A",  
                density: "N/A",  
                viscosity: "N/A",  
                packageType: "N/A",  
                packageSize: "N/A",  
                unitType: "N/A",  
                quantity: 0  
            });  
            showChemRecs();  
        }  



        function remChem() {  
            if (selChemRows.length > 0) {  
                selChemRows.sort((a, b) => b - a);  
                selChemRows.forEach(idx => recs.splice(idx, 1));  
                selChemRows = [];  
                showChemRecs();  
            } else {  
                alert("Select at least 1 row.");  
            }  
        }  



        function reloadChemRec() {  
            loadChemData();  
        }  



        function saveRecs() {  
            console.log("Saving recs:", JSON.stringify(recs, null, 2));  
            alert("Data saved to console.");  
        }  
        /*
        Explanation:
        I save the records to the console since I can’t change the JSON file directly without using a framework or I'm too inexperienced for this. I'll look into if it's possible and will push this update to the repo if it is. 
        */ 







  ////////////////////////////////////
 //2. Table Display and Interaction/////////////////////////////////////////////////////////////////////////
////////////////////////////////////



        function showChemRecs() {  
            const body = document.querySelector("#chemical-table tbody");  
            body.innerHTML = '';  

            recs.forEach((ent, idx) => {  
                const row = document.createElement("tr");  
                if (selChemRows.includes(idx)) {  
                    row.classList.add("selected");  
                }  

                const chkBox = document.createElement("td");  
                chkBox.innerHTML = `<i class="fas fa-check ${selChemRows.includes(idx) ? 'blue-tick' : 'grey-tick'}"  
                    onclick="selChemRow(${idx})" style="cursor: pointer;"></i>`;  
                row.appendChild(chkBox);  

                Object.keys(ent).forEach(prop => {  
                    const cell = document.createElement("td");  
                    if (prop === 'density' || prop === 'viscosity' || prop === 'quantity') {  
                        cell.innerHTML = `<div class="${prop}-box" contenteditable="true">${ent[prop]}</div>`;  
                    } else {  
                        cell.contentEditable = true;  
                        cell.textContent = ent[prop];  
                    }  
                    cell.addEventListener("blur", (event) => updCell(event, idx, prop));  
                    row.appendChild(cell);  
                });  

                body.appendChild(row);  
            });  
        }  
        /*
        Explanation:
        This function, I made, to show the chemical records in a table format. It first clears the body of the table. Then, for each record, I create a new row. I check if the row should be highlighted based on user selection. It took me some time to figure out the event listeners logic, but it turned out to be useful.  
        */ 


        
        function updCell(event, rowIndex, colName) {
            const newValue = event.target.textContent.trim();
            recs[rowIndex][colName] = newValue; // Update the 'recs' array with the new value
            console.log(`Updated recs: ${JSON.stringify(recs[rowIndex])}`);
        }



        function selChemRow(idx) {  
            const tickIcon = document.querySelectorAll("#chemical-table tbody td i")[idx];  
            const row = tickIcon.closest('tr');  

            if (selChemRows.includes(idx)) {  
                selChemRows = selChemRows.filter(i => i !== idx);  
                tickIcon.classList.remove('blue-tick');  
                tickIcon.classList.add('grey-tick');  
                row.classList.remove('selected');  
            } else {  
                selChemRows.push(idx);  
                tickIcon.classList.remove('grey-tick');  
                tickIcon.classList.add('blue-tick');  
                row.classList.add('selected');  
            }  

            console.log("Highlighted Rows:", selChemRows);  
            showChemRecs();  
        }  







  ///////////////////////
 //3. Row Manipulation/////////////////////////////////////////////////////////////////////////////////
///////////////////////



        function moveChemUp() {  
            selChemRows.sort((a, b) => b - a);  
            let canMove = selChemRows[0] > 0;  

            if (canMove) {  
                for (let i = 0; i < selChemRows.length; i++) {  
                    const idx = selChemRows[i];  

                    [recs[idx], recs[idx - 1]] = [recs[idx - 1], recs[idx]];  
                    selChemRows[i] -= 1;  
                }  
            }  
            showChemRecs();  
        }  
        /*
        Explanation:
        I first check if the rows can move without going out of bounds. I sorted the selected rows in descending order so when I swap them, I don't mess up the remaining indices.  
        */  



        function moveChemDown() {  
            selChemRows.sort((a, b) => a - b);  
            let canMove = selChemRows[selChemRows.length - 1] < recs.length - 1;  

            if (canMove) {  
                for (let i = selChemRows.length - 1; i >= 0; i--) {  
                    const idx = selChemRows[i];  
                    [recs[idx], recs[idx + 1]] = [recs[idx + 1], recs[idx]];  
                    selChemRows[i] += 1;  
                }  
            }  
            showChemRecs();  
        }  
        /*
        Explanation:
        The logic here is sort of similar to the previous function, just minor differences. 
        */  







  //////////////
 //4. Sorting///////////////////////////////////////////////////////////////////////////////////
//////////////



        document.querySelectorAll('th').forEach(th => {  
            th.addEventListener('click', function () {  
                const colIdx = Array.from(th.parentNode.children).indexOf(th);  
                const colKey = chemAttrMap[colIdx];  
                if (!colKey) return;  

                const asc = sortSt.colIdx === colIdx ? !sortSt.asc : true;  
                sortSt = { colIdx, asc };  

                recs.sort((a, b) => {  
                    let valA = a[colKey];  
                    let valB = b[colKey];  

                    const numA = !isNaN(valA);  
                    const numB = !isNaN(valB);  

                    if (numA) valA = parseFloat(valA);  
                    if (numB) valB = parseFloat(valB);  

                    if (numA && numB) {  
                        return asc ? valA - valB : valB - valA;  
                    } else {  
                        return asc  
                            ? String(valA).localeCompare(String(valB))  
                            : String(valB).localeCompare(String(valA));  
                    }  
                });  
                showChemRecs();  
            });  
        });  
        /*
        Explanation:
        I added a click listener to the headers of the table, and this function handles sorting based on which header is clicked. I also learned about localeCompare to handle string comparisons, which was interesting. 
        */  



        loadChemData();  
