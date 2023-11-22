let sortOrder = 1; // 1 for ascending, -1 for descending

function sortTable(columnIndex) {
    sortOrder = -sortOrder; // Toggle the sort order
    let rows = Array.from(document.querySelectorAll('.art-table-row'));
    let sortedRows = rows.sort((a, b) => {
        let aValue = a.children[columnIndex].textContent;
        let bValue = b.children[columnIndex].textContent;
        // Adjust comparison for date or other data types as needed
        return aValue.localeCompare(bValue) * sortOrder;
    });
    let table = document.querySelector('.art-table');
    sortedRows.forEach(row => table.appendChild(row));

    updateArrowDirection(columnIndex);
}

function updateArrowDirection(columnIndex) {
    let headers = document.querySelectorAll('.art-header');
    headers.forEach((header, index) => {
        header.innerHTML = header.textContent; // Remove existing arrows
        if (index === columnIndex) {
            let arrow = sortOrder === 1 ? '↑' : '↓';
            header.innerHTML += ' ' + arrow;
        }
    });
}

document.addEventListener("DOMContentLoaded", sortTable(columnIndex));