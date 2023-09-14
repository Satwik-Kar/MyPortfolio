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
const apiUrl = 'https://api.github.com/users/' + USERNAME + '/repos';

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

var reloadLink = document.getElementById("reload-title");

reloadLink.onclick = function() {
    location.reload();
};
document.addEventListener("DOMContentLoaded", function () {
    var scrollButtonSkill = document.getElementById("skill_btn");
    var sectionToScrollSkill = document.getElementById("skill_section");
    scrollButtonSkill.addEventListener("click", function () {
        sectionToScrollSkill.scrollIntoView({behavior: "smooth"});
    });

    var scrollButtonHome = document.getElementById("home_btn");
    var sectionToScrollHome = document.getElementById("home_section");
    scrollButtonHome.addEventListener("click", function () {
        sectionToScrollHome.scrollIntoView({behavior: "smooth"});
    });

    var scrollButtonContact = document.getElementById("contact_btn");
    var sectionToScrollContact = document.getElementById("ccontact_section");
    scrollButtonContact.addEventListener("click", function () {
        sectionToScrollContact.scrollIntoView({behavior: "smooth"});
    });


    var scrollButtonAbout = document.getElementById("about_btn");
    var sectionToScrollAbout = document.getElementById("about-section");
    scrollButtonAbout.addEventListener("click", function () {
        sectionToScrollAbout.scrollIntoView({behavior: "smooth"});
    });
});
async function randomQuote() {
    const response = await fetch('https://api.quotable.io/random')
    const quote = await response.json()

    const title = document.getElementById('quote-title')
    const author = document.getElementById('quote-author')
    // Output the quote and author name
    title.innerText ="\""+ quote.content+"\""
    author.innerText = quote.author
}
randomQuote()
document.getElementById('contact-btn-done').addEventListener('click', function() {
    const recipient = 'satwik.k.2000@gmail.com';
    const subject = 'Purpose of meeting - ';
    const body =  document.getElementById("contact-input-body").innerText
    var emailLink = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject)+"&body="+body;

    window.location.href = emailLink;
});