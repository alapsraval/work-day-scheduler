$(function () {

    //global variables

    let hours = [];
    let currentDayEl = $('#currentDay');
    let timeBlocksEl = $('#timeBlocks');

    function init() {
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

    function addRows() {
        $.each(hours, function (index, hour) {
            let hourInLT = moment(hour, "h").format('LT');
            let timeBlock = $('<div>')
                .addClass('row time-block')
                .data('hour', hour);
            let hourCol = $('<div>').addClass('col-md-1 hour pt-2 small').text(`${hourInLT}`);
            let textCol = $('<textarea>').addClass('col-md-10 description');
            let btnCol = $('<button>').addClass('col-md-1 saveBtn').append('<i class="fas fa-save"></i>');
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
            } else if (rowHour == currentHour) {
                //if rowHour is current
                $(this).children('textarea').addClass('present');
            } else {
                //if rowHour is in future
                $(this).children('textarea').addClass('future');
            }
        })

    }

    // display current day on the page
    function displayCurrentDay() {
        let currentDate = moment().format('MMM DD, YYYY hh:mm:ss');
        currentDayEl.text(currentDate);
    }

    //event handlers
    init();

});