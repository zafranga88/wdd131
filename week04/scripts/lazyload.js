document.getElementById('currentYear').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('last-modified').textContent = 
        `Last Modified: ${document.lastModified}`;
});
