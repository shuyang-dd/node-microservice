import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError{

    reason='Error database';
    statusCode=500;
    constructor(){
        super('error db');

       Object.setPrototypeOf(this,DatabaseConnectionError.prototype); 
    }

    serializeErrors(){
        return [{message:this.reason}];
    }
}