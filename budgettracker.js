const form =document.querySelector(".add");
const incomelist=document.querySelector("ul.income-list");
const expenselist=document.querySelector("ul.expense-list");
let transactions=localStorage.getItem("transactions")!=null ? JSON.parse(localStorage.getItem("transactions")):[];
const balance=document.getElementById("balance");
const income=document.getElementById("income");
const expense=document.getElementById("expense");

function updatestatistics(){
    const updatedincome=transactions
                               .filter(transaction => transaction.amount>0)
                               .reduce((total,transaction)=> total += Number(transaction.amount),0);

    const updatedexpense=transactions.filter(transaction=>transaction.amount<0).reduce((total,transaction)=> total+=Math.abs(transaction.amount),0);

    updatedbalance=updatedincome-updatedexpense;
    balance.textContent=updatedbalance;
    income.textContent=updatedincome;
    expense.textContent=updatedexpense;
}
updatestatistics();

function addTransactionDOM(id,source,amount,time){
    if(amount>0){
        incomelist.innerHTML+=
        `<li data-id="${id}">
            <p>
                <span>${source}</span>
                <span>${time}</span>
            </p>
            $<span>${amount}</span>
            <i class="bi bi-trash3 delete"></i>
        </li>`
    }
    else{
        expenselist.innerHTML+=
        `<li data-id="${id}">
            <p>
                <span>${source}</span>
                <span>${time}</span>
            </p>
            $<span>${Math.abs(amount)}</span>
            <i class="bi bi-trash3 delete"></i>
        </li>`
    }
}

function addTransaction(source,amount){
    const time=new Date();
    const transaction={
        id:Math.floor(Math.random()*1000),
        source:source,
        amount:amount,
        time:`${time.toLocaleTimeString()} ${time.toLocaleDateString()}`
    };
    transactions.push(transaction);
    localStorage.setItem("transactions",JSON.stringify(transactions));
    addTransactionDOM(transaction.id,source,amount,transaction.time);
}
form.addEventListener("submit",event=>{
    event.preventDefault();
    if(form.source.value.trim()===""||form.amount.value.trim()===""){
        return alert("please add proper values!");
    }
    addTransaction(form.source.value.trim(),form.amount.value.trim());
    updatestatistics();
    form.reset();
})

function getTransaction(){
    transactions.forEach(transaction=>{
        if(transaction.amount>0){
            incomelist.innerHTML+=
                        `<li data-id="${transaction.id}">
                            <p>
                                <span>${transaction.source}</span>
                                <span>${transaction.time}</span>
                            </p>
                            $<span>${transaction.amount}</span>
                            <i class="bi bi-trash3 delete"></i>
                        </li>`
        }
        else{
            expenselist.innerHTML+=
                        `<li data-id="${transaction.id}">
                            <p>
                                <span>${transaction.source}</span>
                                <span>${transaction.time}</span>
                            </p>
                            $<span>${Math.abs(transaction.amount)}</span>
                            <i class="bi bi-trash3 delete"></i>
                        </li>`

        }
    })
}

getTransaction();

function deleteTransaction(id){
    transactions=transactions.filter(transaction=>{
        return transaction.id!==id;
    });
    localStorage.setItem("transactions",JSON.stringify(transactions));
}
incomelist.addEventListener("click",event=>{
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        deleteTransaction(Number(event.target.parentElement.dataset.id));
        updatestatistics();
    }
})

expenselist.addEventListener("click",event=>{
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        deleteTransaction(Number(event.target.parentElement.dataset.id));
        updatestatistics();
    }
})





