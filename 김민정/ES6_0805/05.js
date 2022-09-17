const person = {
	talk() {
		setTimeout(function(){
			console.log("this: ", this);
		},1000);
	}
}
person.talk();  
// Window {window: Window, self: Window, document: document, name: '', location: Location, …}