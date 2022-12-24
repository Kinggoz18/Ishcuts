//Schedule Class
export class ScheduleObject{

    constructor(list){
        this.ScheduleData ={
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

    //function to search the schedule response
    LoadScheduleData(data){
        try{
            data.forEach(element => {
                    let current  = element['slot'];
                    let id = element['_id'];
                    let date = element['slot'];
                    let weekDay = this.GetDay(current);
                    let time = current.slice(11, 22);
                    let slot = {
                        id: id,
                        time: time,
                        date: date
                    }
                switch(weekDay){
                    case 0:
                        this.ScheduleData.Sunday.push(slot)
                        break;
                    case 1:
                        this.ScheduleData.Monday.push(slot)
                        break;
                    case 2:
                        this.ScheduleData.Tuseday.push(slot)                    
                        break;
                    case 3:
                        this.ScheduleData.Wednesday.push(slot)
                        break;
                    case 4:
                        this.ScheduleData.Thursday.push(slot)
                        break;
                    case 5:
                        this.ScheduleData.Friday.push(slot)
                        break;
                    case 6:
                        this.ScheduleData.Saturday.push(slot)
                        break;
                    }
            });
        }
        catch(err){
            console.error(err);
        }
    }
    //Funtion to get schedule data from API
    GetData(isClient){
            $.ajax({
                url:'https://ishcuts-api.herokuapp.com/Schedule',
                type: 'GET',
                success: (data)=>{
                    this.LoadScheduleData(data);
                   if(!isClient){
                    this.AppendScheduleToList();
                   }
                   if(isClient){
                    this.FindTimeSlot();
                   }
                },
                error: function(err){
                    console.log(err);
                }
        })
    }
    //Getter function for ScheduleData
    get schedule(){
        return this.ScheduleData;
    }
    //function to update the schedule list
    AppendScheduleToList(){
    this.ScheduleData.Monday.forEach(element=>{
        let newText = $(this.listIDs[1]).html()+`<div class="slot"> <div>${element['time']} </div><div class="slotId">${element['id']}</div><button class="remove-slot">Remove</button></div>`;
        $(this.listIDs[1]).html(newText);
    });
    this.ScheduleData.Tuseday.forEach(element=>{ 
        let newText = $(this.listIDs[2]).html()+`<div class="slot"> <div>${element['time']} </div><div class="slotId">${element['id']}</div><button class="remove-slot">Remove</button></div>`;
        $(this.listIDs[2]).html(newText);
    });
    this.ScheduleData.Wednesday.forEach(element=>{
        let newText = $(this.listIDs[3]).html()+`<div class="slot"> <div>${element['time']} </div><div class="slotId">${element['id']}</div><button class="remove-slot">Remove</button></div>`;
        $(this.listIDs[3]).html(newText);
    });
    this.ScheduleData.Thursday.forEach(element=>{
        let newText = $(this.listIDs[4]).html()+`<div class="slot"> <div>${element['time']} </div><div class="slotId">${element['id']}</div><button class="remove-slot">Remove</button></div>`;
        $(this.listIDs[4]).html(newText);
    });
    this.ScheduleData.Friday.forEach(element=>{
        let newText = $(this.listIDs[5]).html()+`<div class="slot"> <div>${element['time']} </div><div class="slotId">${element['id']}</div><button class="remove-slot">Remove</button></div>`;
        $(this.listIDs[5]).html(newText);
    });
    this.ScheduleData.Saturday.forEach(element=>{
        let newText = $(this.listIDs[6]).html()+`<div class="slot"> <div>${element['time']} </div><div class="slotId">${element['id']}</div><button class="remove-slot">Remove</button></div>`;
        $(this.listIDs[6]).html(newText);
    });
    this.ScheduleData.Sunday.forEach(element=>{
        let newText = $(this.listIDs[0]).html()+`<div class="slot"> <div>${element['time']} </div><div class="slotId">${element['id']}</div><button class="remove-slot">Remove</button></div>`;
        $(this.listIDs[0]).html(newText);
    });
    }
    //Function to add the time slot to the schedule list then reload the page
    AddScheduleToList(current){
        let weekDay = this.GetDay(current);
        
        switch(weekDay){
            case 0:
                this.ScheduleData.Sunday.push(current)
                break;
            case 1:
                this.ScheduleData.Monday.push(current)
                break;
            case 2:
                this.ScheduleData.Tuseday.push(current)                    
                break;
            case 3:
                this.ScheduleData.Wednesday.push(current)
                break;
            case 4:
                this.ScheduleData.Thursday.push(current)
                break;
            case 5:
                this.ScheduleData.Friday.push(current)
                break;
            case 6:
                this.ScheduleData.Saturday.push(current)
                break;
            }
        location.reload();
    }
    //Method to add a slot to the schdeule
    AddSlotToSchedule(slotData){
        $.ajax({
            url:'https://ishcuts-api.herokuapp.com/Schedule',
            type: 'POST',
            data: slotData,
            success: (data)=>{
                if(data['error']!=false){
                    this.AddScheduleToList(data['slot']);
                }
                else{
                    console.log(data['message']);
                }
            }
        });
    }
    //Function to remove a time slot
    RemoveSlot(slotToRemove){
        $.ajax({
            url: 'https://ishcuts-api.herokuapp.com/RemoveSchedule',
            type: 'DELETE',
            data: slotToRemove,
            success: (data)=>{
                location.reload();
            }
        });
    }
    GetDay(current){
        let date = current.slice(0, 10);
        let weekday = new Date(date);
        let temp = weekday.getDay() +1;
        if(temp == 7 )
        {
            temp = 0
        }
        return temp;
    }

    FindTimeSlot(data){
        this.ScheduleData.Monday.forEach(element=>{
            let newText = $(this.listIDs[1]).html()+`<div class="slot"> <div>${element['time']} </div><div class="slotId">${element['id']}</div><button class="book-slot">Select</button><div class="hide">${element['date']}</div></div>`;
            $(this.listIDs[1]).html(newText);
        });
        this.ScheduleData.Tuseday.forEach(element=>{ 
            let newText = $(this.listIDs[2]).html()+`<div class="slot"> <div>${element['time']} </div><div class="slotId">${element['id']}</div><button class="book-slot">Select</button><div class="hide">${element['date']}</div></div>`;
            $(this.listIDs[2]).html(newText);
        });
        this.ScheduleData.Wednesday.forEach(element=>{
            let newText = $(this.listIDs[3]).html()+`<div class="slot"> <div>${element['time']} </div><div class="slotId">${element['id']}</div><button class="book-slot">Select</button><div class="hide">${element['date']}</div></div>`;
            $(this.listIDs[3]).html(newText);
        });
        this.ScheduleData.Thursday.forEach(element=>{
            let newText = $(this.listIDs[4]).html()+`<div class="slot"> <div>${element['time']} </div><div class="slotId">${element['id']}</div><button class="book-slot">Select</button><div class="hide">${element['date']}</div></div>`;
            $(this.listIDs[4]).html(newText);
        });
        this.ScheduleData.Friday.forEach(element=>{
            let newText = $(this.listIDs[5]).html()+`<div class="slot"> <div>${element['time']} </div><div class="slotId">${element['id']}</div><button class="book-slot">Select</button><div class="hide">${element['date']}</div></div>`;
            $(this.listIDs[5]).html(newText);
        });
        this.ScheduleData.Saturday.forEach(element=>{
            let newText = $(this.listIDs[6]).html()+`<div class="slot"> <div>${element['time']} </div><div class="slotId">${element['id']}</div><button class="book-slot">Select</button><div class="hide">${element['date']}</div></div>`;
            $(this.listIDs[6]).html(newText);
        });
        this.ScheduleData.Sunday.forEach(element=>{
            let newText = $(this.listIDs[0]).html()+`<div class="slot"> <div>${element['time']} </div><div class="slotId">${element['id']}</div><button class="book-slot">Select</button><div class="hide">${element['date']}</div></div>`;
            $(this.listIDs[0]).html(newText);
        });
    }
}