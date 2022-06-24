$( document ).ready(() => {
    let chapterContent;

    // Grab the chapters content object
    $.ajax({
        url: "/api/index.php/chapters/list",
    }).done((data) => {
        chapterContent = data;
        buildChapterContent(chapterContent);
    });

    function buildChapterContent(chapterContent) {
        for (let i = 0; i < chapterContent.length; i++) {
            $(".js-chapter-content").append(buildChapterCard(chapterContent[i]));
        }
    }

    function buildChapterCard(chapterInfo) {
        const chapterCard = `
            <a class="chapter-card" href="${chapterInfo.link}">
                <div class="chapter-card-title">
                    <h1 class="chapter-title">${chapterInfo.name}</h1>
                </div>
            </a>
        `;

        return chapterCard;
    }

    function setDate() {
        var currentdate = new Date(); 
        var datetime = (currentdate.getMonth()+1) + "/"
                + currentdate.getDate()  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();

        return datetime;
    }

    /**
    ****************************************
    *             DOM Edits
    ****************************************
    */

    // set the time
    $(".date").html(setDate());

    // update time
    setInterval(() => {
        $(".date").html(setDate());
    }, 60000)

})
