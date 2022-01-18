export default function renderCardAnimals(imagas) {
  const markup = imagas
    .map(imege => {
      return `<a href='${imege.largeImageURL}'<div class="photo-card">
                <img src="${imege.webformatURL}" alt="${imege.tags}" loading="lazy" width="300" height="200"/>
                  <div class="info">
                      <p class="info-item">
                        <b>Likes</b>
                        ${imege.likes}
                      </p>
                      <p class="info-item">
                        <b>Views</b>
                        ${imege.views}
                      </p>
                      <p class="info-item">
                        <b>Comments</b>
                        ${imege.comments}
                      </p>
                      <p class="info-item">
                        <b>Downloads</b>
                        ${imege.downloads}
                      </p>
                  </div>
              </div></a>`;
    })
    .join('');
  return markup;
}