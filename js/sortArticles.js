function sortTable(columnIndex) {
    let rows = Array.from(document.querySelectorAll('.art-table-row'));
    let sortedRows = rows.sort((a, b) => {
        let aValue = a.children[columnIndex].textContent;
        let bValue = b.children[columnIndex].textContent;
        // Adjust comparison for date or other data types as needed
        return aValue.localeCompare(bValue);
    });
    let table = document.querySelector('.art-table');
    sortedRows.forEach(row => table.appendChild(row));
}

document.addEventListener("DOMContentLoaded", sortTable(columnIndex));