document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wishlist-form');
    const wishlist = document.getElementById('wishlist');
    const projectNameInput = document.getElementById('project-name');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const projectName = projectNameInput.value.trim();
        if (projectName) {
            const currentDate = new Date().toLocaleDateString();
            const projectData = { name: projectName, date: currentDate };
            addProjectToList(projectData);
            saveProjectToLocalStorage(projectData);
            projectNameInput.value = '';
        }
    });

    wishlist.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            const projectItem = e.target.parentElement;
            const projectName = projectItem.querySelector('.project-name').textContent;
            removeProjectFromList(projectItem);
            removeProjectFromLocalStorage(projectName);
        }
    });

    function addProjectToList(projectData) {
        const li = document.createElement('li');

        const nameSpan = document.createElement('span');
        nameSpan.textContent = projectData.name;
        nameSpan.className = 'project-name';

        const dateSpan = document.createElement('span');
        dateSpan.textContent = `${projectData.date}`;
        dateSpan.className = 'project-date';

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';

        li.appendChild(nameSpan);
        li.appendChild(dateSpan);
        li.appendChild(removeButton);

        wishlist.appendChild(li);
    }

    function saveProjectToLocalStorage(projectData) {
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.push(projectData);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    function loadProjectsFromLocalStorage() {
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.forEach(project => {
            addProjectToList(project);
        });
    }

    function removeProjectFromList(listItem) {
        listItem.remove();
    }

    function removeProjectFromLocalStorage(projectName) {
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects = projects.filter(project => project.name !== projectName);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    loadProjectsFromLocalStorage();
});
