document.addEventListener("projectsLoaded", search);
function search() {
    console.log("Search function initialized");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const projects = document.querySelectorAll(".project-block strong, .project-block p");
    console.log(projects);

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        console.log("Performing search for:", query);
        projects.forEach(project => {
            const text = project.textContent.toLowerCase();
            console.log("Checking project:", text);
            project.style.display = text.includes(query) ? "block" : "none";
            console.log("Searched for:", query);
        });
    }
    searchButton.addEventListener("click", performSearch);
    searchInput.addEventListener("input", performSearch);
}

