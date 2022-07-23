$( document ).ready(() => {
    // DOM variables
    const modal = $('.modal');
    const modalBox = $('.modal-box');
    const closeModal = $('.close');
    const doors = $('.door');

    // Game variables
    const key = 'Project6';
    var doorPrize;
    var prevDoor;

    function getDoorPrize(doorValue) {
        const newDoorPrize = Math.floor(Math.random() * 100000);

        if (! doorPrize || prevDoor != doorValue) {
            doorPrize = newDoorPrize;
            prevDoor = doorValue;
        }
    }
    
    // Door event handling
    $.each(doors, (_, door) => {
        $(door).click((e) => {
            const doorValue = $(e.currentTarget).data("value");
            getDoorPrize(doorValue);
            modal.css("display", "flex");
            setTimeout(() => {
                modalBox.toggleClass("modal-box-visible")
            }, 250)
        });
    })

    // Modal event handling
    $(modal).click((e) => {
        modal.css("display", "none");
        modalBox.toggleClass("modal-box-visible");
    })

    $(modalBox).click((e) => {
        e.stopPropagation();
    })

    $(closeModal).click((e) => {
        modal.css("display", "none");
        modalBox.toggleClass("modal-box-visible");
    })

});
