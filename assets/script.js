$(function () {

    //global variables

    let hours = [];
    let currentDayEl = $('#currentDay');
    let timeBlocksEl = $('#timeBlocks');
    let clearBtn = $('#clearBtn');
    //let schedule = [];

    function init() {
        reset();
        for (var i = 9; i <= 21; i++) {
            hours.push(i);
        }
        displayCurrentDay();
        setInterval(function () {
            displayCurrentDay();
        }, 1000);

        addRows();

        //use interval to update row color every 10 mins
        setRowColor();
        setInterval(function () {
            setRowColor();
        }, 60000);
    }

    function reset() {
        timeBlocksEl.empty();
        hours = [];
    }

    // display current day on the page
    function displayCurrentDay() {
        let currentDate = moment().format('MMM DD, YYYY hh:mm:ss');
        currentDayEl.text(currentDate);
    }

    function addRows() {
        $.each(hours, function (index, hour) {
            let hourInLT = moment(hour, "h").format('LT');
            let timeBlock = $('<div>')
                .addClass('row time-block')
                .data('hour', hour);
            let hourCol = $('<div>')
                .addClass('col-md-1 hour pt-2 small')
                .text(`${hourInLT}`);
            let textCol = $('<textarea>')
                .addClass('col-10 col-md-10 description')
                .text(getSchedule(`hour-${hour}`));  // load data from local storage and put it in the correct row
            let btnCol = $('<button>')
                .addClass('btn col-2 col-md-1 saveBtn')
                .append('<i class="fas fa-save"></i>');
            timeBlock.append(hourCol, textCol, btnCol);
            timeBlocksEl.append(timeBlock);
        });
    }

    //color rows based on time of day
    function setRowColor() {
        //set variable to current hour
        let currentHour = moment().hour();
        //loop over each row of the class (time-block)
        $('.time-block').each(function () {
            //find row time using data attribute add appropriate class
            let rowHour = $(this).data('hour');
            if (rowHour < currentHour) {
                //if rowHour is in past, add class "past" and make field read only
                $(this).children('textarea').addClass('past').attr('readonly', true);
                // disable button
                $(this).children('button').attr('disabled', true);
            } else if (rowHour == currentHour) {
                //if rowHour is current
                $(this).children('textarea').addClass('present');
            } else {
                //if rowHour is in future
                $(this).children('textarea').addClass('future');
            }
        })

    }

    function getSchedule(key) {
        return localStorage.getItem(key);
    }

    function setSchedule(key, value) {
        localStorage.setItem(key, value);
    }

    function saveSchedule() {
        // get textarea content
        let hour = $(this).parent().data('hour');
        let description = $(this).prev('.description').val();

        // save it to locastorage
        setSchedule(`hour-${hour}`, description);
        toggleAlertMessage('save');

    }

    function toggleAlertMessage(alertType) {
        // show message to user
        if (alertType == 'save') {
            $('.alert-message.text-success').fadeIn(1000, function () {
                // hide message after 2 seconds
                $('.alert-message.text-success').fadeOut(2000);
            });
        } else if (alertType == 'clear') {
            $('.alert-message.text-danger').fadeIn(1000, function () {
                // hide message after 2 seconds
                $('.alert-message.text-danger').fadeOut(2000);
            });
        }
    }

    function clearSchedule() {
        localStorage.clear();
        init();
        toggleAlertMessage('clear');
    }

    //event handlers
    init();
    $(document).on('click', '.saveBtn', saveSchedule);
    clearBtn.on('click', clearSchedule);

});