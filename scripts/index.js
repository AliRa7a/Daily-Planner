(function() {
    // Function to create timeblocks
    function createTimeBlocks() {
      // Standard business hours (9 AM to 5 PM)
      const businessHours = Array.from({ length: 9 }, (_, index) => index + 9);
  
      const container = $(".container");
  
      // Get current date using Day.js
      const currentDate = dayjs().format("dddd, MMMM D");
  
      // Display the current date
      $("#currentDay").text(currentDate);
  
      // Loop through business hours to create timeblocks
      businessHours.forEach(hour => {
        const timeBlock = $("<div>").addClass("time-block row");
  
        // Create time column
        const timeColumn = $("<div>").addClass("col-md-1 hour").text(hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`);
        // Create text area for event
        const eventColumn = $("<textarea>").addClass("col-md-10 description");
        // Get the event from local storage and set it to the textarea
        const storedEvent = localStorage.getItem(`event-${hour}`);
        if (storedEvent) {
          eventColumn.val(storedEvent);
        }
  
        // Check and add past, present, or future class based on current time
        if (hour < dayjs().hour()) {
          eventColumn.addClass("past");
        } else if (hour === dayjs().hour()) {
          eventColumn.addClass("present");
        } else {
          eventColumn.addClass("future");
        }
  
        // Create save button
        const saveBtn = $("<button>")
          .addClass("col-md-1 saveBtn")
          .html('<i class="fas fa-save"></i>')
          .on("click", function () {
            // Get the event text
            const eventText = $(this).siblings(".description").val();
  
            // Get the hour of the timeblock
            const eventHour = $(this).siblings(".hour").text().trim().replace(/[^0-9]/g, "");
  
            // Save to local storage
            localStorage.setItem(`event-${eventHour}`, eventText);

            // Show the message element
            $("#saveMessage").text(`Event saved for hour ${eventHour}: ${eventText}`);
          });
  
        // Append columns to time block
        timeBlock.append(timeColumn, eventColumn, saveBtn);
  
        // Append time block to container
        container.append(timeBlock);
      });
    }
    // Call the function when the document is ready
    $(document).ready(createTimeBlocks);
  })();
  