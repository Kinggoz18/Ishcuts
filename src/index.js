'use strict'
import {ScheduleObject} from './ScheduleObject.js'

let days = ["#Sunday","#Monday","#Tuseday","#Wednesday","#Thursday","#Friday","#Saturday" ];
let Schedule = new ScheduleObject(days);

let mobileNav = document.querySelector('.fa-solid.fa-bars')
let logoBackground = document.querySelector('.logo-background');
let backGroundIndex = 1;
let formButton = document.querySelector('form button')
let booked = null;
let TotalFee = 0;
let slotToRemove = null;
let haircutOpt = document.querySelectorAll('input[name="haircut"]');
let hairServiceOpt = document.querySelector('#booking-add');
$(function() {
    //Load the schedule data
    Schedule.GetData(true);
    //Event listener for mobile nav
    $(mobileNav).on('click', ()=>{
        $('.mobilenav-list').toggleClass('show');
    });
    GetSelectSlot();
    //Event Listener to Handle form submission
    $(formButton).on('click', (event)=>{
        event.preventDefault();
        let send = GetFormData();
        if(send == false){
            $('#booked-msg').addClass('hide');
        }
        else{
            $('#booked-msg').removeClass('hide');
            $.ajax({
                url: 'https://web-production-364a.up.railway.app/CreateBooking',
                type: "POST",
                data: send,
                success: function(data){
                    //Send confirmation email
                    SendEmail(data['Email'], data['Name'], data['Slot']);
                }
            })
        }
    })
    haircutOpt.forEach(Element=>{
        Element.addEventListener('change', ()=>GetTotal());
    })
    hairServiceOpt.addEventListener('change', ()=>GetTotal());
});


//Function to get the form data
function GetFormData(){
    let email = document.querySelector('#booking-email').value;
    let phone = document.querySelector('#booking-phone').value;
    let data ={};
    
    //Get first name value
    let first = document.querySelector('#booking-name').value;
    //Get phone value
    data['Email'] = email;
    data['Phone'] = phone;
    //get last name value
    let last = document.querySelector('#booking-last').value;
    data['Name'] = first + ' ' + last;
    //get haircut
    data['Haircut'] = document.querySelector('input[name="haircut"]:checked')==null? null : document.querySelector('input[name="haircut"]:checked').value;

    let e = document.getElementById("booking-add");
    //Optional does not need validation
    data['Addon'] = (e.options[e.selectedIndex].value == '0') ? null : e.options[e.selectedIndex].value;
    data['Note'] = (document.getElementById('booking-note').value.length == 0) ? 'No Note' :document.getElementById('booking-note').value;
    data['Slot'] = booked;
    let final = ValidateFormData(data) == true ? data : false;

    if(data['Addon'] != null && data['Haircut']!="None"){
        $('#selectionErr').removeClass('hide');
        final = false;
    }else{
        $('#selectionErr').addClass('hide');
        if(data['Addon']!=null){
            data['Haircut'] = data['Addon'];
        }
    }
    return final;
}

//Function to validate phone number
function ValidateEmail(email){
    var mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mail.test(email)) {
        return true;
    }
    else {
        return false;
    }
}
//Function to validate phone number
function validatePhone(phone) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(phone);
}
//Function to validate data
function ValidateFormData(data){
    let flag = true;
    if(data['Name']==null || data['Name'] == undefined || data['Name'] === " "){
        $('#nameError').removeClass('hide');
        flag = false
    }
    else{
        $('#nameError').addClass('hide');
    }
    let checkEmail = ValidateEmail(data['Email']);
    let checkPhone = validatePhone(data['Phone']);
    if(!checkPhone){
        //return error
        $('#phoneError').removeClass('hide');
        flag = false;
    }
    else{
        $('#phoneError').addClass('hide');
    }
    if(!checkEmail){
        //return error
        $('#emailError').removeClass('hide');
        flag = false;
    }
    else{
        $('#emailError').addClass('hide');
    }
    if(data['Haircut']==null || data['Haircut'] == undefined || data['Haircut'].length == "None"){
        $('#haircutError').removeClass('hide');
        flag = false;
    }
    else{
        $('#haircutError').addClass('hide');
    }

    if(data['Slot']==null){
        $('#bookError').removeClass('hide');
        flag = false;
    }
    else{
        $('#bookError').addClass('hide');
    }
    return flag;
}
//function to get solt time
function GetSelectSlot(){
    $('#schedule-list').on('click', '.book-slot' , (event)=>{
        let button = event.target;
        let id = $(button).prev().text();
        let date = $(button).next().text();
        slotToRemove = {_id: id};
        let day = $(button).parent().parent().children('.day').text();
        booked = `${day} ${date}`;
       $('#selected-slot').text(`Selected slot ${booked}`);
    });
}

//SEND EMAIL FUNCTION - change from email!!!!!!!!!!!!!!!!
function SendEmail(sendEmail, to, message){
    let data = {
        service_id: 'service_1kiyrkq',
        template_id: 'template_derujjo',
        user_id: 'HLQ0RvW51ycJOnHby',
        template_params: {
            to_name: to,
            from_email: "Ishcuts@gmail.com",   //CHANGE THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            from_name: "Ish Haircuts",
            message:  `This is a booking confirmation for ${message}. ${TotalFee}`,
            send_to: sendEmail
        }
    };
    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: ()=>{
            SendConfirmation();
        }
    });
}

function SendConfirmation(to, message){
    
    let data = {
        service_id: 'service_1kiyrkq',
        template_id: 'template_derujjo',
        user_id: 'HLQ0RvW51ycJOnHby',
        template_params: {
            to_name: to,
            from_email: "Ishcuts@gmail.com",   //CHANGE THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            from_name: "Ish Haircuts",
            message:  `This is a booking confirmation for ${to}.\n${message}`,
            send_to: "Ishcuts@gmail.com"
        }
    };
    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: ()=>{
            //On success remove the schedule from the schedule list
            Schedule.RemoveSlot(slotToRemove);
        }
    });
}
function GetTotal(){
    let haircut = 0;
    let hairselect = document.querySelector('input[name="haircut"]:checked').value;
    let e = document.getElementById('booking-add');
    let addon = e.options[e.selectedIndex].value;
    switch(hairselect){
        case 'Fade Haircut, with line up':
        {
            haircut=25;
            break;
        }
        case 'Fade Haircut, with beard work':
        {
            haircut=30;
            break;
        }
        case 'Buzzcut':
        {
            haircut=10;
            break;
        }
        case 'None':{
            haircut = 0;
            break;
        }
    }
    switch(addon){
        case 'Select an add-on':
        {
            haircut = 0;
            break;
        }
        case 'Line up':
        {
            haircut = (haircut!=0) ? haircut : 10;
            break;
        }
        case 'Full Line up (including beard)':
        {
            haircut = (haircut!=0) ? haircut : 10;
            break;
        }
    }
    TotalFee =`Total: $${haircut}`;
    $('#total').html(TotalFee);
}