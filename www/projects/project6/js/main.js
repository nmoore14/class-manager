$( document ).ready(() => {
    // DOM variables
    const modal = $('.modal');
    const modalBox = $('.modal-box');
    const closeModal = $('.close');
    const doors = $('.door');
    const modalBtns = $('.btn');

    // Game variables
    var doorPrize;
    var prevDoor;

    function getRandomPrizeAmount() {
        return Math.floor(Math.random() * 100000);
    }

    function getDoorPrize(doorValue) {
        const newDoorPrize = getRandomPrizeAmount();

        if (! doorPrize || prevDoor != doorValue) {
            doorPrize = newDoorPrize;
            prevDoor = doorValue;
        }
    }

    function setModalFooter(doorValue) {
        console.log('Set Modal Footer called');
        $('#modal-footer').html(`<p class="guide-text">You have selected door ${doorValue}</p>`);
    }

    function setTakeAmount() {
        const takeAmount = getRandomPrizeAmount();
        $('#take-btn').attr("data-take", takeAmount);
        $('#take-btn').html(`Take ${takeAmount}`);
    }

    function confirmSelection(btnValue) {
        if (confirm("Are you sure?")) {
            console.log(doorPrize);
            hideModal();
            modalBox.toggleClass("modal-box-visible");
            doorPrize = '';
            prevDoor = '';
        } else {
            console.log('Going back');
        }
    }

    function hideModal() {
        modal.css("display", "none");

    }
    
    // Door event handling
    $.each(doors, (_, door) => {
        $(door).click((e) => {
            const doorValue = $(e.currentTarget).data("value");
            $(e.currentTarget).addClass('door-disabled');
            getDoorPrize(doorValue);
            setTakeAmount();
            modal.css("display", "flex");
            setTimeout(() => {
                modalBox.toggleClass("modal-box-visible")
                setModalFooter(doorValue);
            }, 250)
        });
    })

    $(window).keypress((e) => {
        switch(e.which) {
            case 49:
                $('.js-door-1').click();
                break;
            case 50:
                $('.js-door-2').click();
                break;
            case 51:
                $('.js-door-3').click();
                break;
            default:
                break;
        }

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
        hideModal();
        modalBox.toggleClass("modal-box-visible");
    })

    $.each(modalBtns, (_, btn) => {
        $(btn).click((e) => {
            const btnValue = $(e.currentTarget).data("value");
            confirmSelection(btnValue);
        });
    })

});
