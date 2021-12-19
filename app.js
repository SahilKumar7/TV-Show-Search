const form = document.querySelector('#searchForm');
const listContainer = document.querySelector('#searchResults');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm }}

    const res = await axios.get('https://api.tvmaze.com/search/shows', config);

    listShows(res.data);

    console.log(res.data);
    form.elements.query.value = '';
})

const listShows = (shows) => {
    clearList();
    for (let obj of shows) {
        const column = document.createElement('div');
        column.classList.add('column', 'is-one-quarter');

        const card = document.createElement('div');
        card.classList.add('card');
        column.appendChild(card);

        const cardImage = document.createElement('div');
        cardImage.classList.add('card-image');
        card.appendChild(cardImage);

        const figure = document.createElement('figure');
        figure.classList.add('image', 'is-4by5');

        const img = document.createElement('img');
        img.setAttribute('alt', `${obj.show.name}`)

        if (obj.show.image) {
            img.src = obj.show.image.medium;
        } else {
            img.src = `https://via.placeholder.com/210x295.png?text=${obj.show.name}`
        }

        figure.appendChild(img);
        card.appendChild(figure);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        card.appendChild(cardContent);

        const media = document.createElement('div');
        media.classList.add('media');
        cardContent.appendChild(media);

        const mediaContent = document.createElement('div');
        mediaContent.classList.add('media-content');
        media.appendChild(mediaContent);

        const showTitle = document.createElement('p');
        showTitle.classList.add('title', 'is-4', 'mb-0');
        showTitle.textContent = `${obj.show.name}`;
        mediaContent.appendChild(showTitle);

        const mediaInnerContent = document.createElement('div');
        mediaInnerContent.classList.add('content');

        const mediaRating = document.createElement('div');
        mediaRating.classList.add('my-2');

        const rating = document.createElement('progress');
        rating.setAttribute('id', 'rating');
        rating.setAttribute('value', `${Math.round(obj.score * 100)}`);
        rating.setAttribute('max', '100');
        rating.textContent = `${(obj.score * 10).toFixed(2)}`;
        rating.classList.add('progress', 'is-warning', 'is-medium', 'my-1');

        const ratingLabel = document.createElement('label');
        ratingLabel.setAttribute('for', 'rating');
        ratingLabel.classList.add('label');
        ratingLabel.innerHTML = `<span class="pt-2 mt-4">Score:</span> <span class="button is-small is-rounded is-warning">${(obj.score * 10).toFixed(2)} / 10</span>`;

        mediaRating.appendChild(rating);
        mediaRating.appendChild(ratingLabel);
        mediaContent.appendChild(mediaRating);

        for (let genre of obj.show.genres) {
            const genreTag = document.createElement('p');
            genreTag.classList.add('subtitle', 'button', 'is-small', 'is-rounded', 'is-info');
            genreTag.textContent = `${genre}`;

            mediaInnerContent.appendChild(genreTag);
        }

        mediaContent.appendChild(mediaInnerContent);

        listContainer.append(column);
    }
}

const clearList = () => {
    listContainer.replaceChildren();
}

// For Bulma Navbar Hamburger 
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
});