// Call this function when the page loads
window.onload = function() {
    updateArrowDirection(1); // Initialize arrow for 'Date' column
    document.getElementById('selectAll').checked = true; // Ensure 'Select All' is checked by default
    toggleSelectAll(document.getElementById('selectAll')); // Apply the default state of 'Select All'
	let icon = document.getElementById('dateIcon');
    icon.classList.add('rotate-date');
}

let sortOrder = 1; // 1 for ascending, -1 for descending
let currentSortedColumn = null;

function sortTable(columnIndex) {
    if (columnIndex === 0) { // If Date column is clicked
        sortOrder = -sortOrder; // Toggle the sort order
    } else if (currentSortedColumn !== columnIndex) {
        sortOrder = 1; // Reset to ascending for a new column
    }
    currentSortedColumn = columnIndex;

    // Sorting logic...
    let rows = Array.from(document.querySelectorAll('.art-table-row'));
    let sortedRows = rows.sort((a, b) => {
        let aValue = a.children[columnIndex].textContent;
        let bValue = b.children[columnIndex].textContent;
        return aValue.localeCompare(bValue) * sortOrder;
    });
    let table = document.querySelector('.art-table');
    sortedRows.forEach(row => table.appendChild(row));

    // Update the arrow direction
    updateArrowDirection(columnIndex);
}


function updateArrowDirection(columnIndex) {
    // Check if the clicked column is 'Date'
    if (columnIndex === 0) {
        let icon = document.getElementById('dateIcon');
        // Toggle the rotation class based on the sortOrder
        if (sortOrder === 1) {
            icon.classList.remove('rotate-date'); // Ascending sort
        } else {
            icon.classList.add('rotate-date'); // Descending sort
        }
    }
}

function toggleDropdown() {
    let dropdown = document.getElementById("dropdown");
    let docTypeHeader = document.querySelector('.art-header-row .art-header:nth-child(3)'); // Adjust as needed

    // Calculate position
    let headerRect = docTypeHeader.getBoundingClientRect();
    dropdown.style.left = headerRect.left + 'px';
    dropdown.style.top = headerRect.bottom + 'px'; // Position it right below the header

    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}


function toggleSelectAll(selectAllCheckbox) {
    let checkboxes = document.querySelectorAll('.filter');
    checkboxes.forEach(chk => {
        chk.checked = selectAllCheckbox.checked;
        chk.disabled = selectAllCheckbox.checked; // Disable other checkboxes if 'Select All' is checked
    });
    filterRows();
}

function filterRows() {
    let checkboxes = document.querySelectorAll('.filter:checked');
    let filterValues = Array.from(checkboxes).map(chk => chk.nextSibling.textContent.trim());
    let rows = document.querySelectorAll('.art-table-row');
    
    if (document.getElementById('selectAll').checked) {
        rows.forEach(row => row.style.display = ''); // Show all rows if 'Select All' is checked
    } else {
        rows.forEach(row => {
            let cellValue = row.children[2].textContent; // Adjust the index for the Document Type column
            row.style.display = filterValues.includes(cellValue) ? '' : 'none';
        });
    }
}