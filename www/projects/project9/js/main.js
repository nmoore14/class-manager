// Global App object
class App {
    stories = [];

    setStories(data) {
        this.stories = data;
    }

    getStories() {
        return this.stories
    }
}

$( document ).ready(() => {
    $.myApp = new App();

    // DOM Variables
    const $storyList = $('#story-list');

    // Grab all of the stories to display
    function getUrl() {
        const host = $(location).attr('host');
        const pathname = $(location).attr('pathname');

        if (host === 'localhost') {
            return `${pathname}/api/index.php/stories/list`
        }
    }

    function fetchStories() {
        const url = getUrl();
        $.ajax({
            url: url,
        }).done((data) => {
            run(data);
        });
    }

    function buildStoriesList() {
        const stories = $.myApp.getStories();

        console.log(stories);
        $.each(stories, (i, story) => {
            $storyList.append(
                `<div class="flex flex-col-ac story-list-item" data-story-id="${story.id}">
                    <h1>${story.title}</h1>
                    <h3>${story.type}</h3>
                    <p>Word Count: ${story.words.length}</p>
                </div>`
            )
        })
    }

    // Run the app
    function run(data) {
        $.myApp.setStories(data);
        buildStoriesList();
    }

    fetchStories();
})
