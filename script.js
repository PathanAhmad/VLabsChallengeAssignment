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
    2: 'chemName',  
    3: 'vend',  
    4: 'dens',  
    5: 'visc',  
    6: 'pkg',  
    7: 'pkSize',  
    8: 'unit',  
    9: 'qty'  
};  


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
/*
Explanation:
This function fetches chemical data from the specified JSON file. If it fails, it alerts the user and logs the error status to the console.  
*/  

function addNewChem() {  
    recs.push({  
        id: recs.length + 1,  
        chemName: "Unnamed Chem",  
        vend: "Unknown Vend",  
        dens: "Unknown",  
        visc: "Unknown",  
        pkg: "Unknown",  
        pkSize: 0,  
        unit: "Unknown",  
        qty: 0  
    });  
    showChemRecs();  
}  
/*
Explanation:
This function adds a new chemical record with default values to the list and updates the display to show the new entry.  
*/  

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
/*
Explanation:
This function removes the selected chemical rows from the list. If no rows are selected, it alerts the user to select at least one row.  
*/  

function reloadChemRec() {  
    loadChemData();  
}  
/*
Explanation:
This function simply calls loadChemData to reload the chemical records from the JSON file.  
*/  

function saveRecs() {  
    console.log("Saving recs:", JSON.stringify(recs, null, 2));  
    alert("Data saved to console.");  
}  
/*
Explanation:
This function saves the current records to the console in a formatted JSON string and alerts the user that the data has been saved.  
*/  

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
            if (prop === 'dens' || prop === 'visc' || prop === 'qty') {  
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
This function displays the chemical records in the table by creating rows and cells for each record and setting up event listeners for editing. It also highlights selected rows based on user selection.  
*/  

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
/*
Explanation:
This function highlights or unhighlights a chemical row based on user selection and updates the visual indicators accordingly.  
*/  

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
This function moves the selected chemical records up in the table by swapping their positions. It checks if the selected rows can be moved without going out of bounds.  
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
This function moves the selected chemical records down in the table. It checks if the last selected row can move down and then swaps their positions accordingly.  
*/  

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
This section sets up event listeners on table headers for sorting the data based on user clicks. It determines the sorting order (ascending/descending) and sorts the records accordingly.  
*/  

loadChemData();  
/*
Explanation:
This line calls the loadChemData function when the script first runs to populate the table with chemical records.  
*/
