let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Load expenses from local storage on page load
window.addEventListener('load', function () {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
        updateExpensesTable();
    }
});

function saveExpensesToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function updateExpensesTable() {
    // Clear the table before updating
    expensesTableBody.innerHTML = '';

    for (const expense of expenses) {
        totalAmount += expense.amount;

        const newRow = expensesTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        const deleteBtn = document.createElement('button');

        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function () {
            expenses.splice(expenses.indexOf(expense), 1);

            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount;

            expensesTableBody.removeChild(newRow);

            // Save updated expenses to local storage
            saveExpensesToLocalStorage();
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);
    }

    // Update the total amount
    totalAmountCell.textContent = totalAmount;

    // Save expenses to local storage after updating the table
    saveExpensesToLocalStorage();
}

addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '' || isNaN(amount) || amount <= 0 || date === '') {
        alert('Please fill in all fields with valid values.');
        return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);

    totalAmount += amount;

    updateExpensesTable();
});

