(class BaseCard extends MinzeElement {
    link = '#';
    name = 'Test';

    data = App.data;

    html = () => `
        <a part="card chapter-card" href="${this.link}">
            <div part="card-title">
                <h1 part="project-title">${this.name}</h1>
            </div>
        </a>
    `;

}).define();

