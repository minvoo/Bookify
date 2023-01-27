class Model {

    title: string;
    question: string;
    userEmail?: string;
    id? : number;
    adminEmail?: string;
    response?: string;
    closed?: boolean;

    constructor(title:string, question:string) {
        this.title = title;
        this.question = question;
    }


}
export default Model;