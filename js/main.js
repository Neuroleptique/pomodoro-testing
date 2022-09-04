const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

const startBtn = document.querySelector('#start')
const sessionValue = document.querySelectorAll('.sessionValue')
const reset = document.querySelector('#reset')



// Event Listeners
reset.addEventListener('click', reSet)
startBtn.addEventListener('click', twentyFiveMinutesTimer)


//loop through array of elements and listen for events
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})



// ---- Twenty five minutes pomodoro timer

let isRunning = false, count = 0, startTime = 0 , currentTime = 0, elapsedTime = 0, stopTime, 
totalMinute = 0, clockInterval, hours, remainder = 0, minutes = 0, seconds = 0, formattedTime = 0;

function twentyFiveMinutesTimer(){
    if (!isRunning) {
        // start the clock
        isRunning = true;

        if (elapsedTime == 0) {
            startTime = new Date().getTime();

        } else {
            startTime = new Date().getTime() - elapsedTime;
            console.log(startTime)
        }

        clockInterval = window.setInterval(function(){

            currentTime = new Date().getTime();
            elapsedTime = currentTime - startTime;
            
            // milliseconds per hour is 3600000
            hours = Math.floor(elapsedTime / 3600000);
            remainder = elapsedTime - (hours * 3600000);

            // milliseconds per minute is 60000
            minutes = Math.floor(remainder / 60000);
            remainder -= (minutes * 60000);

            // milliseconds per second is 1000
            seconds = Math.floor(remainder / 1000);
            remainder -= (seconds * 1000);

            let formattedMinutes = parseInt(minutes)
            let formattedSeconds = parseInt(seconds)
            
            // ---> adjust pomodoro session length here <----
            if( formattedSeconds == 3 ){
                                               
                // announce the end of pomodoro add add session and minutes to work length
                count += 1
                totalMinute += 25
                document.querySelector('.totalTime').innerHTML = totalMinute
                //Insert Values into the dom
                document.querySelector('p').innerHTML = 'BREAK'
                // document.querySelector('.sessionValue').innerHTML = count
                document.querySelector('.countdownSeconds').innerHTML = add_leading_zero(formattedSeconds)
                document.querySelector('.countdownMinutes').innerHTML = add_leading_zero(formattedMinutes)

                // Clear the clock interval
                window.clearInterval(clockInterval)

                //Start Five Minutes break after every pomodoro session ends
                fiveMinutesBreakTimer()
                elapsedTime = 0
                isRunning = false
                                
            }else{
                document.querySelector('.countdownSeconds').innerHTML = add_leading_zero(formattedSeconds)
                document.querySelector('.countdownMinutes').innerHTML = add_leading_zero(formattedMinutes)
                // document.querySelector('.sessionValue').innerHTML = count
            }
            
        }, 1000);

    } else {

        // stop the clock
        window.clearInterval(clockInterval);
        isRunning = false;

    }
}

// Five minutes break timer 

let running = false, counts = 0, startBreakTime = 0 , currentTimeonBreak = 0, elapsedBreakTime = 0, stopTimeBreak, 
clockIntervalBreak, hoursBreak, remainderBreak = 0, minutesBreak = 0, secondsBreak = 0, formattedTimeBreak = 0;



function fiveMinutesBreakTimer(){
    if (!running) {
        // start the clock
        running = true;

        if (elapsedBreakTime == 0) {
            startBreakTime = new Date().getTime();

        } else {
            startBreakTime = new Date().getTime() - elapsedBreakTime;
            console.log(startBreakTime)
        }

        clockIntervalBreak = window.setInterval(function(){

            currentTimeonBreak = new Date().getTime();
            elapsedBreakTime = currentTimeonBreak - startBreakTime;

            // per hour 3600000
            // per minute 60000
            // per second 1000
            hoursBreak = Math.floor(elapsedBreakTime / 3600000);
            remainderBreak = elapsedBreakTime - (hoursBreak * 3600000);

            minutesBreak = Math.floor(remainderBreak / 60000);
            remainderBreak -= (minutesBreak * 60000);

            secondsBreak = Math.floor(remainderBreak / 1000);
            remainderBreak -= (secondsBreak * 1000);

            
            let formattedBreakMinutes = parseInt(minutesBreak)
            let formattedBreakSeconds = parseInt(secondsBreak)
            // console.log(formattedBreakSeconds)

            // ---> adjust break session length here <----
            if( formattedBreakSeconds == 5 ){
               
                counts += 1
               document.querySelector('.sessionValue').innerHTML = counts
               document.querySelector('.countdownSeconds').innerHTML = add_leading_zero(formattedBreakSeconds)
                document.querySelector('.countdownMinutes').innerHTML = add_leading_zero(formattedBreakMinutes)
                 // announce the end of break
                document.querySelector('p').innerHTML = 'BREAK OVER'
               
                // clear the time interval
                elapsedBreakTime = 0
                window.clearInterval(clockIntervalBreak)
                running = false
                
                
            }else{
                document.querySelector('.sessionValue').innerHTML = counts
                document.querySelector('.countdownSeconds').innerHTML = add_leading_zero(formattedBreakSeconds)
                document.querySelector('.countdownMinutes').innerHTML = add_leading_zero(formattedBreakMinutes)
            
            }
            
        },1000);

    } else {
        // stop the clock
        window.clearInterval(clockIntervalBreak);
        running = false;
    }
}

// Timer reset
function reSet() {

    startTime = new Date().getTime();
    if (!running && !isRunning) {
        elapsedTime = 0;
        document.querySelector('.countdownMinutes').innerHTML = "00";
        document.querySelector('.countdownSeconds').innerHTML = "00"
    }
}


// Leading zero
function add_leading_zero(number){
    if(number < 10) {
        return "0" + number.toString();
    } else {
        return number.toString();
    }
}

// Update total length spend to database
   // --> Route/todos.js
   // --> Controllers/todos.js 
        // --> modify duration

/* async function recordDuration(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/recordDuration', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
                'duration': totalMinute,
                'session': count
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
*/