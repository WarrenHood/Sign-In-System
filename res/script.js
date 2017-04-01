users = [];
managing = false;
window.onload = function(){
	xin = document.getElementById('in');
	xout = document.getElementById('out');
	xmng = document.getElementById('mng');
	xin.style.width = window.innerWidth/3 + 'px';
	xin.height = window.innerHeight/10 + 'px';
	setInterval(function(){if(!managing)usersSignedIn()},1000);
	setHandlers();
	loadData();
}
function setHandlers(){
	xin.onclick = signIn;
	xout.onclick = signOut;
	xmng.onclick = manage;
}
function manage(){
	if(managing){
		managing = false;
		usersSignedIn();
		return;
	}
	var username = prompt("Please enter an administrator username:");
	if(!isAdministrator(username)){
		if(!username || getPassword(username) != prompt("Hi "+getFirstName(username)+"! Please enter your password:")){
		alert("Username or password incorrect!");
		return;
		}
		managing = true;
		var elt = '<table><tr><td>Admin Number</td><td>First Name</td><td>Second Name</td><td>Number of Duties</td><td>Times Bunked</td><td>Times Late</td><td>Total Duty Time(hours)</td><td>Merits</td></tr>';
		for(var i = 0; i < users.length;i++){
			if(users[i].admin != username)continue;
		elt += "<tr><td>"+users[i].admin+"</td><td>"+users[i].firstName+'</td><td>';
		elt += users[i].secondName + '</td><td>'+Math.floor(users[i].logs.length/2)+'</td><td>';
		elt += users[i].bunked +'</td><td>';
		elt += users[i].late + '</td><td>';
			time = 0;
			for(var j=1; j< users[i].logs.length;j+=2)time += users[i].logs[j][1].getTime()-users[i].logs[j-1][1].getTime();
		elt += Math.floor(time/(1000*60*60)) + '</td><td>';
		elt += Math.ceil(Math.floor(users[i].logs.length/2)/2)+"</td><tr>";
	}
		elt += "</table>";
		document.getElementById('manage').innerHTML = elt;
		return;
	}
	if(getPassword(username) != prompt("Hi "+getFirstName(username)+"! Please enter your password:")){
		alert("Incorrect Password!");
		return;
	}
	var sty = ' style="text-align:center;background:orange;border:1px solid black;height:'+window.innerHeight/20+'px;width:'+window.innerWidth/3+'px;"';
	document.getElementById("manage").innerHTML = "<h1> Data Management </h1><table id='manageT'><tr><td onclick='meritList()'"+sty+'>Get merit sheet</td><td onclick="userStats()"'+sty+'>View user stats</td><td onclick="userEdit()"'+sty+">Manage users</td></tr><tr></tr><td onclick='backup()'"+sty+">Backup Data</td><td onclick='restore()'"+sty+">Restore Data</td><td onclick='wipe()'"+sty+">Wipe Data</td></table><div id='output'></div>";
	managing = true;
	alert("You may view and edit merits and monitor data from here.");
}
function meritList(){
	var elt = '<table><tr><td>Admin Number</td><td>Merits</td></tr>';
	for(var i = 0; i < users.length;i++)elt += "<tr><td>"+users[i].admin+"</td><td>"+Math.ceil(Math.floor(users[i].logs.length/2)/2)+"</td><tr>";
	elt += "</table>";
	document.getElementById('output').innerHTML = elt;
}
function userStats(){
	var elt = '<table><tr><td>Admin Number</td><td>First Name</td><td>Second Name</td><td>Times signed in</td><td>Times Bunked</td><td>Times Late</td><td>Total Duty Time(hours)</td><td>Merits</td></tr>';
	for(var i = 0; i < users.length;i++){
		elt += "<tr><td>"+users[i].admin+"</td><td>"+users[i].firstName+'</td><td>';
		elt += users[i].secondName + '</td><td>'+Math.floor(users[i].logs.length/2)+'</td><td>';
		elt += users[i].bunked +'</td><td>';
		elt += users[i].late + '</td><td>';
			time = 0;
			for(var j=1; j< users[i].logs.length;j+=2)time += users[i].logs[j][1].getTime()-users[i].logs[j-1][1].getTime();
		elt += Math.floor(time/(1000*60*60)) + '</td><td>';
		elt += Math.ceil(Math.floor(users[i].logs.length/2)/2)+"</td><tr>";
	}
	elt += "</table>";
	document.getElementById('output').innerHTML = elt;
}
function backup(){
	var elt = '<h1>Copy the below data into a txt file and save it for later use</h1><br>';
	elt += localStorage.SIusers;
	document.getElementById('output').innerHTML = elt;
}
function restore(){
	var elt = '<h1>Paste data from a txt file into the text area below</h1><br>';
	elt += '<textarea id="ls"></textarea><br><button onclick="Res();">Restore Data</button>';
	document.getElementById('output').innerHTML = elt;
}
function Res(){
	if(!confirm("Are you sure you want to restore the data in the text field? If the data is invalid you may lose all your data!"))return;
	try{
	users = JSON.parse(document.getElementById('ls').value);
	saveData();
	loadData();
	}
	catch(e){
		alert(e);
	}
	alert("Data restore complete!");
}
function wipe(){
	if(!confirm("Are you sure you want to wipe all your data?"))return;
	try{
	localStorage.SIusers = '';
	loadData();
	}
	catch(e){
		alert(e);
	}
	alert("Data wipe complete!");
}
function usersSignedIn(){
	var elt = '<h1>Currently on Duty</h1><br><table><tr><td>Admin Number</td><td>First Name</td><td>Second Name</td><td>Time since sign in(minutes)</td></tr>';
	for(var i = 0; i < users.length;i++){
		if(hasSignedOut(users[i].admin))continue;
		elt += "<tr><td>"+users[i].admin+"</td><td>"+users[i].firstName+'</td><td>';
		elt += users[i].secondName + '</td><td>';
			time = getCurrentDate().getTime()- users[i].logs[users[i].logs.length-1][1].getTime();
		elt += Math.floor(time/(1000*60)) + '</td></tr>';
	}
	elt += "</table>";
	document.getElementById('manage').innerHTML = elt;
}
function userEdit(){
	document.getElementById('output').innerHTML = 'Username/Admin number<br><input size=20 id="username"/><br>First Name<br><input size=20 id="fname"/><br>Second Name<br><input size=20 id="sname"/><br>Password<br><input size=20 id="pass"/><br><input id="changePass" type="checkbox" checked/>Allow monitor to change password upon first sign in<br><input id="isAdmin" type="checkbox"/>Administrator<br><button onclick="del()">Delete Account</button><button onclick="create()">Create Account(overwrites if exists)</button><button onclick="update()">Update Account</button>';
}
function del(){
	var username = document.getElementById('username').value;
	if(!confirm("Are you sure you want to delete account: "+username+'?'))return;
	var nUserList = [];
	for(var i = 0; i<users.length;i++)if(users[i].admin != username)nUserList.push(users[i]);
	users = nUserList;
	saveData();
	alert("Account has been deleted");
}
function create(){
	var username = document.getElementById('username').value;
	var firstname = document.getElementById('fname').value;
	var secondname = document.getElementById('sname').value;
	var pass = document.getElementById('pass').value;
	var changePass = document.getElementById('changePass').checked;
	var administrator = document.getElementById('isAdmin').checked;
	if(!confirm("Are you sure you want to create account: "+username+'? This will overwrite any existing account with the same username or admin number.'))return;
	var nUserList = [];
	for(var i = 0; i<users.length;i++)if(users[i].admin != username)nUserList.push(users[i]);
	users = nUserList;
	var o = {};
	o.firstName = firstname;
	o.secondName = secondname;
	o.admin = username;
	o.pass = pass;
	o.logs = [];
	o.administrator = administrator;
	o.changePass = changePass;
	o.bunked = 0;
	o.late = 0;
	users.push(o);
	alert("Account creation successful");
}
function update(){
	var username = document.getElementById('username').value;
	var firstname = document.getElementById('fname').value;
	var secondname = document.getElementById('sname').value;
	var pass = document.getElementById('pass').value;
	var changePass = document.getElementById('changePass').checked;
	var administrator = document.getElementById('isAdmin').checked;
	if(!confirm("Are you sure you want to update account: "+username+'? '))return;
	for(var i = 0;i<users.length;i++){
		if(users[i].admin == username){
			users[i].firstName = firstname || users[i].firstName;
			users[i].secondName = secondname || users[i].secondName;
			users[i].pass = pass || users[i].pass;
			users[i].changePass = changePass || users[i].changePass;
			users[i].administrator = administrator;
			alert("Account has been updated.");
			return;
			}
	}
}
function signIn(){
	var admin = prompt("Enter admin number:");
	var fname = getFirstName(admin);
	if(fname){
		for(var i=0;i<users.length;i++){
			if(users[i].admin == admin){
				if(users[i].changePass){
					var newpass = prompt("Please enter a new password:");
					if(prompt("Please confirm your new password:"))users[i].pass = newpass;
					else{
						alert("Passwords do not match. Please try again.");
						return;
					}
					users[i].changePass = false;
					saveData();
					alert("Password has been changed");
				}
				
			}
		}
		if(prompt("Hi "+getFirstName(admin)+". Please enter your password:") == getPassword(admin)){
			var logar = [];
			logar.push("in");
			logar.push(getCurrentDate());
			var lastIn = getLastSignIn(admin);
			var lastOut = getLastSignOut(admin);
			var currentTime = new Date();
				if(!hasSignedOut(admin)){
					alert("You are already signed in!");
					return;
				}
				if(lastIn && currentTime.getTime() - lastIn.getTime() < 1000*60*60){
					alert("You have already signed in within the last hour!");
					return;
				}
				if(currentTime.getHours() == 2 && 60 - currentTime.getMinutes() <= 15 ){
					alert("You are late! No merits for this duty will be given!");
					for(var i = 0;i<users.length;i++){
						if(users[i].admin == admin){
							users[i].late++;
							break;
						}
					}
					return;
					
				}
			log(admin,logar);
			alert("Enjoy your duty, "+getFirstName(admin));
		}
		else alert("Incorrect Password!");
	}
	else alert("Admin Number: "+admin+" is not registered.");
}
function signOut(){
	var admin = prompt("Enter admin number:");
	var fname = getFirstName(admin);
	if(fname){
		if(prompt("Hi "+getFirstName(admin)+". Please enter your password:") == getPassword(admin)){
			var logar = [];
			logar.push("out");
			logar.push(getCurrentDate());
			var lastIn = getLastSignIn(admin);
			var lastOut = getLastSignOut(admin);
			var currentTime = new Date();
				if(hasSignedOut(admin)){
					alert("You are not signed in!");
					return;
				}
				if(lastIn && currentTime.getTime() - lastIn.getTime() <= 1000*60*7 ){
					var intime = (currentTime.getTime() - lastIn.getTime())/(1000*60);
					if(intime >= 0.5)alert("You have only been signed in for "+ Math.round(intime) +' minute(s)! No merits for this duty.');
					else alert("You have only been signed in for "+ Math.round(intime*60) +' seconds! No merits for this duty.');
					for(var i = 0;i<users.length;i++){
						if(users[i].admin == admin){
							users[i].late++;
							break;
						}
					}
					cancelLastIn(admin);
					return;
				}
				if(lastIn && currentTime.getTime() - lastIn.getTime() >= 1000*60*60*2 ){
					var intime = (currentTime.getTime() - lastIn.getTime())/(1000*60*60);
					alert("You have been signed in for "+ Math.round(intime) +' hours! No merits for this duty. You were probably bunking.');
					for(var i = 0;i<users.length;i++){
						if(users[i].admin == admin){
							users[i].bunked++;
							break;
						}
					}
					cancelLastIn(admin);
					return;
				}
			log(admin,logar);
			alert("Goodbye " + getFirstName(admin));
		}
		else alert("Incorrect Password!");
	}
	else alert("Admin Number: "+admin+" is not registered.");
}
function hasSignedOut(admin){
	for(var i = 0;i<users.length;i++){
		if(users[i].admin == admin){
			if(users[i].logs.length == 0)return true;
			return users[i].logs[users[i].logs.length-1][0] == "out";
		}
	}
}
function cancelLastIn(admin){
	for(var i = 0;i<users.length;i++){
		if(users[i].admin == admin){
			var newLog = [];
			for(var j = 0;j<users[i].logs.length-1;j++)newLog.push(users[i].logs[j]);
			users[i].logs = newLog;
			saveData();
			return;
		}
	}
}
function getFirstName(admin){
	for(var i = 0;i<users.length;i++){
		if(users[i].admin == admin)return users[i].firstName;
	}
}
function getSecondName(admin){
	for(var i = 0;i<users.length;i++){
		if(users[i].admin+"" == admin)return users[i].secondName;
	}
}
function getLastSignIn(admin){
	for(var i = 0;i<users.length;i++){
		if(users[i].admin == admin){
			for(var j = users[i].logs.length-1;j >= 0;j--){
				if(users[i].logs[j][0] == 'in')return users[i].logs[j][1];
			}
			return;
		}
	}
}
function getLastSignOut(admin){
	for(var i = 0;i<users.length;i++){
		if(users[i].admin == admin){
			for(var j = users[i].logs.length-1;j >= 0;j--){
				if(users[i].logs[j][0] == 'out')return users[i].logs[j][1];
			}
			return;
		}
	}
}
function getPassword(admin){
	for(var i = 0;i<users.length;i++){
		if(users[i].admin == admin)return users[i].pass;
	}
}
function isAdministrator(admin){
	for(var i = 0;i<users.length;i++){
		if(users[i].admin == admin)return users[i].administrator;
	}
}
function log(admin,l){
	for(var i = 0;i<users.length;i++){
		if(users[i].admin == admin){
		users[i].logs.push(l);
		saveData();
		return;
		}
	}
}
function getCurrentDate(){
	var date = new Date();
	return date;
}
function loadData(){
	var testUser = {
		firstName:"Warren",
		secondName:"Hood",
		admin:"admin",
		pass:"admin",
		logs:[],
		administrator:true,
		changePass:false,
		bunked:0,
		late:0,
	}
	users = [testUser];
	if(localStorage.SIusers != null && localStorage.SIusers)users = JSON.parse(localStorage.SIusers);
	saveData();
	for(var i =0;i<users.length;i++){
		for(var j=0;j<users[i].logs.length;j++)users[i].logs[j][1] = new Date(JSON.parse(JSON.stringify(users[i].logs[j][1])));
	}
}
function saveData(){
	localStorage.SIusers = JSON.stringify(users);
}
