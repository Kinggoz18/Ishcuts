'use strict';

$(function(){
    $('#loginform').on('click',async (event)=>{
        event.preventDefault();
        let data = await Login();
        if(data.length == 0){
            $('#error-msg').removeClass('hide');
        }
        else{
            $('#error-msg').addClass('hide');
            window.location.replace("./account.html?adminKey="+data[0]._id);
        }
})});

async function Login(){
    let name = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    let final;
    let send = {
        username: name,
        password: password
    };
    let value = await $.ajax({
        url: 'https://web-production-364a.up.railway.app/Admin',
            type: "POST",
            data: send,
            success: function(data){
                return data;
            }
    });
    return value;
}