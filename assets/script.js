$(function () {

    //global variables

    let hours = [];
    let currentDayEl = $('#currentDay');

    function init() {
        for (var i = 9; i <= 21; i++) {
            hours.push(i);
        }
        displayCurrentDay();
        setInterval(function () {
            displayCurrentDay();
        }, 1000);

        //color rows based on time of day
        //use interval to update row color
        setInterval(function () {
            setRowColor();
        }, 1000);
        
    }

    function addRows() {

    }

    function setRowColor() {
        //set variable to current hour
        let currentHour = 12;//moment().hour();
        //loop over each row of the class (time-block)
        $('.time-block').each(function () {
            let rowHour = $(this).data('hour');
            if (rowHour < currentHour) {
                //if rowHour is in past, add class "past" and make field read only
                $(this).children('textarea').addClass('past').attr('readonly',true);
            } else if (rowHour == currentHour) {
                //if rowHour is current
                $(this).children('textarea').addClass('current');
            } else {
                //if rowHour is in future
                $(this).children('textarea').addClass('future');
            }
        })

        //find row time using data attribute (9 < 21)
        //add the past class to $(this).addClass('past)
    }

    //color rows based on time of day
    //use interval to update row color


    // display current day on the page

    function displayCurrentDay() {
        let currentDate = moment().format('MMM DD, YYYY hh:mm:ss');
        currentDayEl.text(currentDate);
    }

    //event handlers
    init();

});