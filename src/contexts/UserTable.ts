
import {FormData} from "../pages/LoginPage";

export interface UserRow{
    userId:number 
    userName:string 
    userEmail:string 
    userPassword:string
}

export interface Comment{
    comment:string 
    user:number 
    article:number
}

export default class UserTable{
    userTable: UserRow[];
    current: UserRow;
    comments: Comment[];

    constructor(){
        this.userTable = [];
        this.current = {userId:0, userName:"", userEmail:"", userPassword:""};
        this.comments = [];
    }

    put(user:UserRow):UserRow{
        if(this.userTable.length===0){
            user.userId = 1;
        }else{
            const max = this.userTable.reduce((prev, cur) => (prev.userId > cur.userId) ? prev:cur);
            user.userId = max.userId+1;
        }
        this.userTable.push(user);
        return user;
    }

    get(id:number):UserRow{
        const user = this.userTable.filter(u=>u.userId===id);
        return user.length === 0 ? {userId:0,userName:"",userEmail:"",userPassword:""}:user[0];
        }

    getAll():UserRow[]{
        return this.userTable
    }

    update(user:UserRow):boolean{
        const userold = this.userTable.filter(u=>u.userId===user.userId);
        if(userold.length !== 0){
            const old = userold[0];
            user.userName = user.userName ? user.userName:old.userName;
            user.userEmail = user.userEmail ? user.userEmail:old.userEmail;
            user.userPassword = user.userPassword ? user.userPassword:old.userPassword;
            this.userTable.forEach((u,i) => {if(u===old) this.userTable[i] = user;});
            return true;
        }else{
            return false;
        }
    }

    delete(id:number):boolean{
        const user = this.userTable.filter(u=>u.userId===id);
        if(user.length !==0){
            const index = this.userTable.indexOf(user[0]);
            this.userTable.slice(index,1);
            return true;
        }else{return false}
    }

    login({username, password}:FormData){
        const user = this.userTable.filter(u=>u.userName===username && u.userPassword===password);
        if(user.length !==0){
            this.current = user[0];
            localStorage.setItem("user",user[0].userId.toString());
            return true;
        }else{return false}
    }

    logout(){
        this.current = {userId:0, userName:"", userEmail:"", userPassword:""};
        localStorage.removeItem("user");
    }

    putComment(comment:Comment){
        this.comments.push(comment);
    }
}