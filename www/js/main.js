$( document ).ready(() => {
    let chapterContent;

    // Grab the chapters content object
    $.ajax({
        url: "/api/index.php/chapters/list",
    }).done((data) => {
        chapterContent = data;
        buildChapterContent(chapterContent);
    });


    $.ajax({
        url: "/api/index.php/projects/list",
    }).done((data) => {
        projectContent = data;
        buildProjectContent(projectContent);
    });

    function buildProjectContent(projectContent) {
        for (let i = 0; i < projectContent.length; i++) {
            $(".js-project-content").append(buildProjectCard(projectContent[i]));
        }
    }

    function buildChapterContent(chapterContent) {
        for (let i = 0; i < chapterContent.length; i++) {
            $(".js-chapter-content").append(buildChapterCard(chapterContent[i]));
        }
    }

    function buildProjectCard(projectInfo) {
        const projectCard = `
            <a class="card chapter-card" href="${projectInfo.link}">
                <div class="card-title">
                    <h1 class="project-title">${projectInfo.name}</h1>
                </div>
            </a>
        `;

        return projectCard;
    }

    function buildChapterCard(chapterInfo) {
        const chapterCard = `
            <a class="card chapter-card" href="${chapterInfo.link}">
                <div class="card-title">
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
