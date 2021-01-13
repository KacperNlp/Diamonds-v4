export class BindToHtml{
    constructor(leayerId){
        this.layer = this.bindToHtmlById(leayerId)
    }

    bindToHtmlById(id){
        return document.getElementById(id);
    }

    bindGorupOfElements(selector){
        return document.querySelectorAll(selector);
    }
}