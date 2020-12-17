var password = 1234; //Test Password

// Total number of combinations in entered number of characters
$("#combinations").click(function () {
    let noOfChar = $('#noOfChar').val();
    let totalComb = Math.pow(10, parseInt(noOfChar));

    $('#defaultModalLabel').html('Total Combinations');
    $('#modalMainText').html('Total Possible Combinations :');
    $('#modalMainValue').html(totalComb.toLocaleString());
    $('#defaultModal').modal('show');
});

// Estimated time to complete the entire brute force
$("#estTime").click(function () {
    let finalVal = finalCombValue();

    // Testing the speed with first 10,000 values;normally results to 1ms for 10k iterations
    for (let i = 0; i <= 10000; i++) {
        if (i == 0) beginTime = new Date();
        if (i == 10000) endTime = new Date();
    }

    let diff = Math.abs(beginTime - endTime); //Time taken for first 10 values in milliseconds
    console.log("Begin Time = " + beginTime.getMilliseconds());
    console.log("End Time = " + endTime.getMilliseconds());

});

// Do the Brute Force
$("#bruteForceBtn").click(function () {
    $('#spinnerModal').modal('toggle');
    setTimeout(function () {
        bruteForce();
    }, 500);
});

// Calculate the final number of the combination
function finalCombValue() {
    let finalVal = "";
    let noOfChar = $('#noOfChar').val();
    for (let k = 1; k <= noOfChar; k++) {
        finalVal = finalVal + "9";
    }
    return finalVal;
}

function bruteForce() {
    var startTime = new Date(); // To get the time started for calculating total time taken
    let finalVal = finalCombValue();

    // Iterate through each combination upto the final value of the combination
    for (var i = 0; i <= finalVal; i++) {
        console.log(i);
        if (i == password) {
            result = true;
            break;
        } else {
            result = false;
        }
    }

    if (result == true) {
        $('#spinnerModal').modal('hide');
        var diff = Math.abs(startTime - new Date()); // To get the total time taken to crack the password
        $('#timeTakenText').html('Time taken : ');

        if (diff < 1000) { //If cracked within milliseconds

            $('#timeTakenValue').html(diff + " (ms)");

        } else { // If cracked within seconds or more

            timeTaken = diff / 1000; // Convert to ms to seconds

            if (timeTaken < 60) {
                $('#timeTakenValue').html(timeTaken + " (s)");
            } else {
                timeTaken = timeTaken / 60; // Convert to seconds to minutes
                $('#timeTakenValue').html(timeTaken + " (m)");
            }

        }

        $('#defaultModalLabel').html('Success!');
        $('#modalMainText').html('Password :');
        $('#modalMainValue').html(i);
        $('#defaultModal').modal('show');

    } else {
        $('#spinnerModal').modal('hide');
        $('#defaultModalLabel').html('Failed!');
        $('#modalMainText').html('No password matched with the entered character limit.');
        $('#defaultModal').modal('show');
    }
    console.log("finalCombValue = " + finalVal);
    return true;
}