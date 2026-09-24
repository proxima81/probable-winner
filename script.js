const repositoryList = document.querySelector("#repository-list");

function formatStars(stars) {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(stars);
}

function renderRepositories(repositories) {
  repositoryList.innerHTML = repositories.map((repository) => `
    <li class="repository">
      <h3><a href="${repository.url}" target="_blank" rel="noreferrer">${repository.owner}/${repository.name}</a></h3>
      <p>${repository.description}</p>
      <p class="repository-meta">
        <span>${repository.language}</span>
        <span>${formatStars(repository.stars)} stars</span>
      </p>
    </li>
  `).join("");
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Could not load repositories: ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    repositoryList.innerHTML = `<li class="status-message">${error.message}</li>`;
  }
}

loadRepositories();