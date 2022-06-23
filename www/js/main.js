$( document ).ready(() => {
    let chapterContent;

    // Grab the chapters content object
    $.ajax({
        url: "/api/index.php/chapters/list",
    }).done((data) => {
        chapterContent = data;
        $(".js-chapter-content").append(buildChapterLinks(chapterContent));
    });

    function buildChapterLinks(chapterContent) {
        for (let i = 0; i < chapterContent.length; i++) {
            return `<a href=${chapterContent[i].link}>${chapterContent[i].name}</a>`
        }
    }
})
