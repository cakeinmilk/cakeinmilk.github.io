let sortOrder = 1; // 1 for ascending, -1 for descending
let currentSortedColumn = null;

function sortTable(columnIndex) {
    if (currentSortedColumn === columnIndex) {
        sortOrder = -sortOrder; // Toggle the sort order if the same column is clicked again
    } else {
        sortOrder = 1; // Reset to ascending for a new column
    }
    currentSortedColumn = columnIndex;

    let rows = Array.from(document.querySelectorAll('.art-table-row'));
    let sortedRows = rows.sort((a, b) => {
        let aValue = a.children[columnIndex].textContent;
        let bValue = b.children[columnIndex].textContent;
        return aValue.localeCompare(bValue) * sortOrder;
    });
    let table = document.querySelector('.art-table');
    sortedRows.forEach(row => table.appendChild(row));

    updateArrowDirection(columnIndex);
}

function updateArrowDirection(columnIndex) {
    let headers = document.querySelectorAll('.art-header');
    headers.forEach((header, index) => {
        header.innerHTML = header.textContent.trim(); // Remove existing arrows
        if (index === columnIndex) {
            let arrow = sortOrder === 1 ? '↑' : '↓';
            header.innerHTML += ' ' + arrow;
        }
    });
}

function toggleDropdown() {
    let dropdown = document.getElementById("dropdown");
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function toggleSelectAll(selectAllCheckbox) {
    let checkboxes = document.querySelectorAll('.filter');
    checkboxes.forEach(chk => chk.checked = selectAllCheckbox.checked);
    filterRows();
}

function filterRows() {
    let checkboxes = document.querySelectorAll('.filter:checked');
    let filterValues = Array.from(checkboxes).map(chk => chk.nextSibling.textContent.trim());
    let rows = document.querySelectorAll('.art-table-row');

    rows.forEach(row => {
        let cellValue = row.children[2].textContent; // Adjust index for the Document Type column
        if (filterValues.length === 0 || filterValues.includes(cellValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}


document.addEventListener("DOMContentLoaded", sortTable(columnIndex));