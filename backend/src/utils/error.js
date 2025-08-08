const errorHandler =(statuscodeFromRes,msg) =>{
    let error =  new Error();
    error.statuscode=statuscodeFromRes;
    error.message=msg;
    return error;
}