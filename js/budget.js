

const first = (()=>{

	let $ = (container) =>{
		return document.querySelector(container);
	}

	let all = (container) =>{
		return document.querySelectorAll(container);
	}

	let itemList = [];
	let itemId = 0;
	let budgetForm = $('#budget-form');
	let budgetInput = $('#budget-input');
	let budgetFeedback = $('.budget-feedback');
	let budgetAmount = $('#budget-amount');
	let balanceAmount = $('#balance-amount');
	let balance = $('#balance');
	let expenseAmount = $('#expense-amount');
	//console.log(expenseAmount);


	budgetForm.addEventListener('submit',(event)=>{
		event.preventDefault();



		let expance = () =>{
			let total = 0;
			if(itemList.length>0){
				total = itemList.reduce((accumulator,current)=>{
					accumulator += current.amount;
					return accumulator;
				},0);
			}
			expenseAmount.textContent = total
			return total;
		}

		let showBalance = () =>{
			let total = parseInt(budgetAmount.textContent) - expance();
			balanceAmount.textContent = total;
			//console.log(keep);

			if (total < 0){
				balance.classList.remove('showBlack','showGreen')
				balance.classList.add('showRed');
			}
			else if(total > 0){
				balance.classList.remove('showBlack','showRed');
				balance.classList.add('showGreen');
			}
			else if(total === 0){
				balance.classList.remove('showGreen','showRed');
				balance.classList.add('showBlack');
			}

		}

		let value = budgetInput.value;
		budgetInput.value = '';
		if(value === '' || value < 0){
			budgetFeedback.classList.add('showItem');
			budgetFeedback.textContent = `Please Enter Accurate Value`;

			setTimeout(()=>{
				budgetFeedback.classList.remove('showItem');
			},2000);
		}
		else{
			budgetAmount.textContent = value;
			showBalance();
		}


	})

	let expenseForm = $('#expense-form');
	let expenseInput = $('#expense-input');
	let amountInput = $('#amount-input');
	let expenseFeedback = $('.expense-feedback')
	let expenseList = $('#expense-list');
	//console.log(amountInput);

	expenseForm.addEventListener('submit',(event)=>{
		event.preventDefault();

		let vale = budgetInput.value;
		let expance = () =>{
			let total = 0;
			if(itemList.length>0){
				total = itemList.reduce((accumulator,current)=>{
					accumulator += current.amount;
					return accumulator;
				},0);
			}
			expenseAmount.textContent = total
			return total;
		}

		let showBalance = () =>{
			let total = parseInt(budgetAmount.textContent) - expance();
			balanceAmount.textContent = total;
			//console.log(keep);

			if (total < 0){
				balance.classList.remove('showBlack','showGreen')
				balance.classList.add('showRed');
			}
			else if(total > 0){
				balance.classList.remove('showBlack','showRed');
				balance.classList.add('showGreen');
			}
			else if(total === 0){
				balance.classList.remove('showGreen','showRed');
				balance.classList.add('showBlack');
			}

		}


		let addExpecse= (expense) =>{
			let div = document.createElement('div');
			div.classList.add('expense');
			div.innerHTML = `<div class="expense-item
			 d-flex justify-content-between align-items-baseline">
	         <h6 class="expense-title mb-0 text-uppercase
	          list-item">- ${expense.title}</h6>
	         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
	         <div class="expense-icons list-item">
	          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
	           <i class="fas fa-edit"></i>
	          </a>
	          <a href="#" class="delete-icon" data-id="${expense.id}">
	           <i class="fas fa-trash"></i>
	          </a>
	         </div>
	        </div>
		`;

		expenseList.appendChild(div);
		}

		let tValue = expenseInput.value;
		let nValue = amountInput.value;
		// console.log(tValue);
		// console.log(nValue);
		expenseInput.value = '';
		amountInput.value = '';

		if(tValue === '' || nValue === '' || nValue < 0){
			expenseFeedback.classList.add('showItem');
			expenseFeedback.textContent = `Please Enter Accurate Value`;

			setTimeout(()=>{
				expenseFeedback.classList.remove('showItem');
			},2000);
		}
		else{
			let amount = parseInt(nValue);
			let expense = {
				id: itemId,
				title : tValue,
				amount : amount
			}

			itemId++;
			itemList.push(expense);
			//console.log(itemList);
			addExpecse(expense);
			showBalance();
		}
	})

	let expenceList = $('#expense-list');
	expenceList.addEventListener('click',(event)=>{

		let vale = budgetInput.value;
		let expance = () =>{
			let total = 0;
			if(itemList.length>0){
				total = itemList.reduce((accumulator,current)=>{
					accumulator += current.amount;
					return accumulator;
				},0);
			}
			expenseAmount.textContent = total
			return total;
		}

		let showBalance = () =>{
			let total = parseInt(budgetAmount.textContent) - expance();
			balanceAmount.textContent = total;
			//console.log(keep);

			if (total < 0){
				balance.classList.remove('showBlack','showGreen')
				balance.classList.add('showRed');
			}
			else if(total > 0){
				balance.classList.remove('showBlack','showRed');
				balance.classList.add('showGreen');
			}
			else if(total === 0){
				balance.classList.remove('showGreen','showRed');
				balance.classList.add('showBlack');
			}

		}
		if(event.target.parentElement.classList.contains('edit-icon')){
			let id = parseInt(event.target.parentElement.dataset.id);
			let choice = event.target.parentElement.
				parentElement.parentElement.parentElement;

			expenceList.removeChild(choice);
			let exp = itemList.filter((item)=>{
				return item.id == id;
			})
			expenseInput.value = exp[0].title;
			amountInput.value = exp[0].amount;

			let tempValue = itemList.filter((item)=>{
				return item.id !== id;
			})

			itemList = tempValue;
			showBalance();
		}
		else if(event.target.parentElement.classList.contains('delete-icon')){
			let id = parseInt(event.target.parentElement.dataset.id);
			let choice = event.target.parentElement.
				parentElement.parentElement.parentElement;

			expenceList.removeChild(choice);
			let tempValue = itemList.filter((item)=>{
				return item.id !== id;
			})

			itemList = tempValue;
			showBalance();
		}
	})

})(); 