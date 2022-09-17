const person = {
	talk() {
        var self = this;
		setTimeout(() => { console.log("this: ", self);},1000 ); // this 상위스코프
	}
}
person.talk();  