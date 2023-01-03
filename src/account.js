'use strict';
import { BookingObject } from './BookingObject.js';
import {ScheduleObject} from './ScheduleObject.js'

let today = CurrentDate();
let ScheduleDays = ["#Sunday","#Monday","#Tuseday","#Wednesday","#Thursday","#Friday","#Saturday" ];
let BookingDays = ["#BSunday","#BMonday","#BTuseday","#BWednesday","#BThursday","#BFriday","#BSaturday" ];

let currentDate = document.querySelector('#currentDate');
let signout = document.querySelector('.signout');

let Schedule = new ScheduleObject(ScheduleDays);
let Booking = new BookingObject(BookingDays);

$(currentDate).text(`Date: ${today}`);

$(function(){
    RemoveSlot();
    RemoveBooking();
    Schedule.GetData(false);
    LoadBookings();
    AddToSchedule();
    SignOut();
});

//Function to fecth tehe current date
function CurrentDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}
//Function to add a schedule to the slot
function AddToSchedule(){

    $('#addTime').on('click',()=>{
        let day = document.querySelector('#schedule-date').value;
        let time = document.querySelector("#schedule-time").value;
        if(time == '0' || day.length == 0){
            return;
        }
        else{
            let send = {
                slot: `${day} ${time}`
            };
            Schedule.AddSlotToSchedule(send);
        }
    });
}

//Function to remove a slot from the schedule
function RemoveSlot(){
    $('#schedule-list').on('click', '.remove-slot' ,(event)=>{
        let button = event.target;
        let id = $(button).prev().text();
        let slotToRemove = {
            _id:  id
        }
        Schedule.RemoveSlot(slotToRemove)
    });
}
//Function to sign out user
function SignOut(){
    $(signout).on('click', ()=>{
        let url = new URL('https://web-production-364a.up.railway.app/account.html?adminKey=0');
        window.location.replace(url);
    })
}
//Function to load bookings 
function LoadBookings(){
    Booking.GetData();
}
//Function to complete a booking from the schedule
function RemoveBooking(){
    $('#booking-list').on('click', '.complete-slot' ,(event)=>{
        let button = event.target;
        let id = $(button).prev().text();
        let slotToRemove = {
            _id:  id
        }
        Booking.RemoveBooking(slotToRemove)
    });
}