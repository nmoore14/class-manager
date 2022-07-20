$( document ).ready(() => {
    // Interest Charge => Beginning Balance * (Interest Rate / 12)
    // Ending Balance => Beginning Balance + Interest Charge - Payment Amount
    
    // Get the inputs
    const startingBalanceInput = $('#starting-balance-input');
    const interestRateInput = $('#interest-rate-input');
    const monthlyPaymentInput = $('#monthly-payment-input');
    let payments;

    function validateInput(pressedKey) {
        if (pressedKey >= 48 && pressedKey <= 57) {
            return true;
        }

        return false;
    }

    function calculateInterestCharge(startingBalance, interestRate) {
        const interestCharge =  startingBalance * ((interestRate / 100) / 12);
        return Math.round(interestCharge * 100) / 100;
    }

    function calculateEndingBalance(startingBalance, interestCharge, paymentAmount) {
        let balance = startingBalance + interestCharge - paymentAmount;
        return Math.round(balance * 100) / 100;
    }

    function buildPaymentList(startingBalance, interestRate, paymentAmount) {
        let paymentList = [];
        let totalAmount = startingBalance;
        let totalInterest = 0;
        let currentMonth = 1;

        while (startingBalance > paymentAmount) {
            let interestCharge = calculateInterestCharge(startingBalance, interestRate);
            let endingBalance = calculateEndingBalance(startingBalance, interestCharge, paymentAmount);

            let currentMonthPayment = {
                id: currentMonth,
                startingBalance: startingBalance,
                interestCharge: interestCharge,
                payment: paymentAmount,
                endingBalance: endingBalance,
                isFinalStats: false,
            };

            paymentList.push(currentMonthPayment);

            startingBalance = endingBalance;

            currentMonth += 1;
            totalAmount += interestCharge;
            totalInterest += interestCharge;
        }

        const finalPaymentInterest = calculateInterestCharge(startingBalance, interestRate);
        const finalPaymentAmount = startingBalance + calculateInterestCharge(startingBalance, interestRate);
        const finalPaymentBalance = startingBalance + finalPaymentInterest - finalPaymentAmount;

        const finalPayment = {
            id: currentMonth,
            startingBalance: startingBalance,
            interestCharge: finalPaymentInterest,
            payment: finalPaymentAmount,
            endingBalance: finalPaymentBalance,
            isFinalStats: false,
        }
        
        const finalStats = {
            totalInterest: totalInterest,
            totalAmount: totalAmount,
            isFinalStats: true,
        }

        paymentList.push(finalPayment);
        paymentList.push(finalStats);

        return paymentList;
    }

    function buildPaymentTable(payments) {
        const paymentTableBody = $('.payments-body');
        const paymentTableFooter = $('.payments-footer');

        $.each(payments,(i, payment) => {
            if (! payment.isFinalStats) {
                paymentTableBody.append(`
                    <tr>
                        <td class="payment-number">${payment.id}</td>
                        <td class="payment-info">$${payment.startingBalance}</td>
                        <td class="payment-info">$${payment.interestCharge}</td>
                        <td class="payment-info">$${payment.payment}</td>
                        <td class="payment-info">$${payment.endingBalance}</td>
                    </tr>
                `);
            } else {
                paymentTableFooter.append(`
                    <tr class="footer-headers">
                        <td></td>
                        <td></td>
                        <td class="footer-header">Interest Paid:</td>
                        <td></td>
                        <td class="footer-header">Total Amount Paid:</td>
                    </tr>
                    <tr class="footer-stats">
                        <td></td>
                        <td></td>
                        <td class="footer-stat">$${payment.totalInterest}</td>
                        <td></td>
                        <td class="footer-stat">$${payment.totalAmount}</td>
                    </tr>
                `);
            }
        })

    }

    // Event Listeners to run the program
    $('.data-input').keyup((e) => {
        if (! validateInput(e.which)) {
            e.target.value = e.target.value.replace(/[^0-9\.]/g, '');
        }
    });

    $('.debt-form').submit((e) => {
        e.preventDefault();

        let startingBalance = parseInt(startingBalanceInput.val());
        let interestRate = parseInt(interestRateInput.val());
        let monthlyPayment = parseInt(monthlyPaymentInput.val());

        payments = buildPaymentList(startingBalance, interestRate, monthlyPayment);
        buildPaymentTable(payments);

        startingBalanceInput.val('');
        interestRateInput.val('');
        monthlyPaymentInput.val('');
    })
});
