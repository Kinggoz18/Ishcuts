export class BookingObject{
    constructor(list){
        this.BookingData ={
            Sunday: [],
            Monday: [],
            Tuseday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: []
        }
        this.listIDs = list;
    }
    //Funtion to get booking data from API
    GetData(){
            $.ajax({
                url:'https://ishcuts-api.herokuapp.com/Admin/GetAllBookings',
                type: 'POST',
                success: (data)=>{
                    this.LoadBookings(data);
                    this.AppendBooking();
                },
                error: function(err){
                    console.log(err);
                }
        })
    }
    //Function to load bookings to the BookingData object
    LoadBookings(data){
        data.forEach(element => {
            let name = element['Name'];
            let number = element['Phone'];
            let haircut = element['Haircut'];
            let day = this.GetWeekDay(element['Slot']);
            let booking = {
                name: name,
                phone: number,
                haircut: haircut,
                Addon: element['Addon'],
                Note: element['Note'],
                slot: null,
                id: element['_id']
            }
            switch(day){
                case 0:
                    booking['slot'] = element['Slot'].replace('Sunday ', '');
                    this.BookingData.Sunday.push(booking)
                    break;
                case 1:
                    booking['slot'] = element['Slot'].replace('Monday ', '');
                    this.BookingData.Monday.push(booking)
                    break;
                case 2:
                    booking['slot'] = element['Slot'].replace('Tuseday ', '');
                    this.BookingData.Tuseday.push(booking)                    
                    break;
                case 3:
                    booking['slot'] = element['Slot'].replace('Wednesday ', '');
                    this.BookingData.Wednesday.push(booking)
                    break;
                case 4:
                    booking['slot'] = element['Slot'].replace('Thursday ', '');
                    this.BookingData.Thursday.push(booking)
                    break;
                case 5:
                    booking['slot'] = element['Slot'].replace('Friday ', '');
                    this.BookingData.Friday.push(booking)
                    break;
                case 6:
                    booking['slot'] = element['Slot'].replace('Saturday ', '');
                    this.BookingData.Saturday.push(booking)
                    break;
                }
        });
    }
    //Returns a weekday
    GetWeekDay(slot){
        if(slot.includes('Sunday')) {
            return 0;
        }
        else if(slot.includes('Monday')) {
            return 1;
        }
        else if(slot.includes('Tuseday')) {
            return 2;
        }
        else if(slot.includes('Wednesday ')) {
            return 3;
        }
        else if(slot.includes('Thursday')) {
            return 4;
        }
        else if(slot.includes('Friday') ){
            return 5;
        }
        else if(slot.includes('Saturday') ){
            return 6;
        }
    }
    //Appends the BookingData to the booking list
    AppendBooking(){
        this.BookingData.Monday.forEach(element=>{
            let newText = $(this.listIDs[1]).html()+`<div class="book-slot"> <div>${element['name']} </div><div>${element['haircut']} - ${element['Addon']} </div><div>${element['slot']}</div><div>${element['Note']} </div><div>Phone: ${element['phone']} </div><div class="slotId">${element['id']}</div><button class="complete-slot">Complete</button></div>`;
            $(this.listIDs[1]).html(newText);
        });
        this.BookingData.Tuseday.forEach(element=>{ 
            let newText = $(this.listIDs[2]).html()+`<div class="book-slot"> <div>${element['name']} </div><div>${element['haircut']} - ${element['Addon']} </div><div>${element['slot']} </div><div>${element['Note']} </div><div>Phone: ${element['phone']} </div><div class="slotId">${element['id']}</div><button class="complete-slot">Complete</button></div>`;
            $(this.listIDs[2]).html(newText);
        });
        this.BookingData.Wednesday.forEach(element=>{
            let newText = $(this.listIDs[3]).html()+`<div class="book-slot"> <div>${element['name']} </div><div>${element['haircut']} - ${element['Addon']} </div><div>${element['slot']} </div><div>${element['Note']} </div><div>Phone: ${element['phone']} </div><div class="slotId">${element['id']}</div><button class="complete-slot">Complete</button></div>`;
            $(this.listIDs[3]).html(newText);
        });
        this.BookingData.Thursday.forEach(element=>{
            let newText = $(this.listIDs[4]).html()+`<div class="book-slot"> <div>${element['name']} </div><div>${element['haircut']} - ${element['Addon']} </div><div>${element['slot']} </div><div>${element['Note']} </div><div>Phone: ${element['phone']} </div><div class="slotId">${element['id']}</div><button class="complete-slot">Complete</button></div>`;
            $(this.listIDs[4]).html(newText);
        });
        this.BookingData.Friday.forEach(element=>{
            let newText = $(this.listIDs[5]).html()+`<div class="book-slot"> <div>${element['name']} </div><div>${element['haircut']} - ${element['Addon']} </div><div>${element['slot']} </div><div>${element['Note']} </div><div>Phone: ${element['phone']} </div><div class="slotId">${element['id']}</div><button class="complete-slot">Complete</button></div>`;
            $(this.listIDs[5]).html(newText);
        });
        this.BookingData.Saturday.forEach(element=>{
            let newText = $(this.listIDs[6]).html()+`<div class="book-slot"> <div>${element['name']} </div><div>${element['haircut']} - ${element['Addon']} </div><div>${element['slot']} </div><div>${element['Note']} </div><div>Phone: ${element['phone']} </div><div class="slotId">${element['id']}</div><button class="complete-slot">Complete</button></div>`;
            $(this.listIDs[6]).html(newText);
        });
        this.BookingData.Sunday.forEach(element=>{
            let newText = $(this.listIDs[0]).html()+`<div class="book-slot"> <div>${element['name']} </div><div>${element['haircut']} - ${element['Addon']} </div><div>${element['slot']} </div><div>${element['Note']} </div><div>Phone: ${element['phone']} </div><div class="slotId">${element['id']}</div><button class="complete-slot">Complete</button></div>`;
            $(this.listIDs[0]).html(newText);
        });
    }
    //Function to remove a booking
    RemoveBooking(slotToRemove){
        $.ajax({
            url: 'https://ishcuts-api.herokuapp.com/RemoveBooking',
            type: 'DELETE',
            data: slotToRemove,
            success: (data)=>{
                location.reload();
            }
        });
    }
}