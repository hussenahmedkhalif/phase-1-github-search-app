document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('github-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('search').value.trim();
        if (username) {
            searchUsers(username);
        }
    });

    function searchUsers(username) {
        const apiUrl = `https://api.github.com/search/users?q=${username}`;
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };

        fetch(apiUrl, {
            method: 'GET',
            headers: headers
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok: ' + response.statusText);
        })
        .then(data => {
            displayUsers(data.items);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    function displayUsers(users) {
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';

        users.forEach(user => {
            const userElement = document.createElement('li');
            userElement.innerHTML = `
                <h3>${user.login}</h3>
                <img src="${user.avatar_url}" alt="${user.login}" style="width: 100px; height: 100px;">
                <a href="${user.html_url}" target="_blank">View Profile</a>
                <button onclick="getUserRepos('${user.login}')">View Repositories</button>
            `;
            userList.appendChild(userElement);
        });
    }

    window.getUserRepos = function(username) {
        const apiUrl = `https://api.github.com/users/${username}/repos`;
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };

        fetch(apiUrl, {
            method: 'GET',
            headers: headers
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok: ' + response.statusText);
        })
        .then(data => {
            displayRepos(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    function displayRepos(repos) {
        const repoList = document.getElementById('repos-list');
        repoList.innerHTML = '';

        repos.forEach(repo => {
            const repoElement = document.createElement('li');
            repoElement.innerHTML = `
                <h4>${repo.name}</h4>
                <p>${repo.description || 'No description available'}</p>
                <a href="${repo.html_url}" target="_blank">View Repository</a>
            `;
            repoList.appendChild(repoElement);
        });
    }
});