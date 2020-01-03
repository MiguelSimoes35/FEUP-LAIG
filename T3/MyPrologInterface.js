/**
 * MyPrologInterface
 * @constructor
 * @param scene
 */

class MyPrologInterface {
    constructor() {}

    async request(requestString, parseReply, port) {
        this.port = port || 8081;
        let request = new XMLHttpRequest(this);

        request.addEventListener("load", parseReply);
        request.addEventListener("error", this.startPrologGameError);

        request.open('GET', "http://localhost:" + this.port + "/" + requestString, true);

        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
        request.send();
    }
}
