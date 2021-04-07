function chooseDoor(elem) 
{
	if(document.getElementById("selected_door").innerHTML == "no_door")
	{
		var car_door = Math.floor(Math.random() * 3 + 1);
		var selected_door = parseInt(elem.id.replace("door_", ""));
		document.getElementById("selected_door").innerHTML = selected_door;
		
		if(selected_door == car_door)
		{
			door_to_open = Math.floor(Math.random() * 3 + 1); 
			while(door_to_open == selected_door)
				door_to_open = Math.floor(Math.random() * 3 + 1); 
		}
		else
		{
			door_to_open = 6 / (car_door * selected_door);
		}
		
		elem.className = "selected-door";
		document.getElementById("selected_door").innerHTML = selected_door;
		document.getElementById("car_door").innerHTML = car_door;
		document.getElementById("open_door").innerHTML = door_to_open;
		document.getElementById("door_" + door_to_open).src = "images/goat.gif";
		document.getElementById("message").innerHTML = "You selected door " + selected_door + ".  Would you like to switch?";
		document.getElementById("yes_no").style.display = "block";
	}
}

function showInfo(elemId) {
  document.getElementById(elemId).getElementsByClassName("dropdown-content")[0].classList.toggle("show");
  document.getElementById(elemId).getElementsByClassName("btn")[0].classList.toggle("color-button");
}

window.onclick = function(event) {
  if (!event.target.matches('.btn')) {
	var dropdowns = event.target.getElementsByClassName("dropdown-content");
	var i;
	for (i = 0; i < dropdowns.length; i++) {
	  var openDropdown = dropdowns[i];
	  if (openDropdown.classList.contains('show')) {
		openDropdown.classList.remove('show');
	  }
	}
  }
}

function getResults(switched, automated) {
	var carDoor = document.getElementById("car_door").innerHTML;
	
	if(!automated)
	{
		document.getElementById("door_1").src = carDoor == 1 ? "images/car.gif" : "images/goat.gif";
		document.getElementById("door_2").src = carDoor == 2 ? "images/car.gif" : "images/goat.gif";
		document.getElementById("door_3").src = carDoor == 3 ? "images/car.gif" : "images/goat.gif";
	}

	if((document.getElementById("selected_door").innerHTML == document.getElementById("car_door").innerHTML && !switched) ||
	   (document.getElementById("selected_door").innerHTML != document.getElementById("car_door").innerHTML && switched))
	{
		if(!automated)
			document.getElementById("message").innerHTML = "You win! Play again?";
		document.getElementById(switched ? "switch_wins" : "stay_wins").innerHTML = 
			parseInt(document.getElementById(switched ? "switch_wins" : "stay_wins").innerHTML) + 1;
	}
	else
	{
		if(!automated)
			document.getElementById("message").innerHTML = "You lost! Play again?";
		document.getElementById(switched ? "switch_losses" : "stay_losses").innerHTML = 
			parseInt(document.getElementById(switched ? "switch_losses" : "stay_losses").innerHTML) + 1;
	}
	
	if(switched)
	{
		var selected_door = document.getElementById("selected_door").innerHTML;
		var switched_door = 6 / (selected_door * document.getElementById("open_door").innerHTML);
		
		if(!automated)
		{
			document.getElementById("door_" + selected_door).classList.remove("selected-door");
			document.getElementById("door_" + switched_door).classList.add("selected-door");
		}
		document.getElementById("selected_door").innerHTML = switched_door;
	}
	
	document.getElementById(switched ? "switch_total" : "stay_total").innerHTML = 
		parseInt(document.getElementById(switched ? "switch_total" : "stay_total").innerHTML) + 1;
		
	if(document.getElementById("switch_total").innerHTML != "0")
	{
		document.getElementById("switch_percent").innerHTML = 
			document.getElementById("switch_wins").innerHTML / document.getElementById("switch_total").innerHTML;
	}
	
	if(document.getElementById("stay_total").innerHTML != "0")
	{
		document.getElementById("stay_percent").innerHTML = 
			document.getElementById("stay_wins").innerHTML / document.getElementById("stay_total").innerHTML;
	}
	
	if(!automated)
	{
		document.getElementById("yes_btn").setAttribute("onClick", "doReset()");
		document.getElementById("no_btn").setAttribute("onClick", "exit()");
	}

}

function doReset()
{
	document.getElementById("door_1").src =  "images/door_1.gif";
	document.getElementById("door_2").src =  "images/door_2.gif";
	document.getElementById("door_3").src =  "images/door_3.gif";
	document.getElementById("door_" + document.getElementById("selected_door").innerHTML).classList.remove("selected-door");
	document.getElementById("message").innerHTML = "Select a door.";
	document.getElementById("yes_no").style.display = "none";
	document.getElementById("yes_btn").setAttribute("onClick", "getResults(true)");
	document.getElementById("no_btn").setAttribute("onClick", "getResults(false)");
	document.getElementById("selected_door").innerHTML = "no_door"
	
	chooseDoor = (function () 
	{
		var selected_door = "no_door";
		var car_door = Math.floor(Math.random() * 3 + 1); 
		var door_to_open;
		return function(elem) 
		{
			if(selected_door == "no_door")
			{
				selected_door = elem.id.replace("door_", "");
				
				if(selected_door == car_door)
				{
					door_to_open = Math.floor(Math.random() * 3 + 1); 
					while(door_to_open == selected_door)
						door_to_open = Math.floor(Math.random() * 3 + 1); 
				}
				else
				{
					door_to_open = 6 / (car_door * selected_door);
				}
				
				elem.className = "selected-door";
				document.getElementById("selected_door").innerHTML = selected_door;
				document.getElementById("car_door").innerHTML = car_door;
				document.getElementById("open_door").innerHTML = door_to_open;
				document.getElementById("door_" + door_to_open).src = "images/goat.gif";
				document.getElementById("message").innerHTML = "You selected " + selected_door.replace("_", " ") + ".  Would you like to switch?";
				document.getElementById("yes_no").style.display = "block";
			}
		}
	})();
}

function exit()
{
	document.getElementById("yes_no").style.display = "none";
	document.getElementById("message").innerHTML = "Thanks for playing!";
}

async function customSubmit()
{
  toggleDoorClicks()
  showInfo('automate')
  var x = document.getElementById("trials").value;
  if (isNaN(x) || x < 1) {
    window.alert(x + " is not a number");
  } 
  else 
  {
	for(i=0; i < x; ++i)
	{
      var selected_door = Math.floor(Math.random() * 3 + 1); 
	  var car_door = Math.floor(Math.random() * 3 + 1); 
	  var door_to_open = Math.floor(Math.random() * 3 + 1); 
	  while(door_to_open == selected_door)
		  door_to_open = Math.floor(Math.random() * 3 + 1); 
	
	  document.getElementById("selected_door").innerHTML = selected_door;
	  document.getElementById("car_door").innerHTML = car_door;
	  document.getElementById("open_door").innerHTML = door_to_open;
				
	  var random = document.getElementById("random").checked
	  if(random)
	  {
		  getResults(Math.floor(Math.random() * 2) == 0, true)
	  }
	  else
	  {
		getResults(document.getElementById("switch").checked, true);
	  }
	  doReset();
	  await sleep(300);
	}
  }
  toggleDoorClicks()
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function toggleDoorClicks(){
	var doors = document.getElementsByClassName("door");
	
	for(var i=0; i<doors.length; ++i){
		doors[i].onClick = function() {
          return false;
        }
	}
}