const firstNumberInput = document.getElementById('first-number');
const secondNumberInput = document.getElementById('second-number');
const storedData = document.getElementById('stored-data');
const message = document.getElementById('message');
const clearDataButton = document.getElementById('clear-data');
const storageKey = 'arithmetic-results';

let calculations = JSON.parse(localStorage.getItem(storageKey) || '[]');

function renderCalculations() {
	storedData.innerHTML = '';

	if (calculations.length === 0) {
		storedData.innerHTML = '<li class="empty-state">No calculations stored yet.</li>';
		return;
	}

	calculations.forEach((calculation) => {
		const item = document.createElement('li');
		item.className = 'stored-item';
		item.innerHTML = `<span class="expression">${calculation.expression}</span><span class="result">${calculation.result}</span>`;
		storedData.appendChild(item);
	});
}

function calculate(operation, firstNumber, secondNumber) {
	const symbols = {
		add: '+',
		subtract: '-',
		divide: '/',
		multiply: '*'
	};

	const results = {
		add: firstNumber + secondNumber,
		subtract: firstNumber - secondNumber,
		divide: firstNumber / secondNumber,
		multiply: firstNumber * secondNumber
	};

	return {
		expression: `${firstNumber} ${symbols[operation]} ${secondNumber} =`,
		result: results[operation]
	};
}

document.querySelectorAll('[data-operation]').forEach((button) => {
	button.addEventListener('click', () => {
		const firstNumber = Number(firstNumberInput.value);
		const secondNumber = Number(secondNumberInput.value);
		const operation = button.dataset.operation;

		if (firstNumberInput.value === '' || secondNumberInput.value === '') {
			message.textContent = 'Please enter both numbers.';
			return;
		}

		if (operation === 'divide' && secondNumber === 0) {
			message.textContent = 'You cannot divide by zero.';
			return;
		}

		const calculation = calculate(operation, firstNumber, secondNumber);
		calculations.unshift(calculation);
		localStorage.setItem(storageKey, JSON.stringify(calculations));
		message.textContent = `Result: ${calculation.result}`;
		renderCalculations();
	});
});

clearDataButton.addEventListener('click', () => {
	calculations = [];
	localStorage.removeItem(storageKey);
	message.textContent = '';
	renderCalculations();
});

renderCalculations();
