// Global App object
class App {
    stories = [];

    setStories(data) {
        this.stories = data;
    }

    getStories() {
        return this.stories
    }

    getStoryById(id) {
        for(let i = 0; i < this.stories.length; i++) {
            if (this.stories[i].id === id) {
                return this.stories[i];
            }
        }
    }

    getWordsByStoryId(id) {
        for(let i = 0; i < this.stories.length; i++) {
            if (this.stories[i].id === id) {
                return this.stories[i].words[0];
            }
        }
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
            $('#words-form').attr('action', `${pathname}api/index.php/story/build`);
            return `${pathname}api/index.php/stories/get`
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

    function formatWordName(word) {
        word = word.split('-');

        return word.join(' ');
    }

    function buildStoriesList() {
        const stories = $.myApp.getStories();


        $.each(stories, (i, story) => {
            console.log(story.words[0]);
            $storyList.append(
                `<div class="flex flex-col-ac story-list-item" data-story-id="${story.id}">
                    <h1>${story.title}</h1>
                    <p>Word Count: ${story.words[0].length}</p>
                </div>`
            )
        })

        addStoryItemClick();
    }

    function addStoryItemClick() {
        const storyItems = $('.story-list-item');

        $.each(storyItems, (i, item) => {
            $(item).click((e) => {
                buildWordForm($(e.currentTarget).data('story-id'));
            })
        })
    }



    function buildWordForm(storyId) {
        const words = $.myApp.getWordsByStoryId(storyId) 
        const formFieldset = $('#word-inputs');

        console.log(words);

        if ($(formFieldset).children().length > 1) {
            $(formFieldset).empty();
        }

        $(formFieldset).append(
            `<input type="hidden" name="story-id" value="${storyId}">`
        );

        $.each(words, (i, word) => {
            $(formFieldset).append(
                `<input type="text" name="${word}" class="word-input" id="${word}" placeholder="${formatWordName(word)}">`
            );
        })
    }

    // Run the app
    function run(data) {
        $.myApp.setStories(data);
        buildStoriesList();
    }

    fetchStories();
})
