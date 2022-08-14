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

    getStoryTitleById(id) {
        for(let i = 0; i < this.stories.length; i++) {
            if (this.stories[i].id === id) {
                return this.stories[i].title;
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
        
        $('#words-form').attr('action', `${pathname}api/index.php/story/build`);

        return `${pathname}api/index.php`
    }

    function fetchStories() {
        const url = `${getUrl()}/stories/get`;
        $.ajax({
            url: url,
        }).done((data) => {
            run(data);
        });
    }

    function submitStoryData(storyData) {
        const url = `${getUrl()}/story/build`;

        $.post(url, storyData, function(response) {
            displayStory(response);
        });
    }

    function formatWordName(word) {
        word = word.split('-');

        return word.join(' ');
    }

    function buildStoriesList() {
        const stories = $.myApp.getStories();


        $.each(stories, (i, story) => {
            const title = story.title.split('.'); 
            $storyList.append(
                `<div class="flex flex-col-ac story-list-item" data-story-id="${story.id}">
                    <h1>${title[0]}</h1>
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
                $('.words').css('display', 'flex');
                buildWordForm($(e.currentTarget).data('story-id'));
            })
        })
    }



    function buildWordForm(storyId) {
        const words = $.myApp.getWordsByStoryId(storyId) 
        const storyTitle = $.myApp.getStoryTitleById(storyId);
        const formFieldset = $('#word-inputs');

        if ($(formFieldset).children().length > 1) {
            $(formFieldset).empty();
        }

        $(formFieldset).append(
            `<input type="hidden" name="story-file" value="${storyTitle}">`
        );

        $.each(words, (i, word) => {
            $(formFieldset).append(
                `<input type="text" name="${word}" class="word-input" id="${word}" placeholder="${formatWordName(word)}">`
            );
        })
    }

    function submitWordForm() {
        let words = {}; 
        const wordFormInputs = $('#word-inputs').children();

        $.each(wordFormInputs, (i, input) => {
            words[$(input).attr('name')] = $(input).val();
            $(input).prop('disabled', true);
        })

        submitStoryData(words);
    }

    function displayStory(story) {
        const storyDisplay = $('#story-display');

        if (storyDisplay.children().length > 0) {
            storyDisplay.empty();
        } 

        $(storyDisplay).append(
            `<p class="story">${story}</p>`
        );
    }

    $('#words-submit-btn').click((e) => {
        e.preventDefault();
        submitWordForm();
    })

    // Run the app
    function run(data) {
        $.myApp.setStories(data);
        buildStoriesList();
    }

    fetchStories();
})
