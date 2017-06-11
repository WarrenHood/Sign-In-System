users = [];
//alert("test");
lastLoad = 0;
mode = 'server';
managing = false;
validTimes = [
	{day:1,
	Hmin:9,
	Mmin:50,
	Mmax:35,
	HHmax:10
	},
	{day:1,
	Hmin:12,
	Mmin:35,
	Mmax:15,
	Hmax:13
	},
	{day:1,
	Hmin:14,
	Mmin:25,
	Hmax:16,
	Mmax:0
	},
	{day:2,
	Hmin:9,
	Mmin:45,
	Mmax:15,
	Hmax:10
	},
	{day:2,
	Hmin:12,
	Mmin:15,
	Mmax:55,
	Hmax:12
	},
	{day:2,
	Hmin:14,
	Mmin:25,
	Hmax:16,
	Mmax:0
	},
	{day:3,
	Hmin:9,
	Mmin:50,
	Mmax:35,
	HHmax:10
	},
	{day:3,
	Hmin:12,
	Mmin:35,
	Mmax:15,
	Hmax:13
	},
	{day:3,
	Hmin:14,
	Mmin:25,
	Hmax:16,
	Mmax:0
	},
	{day:4,
	Hmin:9,
	Mmin:45,
	Mmax:15,
	Hmax:10
	},
	{day:4,
	Hmin:12,
	Mmin:15,
	Mmax:55,
	Hmax:12
	},
	{day:4,
	Hmin:14,
	Mmin:25,
	Hmax:16,
	Mmax:0
	},
	{
	day:5,
	Hmin:10,
	Mmin:45,
	Mmax:35,
	Hmax:11
	}
	
];
function validTime(t){
	for(var i = 0;i < validTimes.length;i++){
		if(t.getDay() != validTimes[i].day)continue;
		var minTime = validTimes[i].Hmin*60 + validTimes[i].Mmin;
		var maxTime = validTimes[i].Hmax*60 + validTimes[i].Mmax;
		var currTime = t.getHours()*60 + t.getMinutes();
		if(currTime <= maxTime && currTime >= minTime)return true;
	};
	return false;
}
function validTime2(d,h,m){
	for(var i = 0;i < validTimes.length;i++){
		if(d != validTimes[i].day)continue;
		var minTime = validTimes[i].Hmin*60 + validTimes[i].Mmin;
		var maxTime = validTimes[i].Hmax*60 + validTimes[i].Mmax;
		var currTime = h*60 + m;
		if(currTime <= maxTime && currTime >= minTime)return true;
	};
	return false;
}
window.onload = function(){
	xin = document.getElementById('in');
	xout = document.getElementById('out');
	xmng = document.getElementById('mng');
	xin.style.width = window.innerWidth/3 + 'px';
	xin.height = window.innerHeight/10 + 'px';
	setInterval(function(){if(!managing)usersSignedIn();},1000);
	setInterval(checkForUp,1000);
	setHandlers();
	loadData();
	hinput =  document.getElementById('hid');
	hinput.disabled = true;
	document.onmousemove = handlePointer;
	document.getElementById('container').style.height = window.innerHeight - 30 + 'px';
}

function handlePointer(e){
	e = e || event;
	document.getElementById('pointerV').style.left = e.clientX + 1+'px';
	document.getElementById('pointerH').style.left = e.clientX + 1+'px';
	document.getElementById('pointerV').style.top = e.clientY + +1+'px';
	document.getElementById('pointerH').style.top = e.clientY + +1+'px';
	document.getElementById('pointerT').style.left = e.clientX + 17.5 + 1+'px';
	document.getElementById('pointerT').style.top = e.clientY + 17.5 + 1+'px';
}
function passprom(m,f){
	document.getElementById("pops").innerHTML = '<div id="ps"><input type="password" id="pw" size=25/><button id="ok">Ok</button></div>';
	var box = document.getElementById("ps");
	//box.style.height = window.innerHeight/2+"px";
	box.style.width = window.innerWidth +"px";
	box.style.background = "white";
	box.style.color = "black";
	box.style.border = "2px solid blue";
	box.style.left = "0px";
	box.style.top = window.innerHeight/4+"px";
	box.innerHTML = "<br>"+m+'<input type="password" id="pw" size=25/><button id="ok">Ok</button><br>';
	document.getElementById("pw").focus();
	document.getElementById("pw").onkeydown = function(e){
		e = e || event;
		if(e.keyCode == 13){
		var pass = document.getElementById("pw").value;
		document.getElementById("pops").innerHTML = "";
		f(pass);}};
	document.getElementById('ok').onclick = function(){
		var pass = document.getElementById("pw").value;
		document.getElementById("pops").innerHTML = "";
		f(pass);};
}
function prom(m,f,textA){
	t = textA || false;
	if(!t)document.getElementById("pops").innerHTML = '<div id="ps"><input id="pw" size=25/><button id="ok">Ok</button></div>';
	else document.getElementById("pops").innerHTML = '<div id="ps"><center><textarea id="pw"></textarea><button id="ok">Ok</button></div>';
	var box = document.getElementById("ps");
	//box.style.height = window.innerHeight/2+"px";
	box.style.width = window.innerWidth +"px";
	box.style.background = "white";
	box.style.color = "black";
	box.style.border = "2px solid blue";
	box.style.left = "0px";
	box.style.top = window.innerHeight/4+"px";
	box.innerHTML = "<br>"+m;
	/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
	if(!t)box.innerHTML += '<input id="pw" size=25/><button id="ok">Ok</button><br>';
	else{
		box.innerHTML += '<div id="ps"><center><textarea id="pw"></textarea><\center><button id="ok">Ok</button></div>';
		document.getElementById('pw').style.width = window.innerWidth + 'px';
		}
	document.getElementById("pw").focus();
	document.getElementById("pw").onkeydown = function(e){
		e = e || event;
		if(e.keyCode == 13){
		var pass = document.getElementById("pw").value;
		document.getElementById("pops").innerHTML = "";
		f(pass);}};
	document.getElementById('ok').onclick = function(){
		var pass = document.getElementById("pw").value;
		document.getElementById("pops").innerHTML = "";
		f(pass);};
}
function say(m){
	document.getElementById("pops").innerHTML = '<div id="ps"><button id="ok">Ok</button></div>';
	var box = document.getElementById("ps");
	//box.style.height = window.innerHeight/2+"px";
	box.style.width = window.innerWidth +"px";
	box.style.background = "white";
	box.style.color = "black";
	box.style.border = "2px solid blue";
	box.style.left = "0px";
	hinput.disabled = false;
	box.style.top = window.innerHeight/4+"px";
	document.getElementById('hid').style.top = window.innerHeight/4+"px";
	box.innerHTML = "<br>"+m+'<br><button id="ok">Ok</button><br>';
	document.getElementById('ok').onclick = function(){
		document.getElementById('hid').blur();
		document.getElementById('hid').style.top = "0px";
		hinput.disabled = true;
		document.getElementById("pops").innerHTML = "";};
	document.getElementById('hid').focus();
	document.getElementById('hid').onkeydown = function(e){
		if(e.keyCode == 13){
			document.getElementById('hid').style.top = "0px";
			document.getElementById('hid').blur();
			hinput.disabled = true;
			document.getElementById("pops").innerHTML = "";
		}
	}
}
function deleteLogIN(i,n){
	newLog = [];
	for(var j = 0;j<users[i].logs.length;j++){
		if(j == n || j == n+1)continue;
		newLog.push(users[i].logs[j]);
	}
	users[i].logs = newLog;
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
	}prom("Please enter an administrator username:",
	function(username){
	if(!getFirstName(username)){
		say(username+ " is not registered");
		return;
	}
	passprom("Hi "+getFirstName(username)+"! Please enter your password:",function(pass){
	if(!isAdministrator(username)){
		if(!getFirstName(username) || getPassword(username) != pass){
		say("Username or password incorrect!");
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
		var count = 0;
		for(var j=1;j<users[i].logs.length;j+=2)if(users[i].logs[j][1].getHours() == 15 && users[i].logs[j-1][2])count++;
		elt += Math.ceil(Math.floor(filter(users[i].logs).length/2) +count/2)+"</td><tr>";
	}
		elt += "</table>";
		document.getElementById('manage').innerHTML = elt;
		return;
	}
	if(getPassword(username) != pass){
		say("Incorrect Password!");
		return;
	}
	var sty = ' style="text-align:center;background:orange;border:1px solid black;height:'+window.innerHeight/20+'px;width:'+window.innerWidth/3+'px;"';
	document.getElementById("manage").innerHTML = "<h1> Data Management </h1><table id='manageT'><tr><td onclick='meritList()'"+sty+'>Get merit sheet</td><td onclick="userStats()"'+sty+'>View user stats</td><td onclick="userEdit()"'+sty+">Manage users</td></tr><tr></tr><td onclick='backup()'"+sty+">Backup Data</td><td onclick='restore()'"+sty+">Restore Data</td><td onclick='wipe()'"+sty+">Wipe Data</td></table><div id='output'></div>";
	managing = true;
	
	var approvals = "<h1>Awaiting approval</h1><table><tr><td>Admin No</td><td>First Name</td><td>Second Name</td><td>Time Signed in</td><td>Reason</td><td class='approve'>Approve</td><td>Disapprove</td></tr>";
	//loop here
	appArray = [];
	for(var i = 0;i < users.length;i++)for(var j = 0;j<users[i].logs.length;j+=2)if(!users[i].logs[j][2])appArray.push([users[i].admin,users[i].firstName,users[i].secondName,users[i].logs[j][1],users[i].logs[j][3],j]);
	appArray.sort(function(a,b){
			bd = new Date(b[3]);
			ad = new Date(a[3]);
		return bd.getTime() - ad.getTime();
	});
	for(var i = 0;i < appArray.length;i++){
		for(var j =0;j<users.length;j++)if(users[j].admin == appArray[i][0]){
			var func = "users["+j+"].logs["+appArray[i][5]+"][2] = true;saveData();refreshApprove();";
			var delfunc = "deleteLogIN(" +j+","+appArray[i][5]+ ");saveData();refreshApprove();";
			break;
		}
		approvals += "<tr><td>"+ appArray[i][0]+"</td><td>"+appArray[i][1]+"</td><td>"+appArray[i][2]+"</td><td>"+appArray[i][3]+"</td><td>"+appArray[i][4]+"</td><td style='color:green;' onclick='"+func+"'>X</td><td style='color:white;' onclick='"+delfunc+"'>X</td></tr>";
	}
	approvals += '</table>';
	document.getElementById('output').innerHTML = approvals;
	var lateList = '<h1>Late Sign out times</h1><table><tr><td>Admin Number</td><td>First Name</td><td>Second Name</td><td>Time(Month/Day, Time)</td></tr>';
	var lateAr = [];
	for(var i =0;i<users.length;i++){
		if(!users[i].lateout)continue;
		for(var j = 0;j < users[i].lateout.length;j++)lateAr.push([users[i].admin,users[i].firstName,users[i].secondName,users[i].lateout[j]]);
	}
	lateAr.sort(function(a,b){
		bd = new Date(b[3]);
		ad = new Date(a[3]);
		return bd.getTime() - ad.getTime();
	});
	for(el = 0;el<lateAr.length;el++){
		dat = new Date(lateAr[el][3]);
		dat = ''+dat.getMonth()+'/' + dat.getDay()+ ', '+ dat.getHours() + ' : ' + dat.getMinutes();
		lateList += '<tr><td>'+lateAr[el][0]+'</td><td>'+lateAr[el][1]+'</td><td>'+lateAr[el][2]+'</td><td>'+dat +'</td></tr>'
	};
	lateList += "</table>";
	document.getElementById('output').innerHTML += lateList;
	say("You may view and edit merits and monitor data from here.");});});
}
function refreshApprove(){
	var approvals = "<h1>Awaiting approval</h1><table><tr><td>Admin No</td><td>First Name</td><td>Second Name</td><td>Time Signed in</td><td>Reason</td><td class='approve'>Approve</td><td>Disapprove</td></tr>";
	//loop here
	appArray = [];
	for(var i = 0;i < users.length;i++)for(var j = 0;j<users[i].logs.length;j+=2)if(!users[i].logs[j][2])appArray.push([users[i].admin,users[i].firstName,users[i].secondName,users[i].logs[j][1],users[i].logs[j][3],j]);
	appArray.sort(function(a,b){
			bd = new Date(b[3]);
			ad = new Date(a[3]);
		return bd.getTime() - ad.getTime();
	});
	for(var i = 0;i < appArray.length;i++){
		for(var j =0;j<users.length;j++)if(users[j].admin == appArray[i][0]){
			var func = "users["+j+"].logs["+appArray[i][5]+"][2] = true;saveData();refreshApprove();";
			var delfunc = "deleteLogIN(" +j+","+appArray[i][5]+ ");saveData();refreshApprove();";
			break;
		}
		approvals += "<tr><td>"+ appArray[i][0]+"</td><td>"+appArray[i][1]+"</td><td>"+appArray[i][2]+"</td><td>"+appArray[i][3]+"</td><td>"+appArray[i][4]+"</td><td style='color:green;' onclick='"+func+"'>X</td><td style='color:white;' onclick='"+delfunc+"'>X</td></tr>";
	}
	approvals += '</table>';
	document.getElementById('output').innerHTML = approvals;
	var lateList = '<h1>Late Sign out times</h1><table><tr><td>Admin Number</td><td>First Name</td><td>Second Name</td><td>Time(Month/Day, Time)</td></tr>';
	var lateAr = [];
	for(var i =0;i<users.length;i++){
		if(!users[i].lateout)continue;
		for(var j = 0;j < users[i].lateout.length;j++)lateAr.push([users[i].admin,users[i].firstName,users[i].secondName,users[i].lateout[j]]);
	}
	lateAr.sort(function(a,b){
		bd = new Date(b[3]);
		ad = new Date(a[3]);
		return bd.getTime() - ad.getTime();
	});
	for(el = 0;el<lateAr.length;el++){
		dat = new Date(lateAr[el][3]);
		dat = ''+dat.getMonth()+'/' + dat.getDay()+ ', '+ dat.getHours() + ' : ' + dat.getMinutes();
		lateList += '<tr><td>'+lateAr[el][0]+'</td><td>'+lateAr[el][1]+'</td><td>'+lateAr[el][2]+'</td><td>'+dat +'</td></tr>'
	};
	lateList += "</table>";
	document.getElementById('output').innerHTML += lateList;
}
function meritList(){
	var csv = "";
	for(var i = 0; i < users.length;i++){
		if(users[i].administrator)continue;
		var count = 0;
		for(var j=1;j<users[i].logs.length;j+=2)if(users[i].logs[j][1].getHours() == 15 && users[i].logs[j-1][2])count++;
		csv += users[i].admin + ' , ' + Math.ceil(Math.floor(filter(users[i].logs).length/2) +count/2) + '\n';
	}
	downloadCSV(csv);
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
		var count = 0;
		for(var j=1;j<users[i].logs.length;j+=2)if(users[i].logs[j][1].getHours() == 15 && users[i].logs[j-1][2])count++;
		elt += Math.ceil(Math.floor(filter(users[i].logs).length/2) +count/2)+"</td><tr>";
	}
	elt += "</table>";
	document.getElementById('output').innerHTML = elt;
}
function filter(a){
	var newA = [];
	for(var i = 0;i<a.length;i+=2){
		if(!a[i][2])continue;
		newA.push(a[i]);
		if(i+1 < a.length)newA.push(a[i+1]);
	}
	return newA;
}
function backup(){
	var elt = '<h1>Copy the below data into a txt file and save it for later use</h1><br>';
	elt += JSON.stringify(users);
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
		say(e);
	}
	say("Data restore complete!");
}
function wipe(){
	if(!confirm("Are you sure you want to wipe all your data?"))return;
	try{
	for(var i = 0;i<users.length;i++){
		users[i].logs = [];
		users[i].lateout = [];
		users[i].late = 0;
		users[i].bunked = 0;
	}
	saveData();
	loadData();
	}
	catch(e){
		say(e);
	}
	say("Data wipe complete!");
}
function usersSignedIn(){
	if(mode == "client")loadData();
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
	say("Account has been deleted");
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
	o.lateout = [];
	users.push(o);
	saveData();
	say("Account creation successful");
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
			say("Account has been updated.");
			saveData();
			return;
			}
	}
}
function signIn(){
	var approved = true;
	var reason = '';
	//loadData();
	prom("Enter admin number:",function(admin){
	var fname = getFirstName(admin);
	var index = -1;
	if(fname){
		for(var i=0;i<users.length;i++){
			if(users[i].admin == admin){index = i;break;
				}
			}
		}
		if(index == -1){say(admin + " is not registered");return;}
		if(users[index].changePass)passprom("Please enter a new password:",function(newpass){
				passprom("Please confirm password",function(con){
					if(newpass == con)users[index].pass = newpass;
					else{
						say("Passwords do not match. Please try again.");
						return;
					}
					users[index].changePass = false;
					saveData();
					say("Password has been changed");
					var logar = [];
					logar.push("in");
					logar.push(getCurrentDate());
					logar.push(true);
					logar.push("");
					if(hasSignedOut(admin))log(admin,logar);
					});});
		else {
		var logar = [];
			logar.push("in");
			logar.push(getCurrentDate());
			if(!validTime(getCurrentDate()))approved = false;
			logar.push(approved);
			var lastIn = getLastSignIn(admin);
			var lastOut = getLastSignOut(admin);
			var currentTime = new Date();
				if(!hasSignedOut(admin)){
					say("You are already signed in!");
					return;
				}
				if(currentTime.getHours() != 15 && lastIn && currentTime.getTime() - lastIn.getTime() < 1000*60*60){
					say("You have already signed in within the last hour!");
					return;
				}
				if(currentTime.getHours() == 15 && lastIn && lastIn.getHours() == 3){
					say("You have already signed in within the last hour!");
					return;
				}
				if(currentTime.getHours() == 14 && 60 - currentTime.getMinutes() <= 15 ){
					say("You are late! No merits for this duty will be given!");
					for(var i = 0;i<users.length;i++){
						if(users[i].admin == admin){
							users[i].late++;
							break;
						}
					}
					return;
					
				}
		passprom("Hi "+getFirstName(admin)+". Please enter your password:",
		function(pass){
		if(pass == getPassword(admin)){
			prom("You are signing in at an unusual time. Please give a reason for this.",function(r){
				logar.push(r);
				log(admin,logar);
				say("Enjoy your duty, "+getFirstName(admin));
				return;
			},true);
		}else{
			say("Incorrect Password!");
			return;
		}
	});
	}
	});
}
function signOut(){
	//loadData();
	prom("Enter admin number:",function(admin){
	var fname = getFirstName(admin);
	if(fname){
		var logar = [];
			logar.push("out");
			logar.push(getCurrentDate());
			var lastIn = getLastSignIn(admin);
			var lastOut = getLastSignOut(admin);
			var currentTime = new Date();
				if(hasSignedOut(admin)){
					say("You are not signed in!");
					return;
				}
				if(lastIn && currentTime.getTime() - lastIn.getTime() >= 1000*60*60*1){
					var intime = (currentTime.getTime() - lastIn.getTime())/(1000*60*60);
					say("You have been signed in for "+ Math.round(intime) +' hours! No merits for this duty. You were probably bunking.');
					for(var i = 0;i<users.length;i++){
						if(users[i].admin == admin){
							users[i].bunked++;
							if(!users[i].lateout)users[i].lateout = [];
							users[i].lateout.push(getCurrentDate());
							break;
						}
					}
					cancelLastIn(admin);
					return;
				}
		passprom("Hi "+getFirstName(admin)+". Please enter your password:",
		function(pass){
		if(pass == getPassword(admin)){
			if(lastIn && currentTime.getTime() - lastIn.getTime() <= 1000*60*7 ){
					var intime = (currentTime.getTime() - lastIn.getTime())/(1000*60);
					if(intime >= 0.5)say("You have only been signed in for "+ Math.round(intime) +' minute(s)! No merits for this duty.');
					else say("You have only been signed in for "+ Math.round(intime*60) +' seconds! No merits for this duty.');
					for(var i = 0;i<users.length;i++){
						if(users[i].admin == admin){
							users[i].late++;
							break;
						}
					}
					cancelLastIn(admin);
					return;
				}
			log(admin,logar);
			say("Goodbye " + getFirstName(admin));
		}
		else say("Incorrect Password!");});
	}
	
	else say("Admin Number: "+admin+" is not registered.");});
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
		firstName:"Admin",
		secondName:"",
		admin:"admin",
		pass:"admin",
		logs:[],
		administrator:true,
		changePass:true,
		bunked:0,
		late:0,
	}
	if(mode == 'server'){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     users = JSON.parse(this.responseText);
	 //alert("Loaded");
	 lastLoad = getCurrentDate();
	 if(!users || users.length == 0)users = [testUser];
    }
  };
  xhttp.open("GET", "data.txt", false);
  xhttp.send();
	}
	else{
		users = [testUser];
		if(localStorage.SIusers)users = JSON.parse(localStorage.SIusers);
	}
	for(var i =0;i<users.length;i++){
		for(var j=0;j<users[i].logs.length;j++)users[i].logs[j][1] = new Date(JSON.parse(JSON.stringify(users[i].logs[j][1])));
	}
}
function saveData(){
	if(mode == 'client'){
		localStorage.SIusers = JSON.stringify(users);
		return;
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		saveLast();
		//alert("saved");
    }
	else{
		//alert("An error occured. Click ok to try again");
		//saveData();
	}
  };
	xhttp.open("POST", "store.php?q="+JSON.stringify(users), false);
	xhttp.send();
	return;
}


    function downloadCSV(csv) {
        var data, filename, link;
		if (csv == null) return;

        filename = "Merits_" + getCurrentDate() + ".csv";

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);
        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }
function saveLast(){
	if(mode == 'client'){
		return;
		//localStorage.SIusers = JSON.stringify(users);
		return;
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		//
    }
  };
	xhttp.open("POST", "uplast.php?q="+JSON.stringify(getCurrentDate()), false);
	xhttp.send();
	return;
}
function getLast(f){
	if(mode == 'server'){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     f(new Date(JSON.parse(this.responseText)));
    }
  };
  xhttp.open("GET", "last.txt", false);
  xhttp.send();
	}
}
function checkForUp(){
	getLast(
	function(t){
		if((t.getTime() > lastLoad) || !lastLoad){
			loadData();
			//alert("Loading data...");
		};
	}
	);
}
