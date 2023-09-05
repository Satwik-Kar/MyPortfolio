



const USERNAME = 'Satwik-Kar'

const ACCESS_TOKEN_ENCODED = 'tuc_u69qARKLS3U0loGxt2pWUVhKqbTD9t1TeI4q'



function encodeROT13(inputString) {
    return inputString.replace(/[a-zA-Z]/g, function (char) {
        const base = char <= 'Z' ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
        return String.fromCharCode(base + ((char.charCodeAt(0) - base + 13) % 26));
    });
}
function decodeROT13(encodedString) {
    return encodeROT13(encodedString);
}
const ACCESS_TOKEN = decodeROT13(ACCESS_TOKEN_ENCODED)
const apiUrl = 'https://api.github.com/users/'+USERNAME+'/repos';
async function fetchGitHubRepositories() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `token ${ACCESS_TOKEN}`,
            },
        });

        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const data = await response.json();

        const projectList = document.getElementById('project_list')

        data.forEach((repository) => {
            const listItem = document.createElement('li');

            listItem.innerHTML = `
               <a href="${repository.html_url}"> <strong style="font-size: 24px;font-weight: bold;color: white">${repository.name}</strong> </a>

                <p style="font-size: 14px;color: white">${repository.description || ''}</p>
            `;


            projectList.appendChild(listItem);

        });


    } catch (error) {
        console.error(`Error fetching GitHub repositories: ${error.message}`);
    }
}

fetchGitHubRepositories();
