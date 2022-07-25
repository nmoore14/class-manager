$( document ).ready(() => {
    // DOM variables
    const modal = $('.modal');
    const modalBox = $('.modal-box');
    const modalWinnings = $('.modal-winnings');
    const closeModal = $('.close');
    const doors = $('.door');
    const modalBtns = $('.btn');

    // Game variables
    var doorPrize;
    var prevDoor;
    var takeAmount;
    var lastPick = false;
    let doorPrizes = {
        door1: 0,
        door2: 0,
        door3: 0
    }

    function setDoorPrizes() {
        $.each(doorPrizes, (doorPrize) => {
            doorPrizes[doorPrize] = getRandomPrizeAmount();
        })
    }

    setDoorPrizes();

    function getRandomPrizeAmount() {
        return Math.floor(Math.random() * 100000);
    }

    function getDoorPrize(doorValue) {
        if (! doorPrize || prevDoor != doorValue) {
            doorPrize = doorPrizes[doorValue - 1];
            prevDoor = doorValue;
        }
    }

    function setModalFooter(doorValue) {
        console.log('Set Modal Footer called');
        $('#modal-footer').html(`<p class="guide-text">You have selected door ${doorValue}</p>`);
    }

    function setTakeAmount() {
        takeAmount = getRandomPrizeAmount();
        $('#take-btn').attr("data-take", takeAmount);
        $('#take-btn').html(`Take $${takeAmount}`);
    }

    function splitString(text, splitPoint) {
        const split = [text.slice(0, splitPoint), text.slice(splitPoint)];

        return split;
    }

    function properUppercase(text) {
        const proper = text.replace(text.charAt(0), text.charAt(0).toUpperCase());

        return proper;
    }

    function getLostDoors(prizeDoors, selectedDoor) {
        $.each(prizeDoors, (prize) => {
            if (prize === selectedDoor) {
                delete prizeDoors[prize];
            }
        });

        return prizeDoors;
    }

    function displayResults(take = false) {
        $('#three-choices').remove();
        const selectedDoor = `door${prevDoor}`;
        const lostDoors = getLostDoors({...doorPrizes}, selectedDoor);


        if (! take) {
            $.each(lostDoors, (lost) => {
                const [door, doorNumber] = splitString(lost, 4);
                $('.lost-doors').append(
                    `<p class="missed-winning">${properUppercase(door)} ${doorNumber}: $${doorPrizes[lost]}</p>`
                );
            });
            $('.winnings-amount').html(`<span class="amount">Door ${prevDoor}: $${doorPrizes[selectedDoor]}</span>`);
            $('.lost-take').append(
                `<p class="missed-winning">$${takeAmount}</p>`
            )
        }

        if (take) {
            $.each(doorPrizes, (prize) => {
                const [door, doorNumber] = splitString(prize, 4);
                $('.lost-doors').append(
                    `<p class="missed-winning">${properUppercase(door)} ${doorNumber}: $${doorPrizes[prize]}</p>`
                );
            });
            $('.winnings-amount').html(`<span class="amount">Take: $${takeAmount}</span>`);
            $('.lost-take').css("display", "none");
        }

        $('#winnings').css("display", "flex");
    }

    function confirmSelection(btnValue) {
        if (lastPick) {
            displayResults();
            return;
        }

        switch(btnValue) {
            case "keep":
                if (confirm("Are you sure?")) {
                    displayResults();
                }
                break;
            case "another":
                if (confirm("Are you sure?")) {
                    lastPick = true;
                    modalBox.toggleClass("modal-box-visible");
                    hideModal();
                }
                break;
            case "take":
                displayResults(true);
                break;
            default:
                break;
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
            modalBox.toggleClass("modal-box-visible")
            setModalFooter(doorValue);
            
            // Immediately show the results if this is a second door pick
            if (lastPick) {
                displayResults();
            }
        });
    })

    $(window).keypress((e) => {
        switch(e.which) {
            case 49:
                if (prevDoor != 1) {
                    $('.js-door-1').click();
                }
                break;
            case 50:
                if (prevDoor != 2) {
                    $('.js-door-2').click();
                }
                break;
            case 51:
                if (prevDoor != 3) {
                    $('.js-door-3').click();
                }
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

    $('#play-again').click(() => {
        location.reload();
    });
});
