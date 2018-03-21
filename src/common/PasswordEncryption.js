export const PasswordEncryption = (str)=>{
    return compileStr(str);
}

const compileStr = (code) => { //对字符串进行加密         
   var c=String.fromCharCode(code.charCodeAt(0)+code.length);  
   for(var i=1;i<code.length;i++)  
    {        
     c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));  
   }     
   return escape(c);   
} 