document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadJobs();

    $('#loginModal').on('hidden.bs.modal', () => {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('signupForm').style.display = 'none';
        document.querySelector('#loginModalLabel').textContent = 'Log In';
    });

    document.getElementById('loginForm').onsubmit = (event) => {
        event.preventDefault();
        // Add login logic here
        $('#loginModal').modal('hide');
    }

    document.getElementById('signupForm').onsubmit = (event) => {
        event.preventDefault();
        // Add signup logic here
        $('#loginModal').modal('hide');
    }

    document.getElementById('search').onkeypress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchJobs(document.getElementById('search').value);
        }
    }
});

function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
    document.querySelector('#loginModalLabel').textContent = 'Sign Up';
}

function toggleCategories() {
    const categoryList = document.getElementById('categoryList');
    if (categoryList.style.display === 'none' || categoryList.style.display === '') {
        categoryList.style.display = 'block';
    } else {
        categoryList.style.display = 'none';
    }
}

async function loadCategories() {
    try {
        const response = await fetch('https://api.adzuna.com/v1/api/jobs/gb/categories?app_id=bd7d11a7&app_key=78faee5dc49e670745389f121ef282f7');
        const data = await response.json();
        const categoryList = document.getElementById('categoryList');
        categoryList.innerHTML = '';
        data.results.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.label;
            button.onclick = () => searchJobs(category.label);
            categoryList.appendChild(button);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

async function loadJobs() {
    try {
        const response = await fetch('https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=bd7d11a7&app_key=78faee5dc49e670745389f121ef282f7');
        const data = await response.json();
        const jobList = document.getElementById('jobList');
        jobList.innerHTML = '';
        data.results.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.className = 'job';
            jobElement.innerHTML = `
                <h2>${job.title}</h2>
                <p>${job.description}</p>
                <a href="${job.redirect_url}" target="_blank">in more detail...</a>
            `;
            jobList.appendChild(jobElement);
        });
    } catch (error) {
        console.error('Error loading jobs:', error);
    }
}

async function searchJobs(query) {
    try {
        const response = await fetch(`https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=bd7d11a7&app_key=78faee5dc49e670745389f121ef282f7&what=${encodeURIComponent(query)}`);
        const data = await response.json();
        const jobList = document.getElementById('jobList');
        jobList.innerHTML = '';
        data.results.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.className = 'job';
            jobElement.innerHTML = `
                <h2>${job.title}</h2>
                <p>${job.description}</p>
                <a href="${job.redirect_url}" target="_blank">Daha ətraflı</a>
            `;
            jobList.appendChild(jobElement);
        });
    } catch (error) {
        console.error('Error searching jobs:', error);
    }
}
