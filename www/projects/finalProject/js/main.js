// Global App object
class App {
    library = [];

    setLibrary(data) {
        this.library = data;
    }

    getLibrary() {
        return this.library;
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
    const $libraryBody = $('#library-content');

    // Grab all of the stories to display
    function getUrl() {
        const host = $(location).attr('host');
        const pathname = $(location).attr('pathname');
        
        return `${pathname}api/index.php`
    }

    function fetchStories() {
        const url = `${getUrl()}/books/get`;
        $.ajax({
            url: url,
        }).done((data) => {
            run(data);
        });
    }

    function buildLibrary() {
        let library = $.myApp.getLibrary();

        $.each(library, (i, book) => {
            $libraryBody.append(
                `<tr class="book">
                    <td class="book-title">${book.title}</td>
                    <td class="book-author-name">${book.author_last_name}, ${book.author_first_name}</td>
                    <td class="book-genre">${book.genre_title}</td>
                    <td class="book-description">${book.description}</td>
                    <td class="book-page-count">${book.page_count}</td>
                    <td class="book-read">${book.read ? 'yes' : 'no'}</td>
                    <td class="book-actions">
                        <iconify-icon icon="bxs:pencil" class="book-edit"></iconify-icon>
                        <iconify-icon icon="bxs:trash" class="book-delete"></iconify-icon>
                    </td>
                </tr>
                `
            )
            console.log(book);
        });
    }

    // Run the app
    function run(data) {
        console.log(data);
        $.myApp.setLibrary(data);
        buildLibrary();
    }

    fetchStories();
})
