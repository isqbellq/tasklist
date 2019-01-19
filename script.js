"use strict"

const addItems = document.querySelector(".add-items");
const itemList = document.querySelector(".items");
const items = JSON.parse(localStorage.getItem("items")) || [];


function addItem(e) {
	e.preventDefault();
	const text = (this.querySelector("[name=item]")).value;
	const item = {
		text,
		done: false
	};

	items.push(item);
	populateList(items, itemList);
	localStorage.setItem("items", JSON.stringify(items));
	this.reset();
}


function populateList(items = [], platesList) {
	platesList.innerHTML = items.map((item, index) => {
		return `
		    <li>
		        <input type= "checkbox" data-index=${index} id="item${index}" ${item.done ? "checked" : ""} />
		        <label for="item${index}">${item.text}</label>
		    </li>
		`;
	}).join("");
}

/* event delegation: you listen for an event on something higher
and then inside of it you check whether it's on the actual element 
that you want */
function toggleDone(e) {
	if (!e.target.matches("input")) return;
	const el = e.target;
	const index = el.dataset.index;
	items[index].done = !items[index].done;
	localStorage.setItem("items", JSON.stringify(items));
	populateList(items, itemList);
}

addItems.addEventListener("submit", addItem);
itemList.addEventListener("click", toggleDone);


populateList(items, itemList);
