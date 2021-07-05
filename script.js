const add_btn = document.querySelector("#add_btn");
const input = document.querySelector("#input");
const delete_all_btn = document.querySelector("#delete_all_btn");
const items_container = document.querySelector("#items_container");
const save_btn = document.querySelector("#save_btn");
const hidden_index = document.querySelector("#hidden_index");
const task_msg = document.querySelector("#task_msg");
const search = document.querySelector("#search");

//add task
add_btn.addEventListener("click",(e)=>{
	var inputValue = input.value;

	if(inputValue.trim()==0){
		input.style.backgroundColor = "#ecb5d0";
		task_msg.style.display = "block";

		input.addEventListener("focus",()=>{
			input.style.backgroundColor = "#fff";
			task_msg.style.display = "none";			
		});
	}else{
		let task = localStorage.getItem("localtask");

		if(task == null){
			taskObj = [];
		}else{
			taskObj = JSON.parse(task);
		}

		taskObj.push(inputValue);
		localStorage.setItem("localtask",JSON.stringify(taskObj));
		input.value = "";
	}
	showTasksItems();
});

//undo
undo_btn.addEventListener("click",(e)=>{
	input.value = "";	
});

//show task
const showTasksItems = ()=>{
	let task = localStorage.getItem("localtask");

	if(task == null){
		taskObj = [];
	}else{
		taskObj = JSON.parse(task);
	}
	let view = "";

	taskObj.forEach((obj,index)=>{
		view += `<div class="added_item">
					<span class="task_data">
						${obj}  
					</span>
					
					<i class="fa fa-trash-o fa-2x trash_btn" onclick="deleteTask(${index});">
						
					</i>	

					<i class="fa fa-edit fa-2x check_btn" onclick="editTask(${index})">
							
					</i>        				
				</div>`;
	});

	items_container.innerHTML = view;
};

//edit task
const editTask = (index)=>{
	hidden_index.value = index;

	let task = localStorage.getItem("localtask");

	let taskObj = JSON.parse(task);
	input.value = taskObj[index];

	add_btn.style.display = "none";
	save_btn.style.display = "inline-block";
	delete_all_btn.style.display = "none";
	
}

//save edit task
save_btn.addEventListener("click",(e)=>{
	let task = localStorage.getItem("localtask");

	let taskObj = JSON.parse(task);

	let indexVal = hidden_index.value;

	taskObj[indexVal] = input.value;
	
	if(input.value.trim()==0){
		input.style.backgroundColor = "#ecb5d0";
		task_msg.style.display = "block";

		input.addEventListener("focus",()=>{
			input.style.backgroundColor = "#fff";
			task_msg.style.display = "none";			
		});
	}else{
		localStorage.setItem("localtask",JSON.stringify(taskObj));

		add_btn.style.display = "inline-block";
		save_btn.style.display = "none";
		delete_all_btn.style.display = "inline-block";
		
		input.value = "";
	}	
	showTasksItems();
});

//delete task
const deleteTask = (index)=>{
	let task = localStorage.getItem("localtask");

	let taskObj = JSON.parse(task);

	taskObj.splice(index,1);
	localStorage.setItem("localtask",JSON.stringify(taskObj));

	showTasksItems();
};

//delete all task
delete_all_btn.addEventListener("click",(e)=>{
	let task = localStorage.getItem("localtask");

	let taskObj = JSON.parse(task);	

	if(task == null){
		taskObj = [];
	}else{
		taskObj = JSON.parse(task);
		taskObj = [];		
	}
	localStorage.setItem("localtask",JSON.stringify(taskObj));

	showTasksItems();
});

//load
window.addEventListener("load",(e)=>{
	showTasksItems();
});


//search list
/*search.addEventListener("keyup",(e)=>{
	let added_item = document.querySelectorAll(".added_item");

	let itemList = Array.from(added_item);

	itemList.forEach((item)=>{
		let searchText = item.getElementsByTagName("span")[0].innerText;
		
		let searchVal = search.value;

		let res = new RegExp(searchVal,'gi');
		if(searchVal.match(res)){
			console.log(searchVal.match(res));
			item.style.display = "block";

		}else{
			item.style.display = "none";
		}
	});
});
*/