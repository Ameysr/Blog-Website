// Retrieve blogs from localStorage or initialize as empty
const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];

// Separate published and draft blogs
const publishedBlogs = storedBlogs.filter(blog => blog.isPublished);
const draftBlogs = storedBlogs.filter(blog => !blog.isPublished);

// Function to display blogs in a specific container
function displayBlogs(containerId, blogs) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found.`);
        return;
    }

    container.innerHTML = ''; // Clear existing content

    blogs.forEach((blog, index) => {
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('blog');

        // Create and append blog elements
        blogDiv.innerHTML = `
            <div class="blogTitle">${blog.title || 'Untitled Blog'}</div>
            <div class="blogContent">${blog.blogContent || 'No content available'}</div>
            <div class="tags">Tags: ${
                blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0
                    ? blog.tags.join(', ')
                    : 'None'
            }</div>
            <div class="scheduledTime">Scheduled Time: ${blog.scheduleDate || 'No schedule time'}</div>
            ${
                !blog.isPublished
                    ? `<button onclick="publishBlog(${index})">Publish Now</button>`
                    : ''
            }
        `;
        container.appendChild(blogDiv);
    });
}

// Function to manually publish a blog
function publishBlog(index) {
    const draftBlog = draftBlogs[index];
    if (!draftBlog) {
        alert('Invalid blog index.');
        return;
    }

    // Move blog to published
    draftBlogs.splice(index, 1);
    draftBlog.isPublished = true;
    publishedBlogs.push(draftBlog);

    // Save updates to localStorage
    localStorage.setItem('blogs', JSON.stringify([...publishedBlogs, ...draftBlogs]));

    // Update displays
    displayBlogs('draftBlogs', draftBlogs);
    displayBlogs('publishedBlogs', publishedBlogs);

    alert(`Blog "${draftBlog.title}" has been published!`);
}

// Function to monitor and auto-publish scheduled blogs
function monitorDrafts() {
    setInterval(() => {
        const currentTime = new Date();

        draftBlogs.forEach((blog, index) => {
            const blogTime = new Date(blog.scheduleDate);
            if (blogTime <= currentTime) {
                const draftBlog = draftBlogs.splice(index, 1)[0];
                draftBlog.isPublished = true;
                publishedBlogs.push(draftBlog);

                // Save updates to localStorage
                localStorage.setItem('blogs', JSON.stringify([...publishedBlogs, ...draftBlogs]));

                alert(`Blog "${draftBlog.title}" has been automatically published!`);
            }
        });

        displayBlogs('draftBlogs', draftBlogs);
        displayBlogs('publishedBlogs', publishedBlogs);
    }, 30000); // Check every minute
}

// On page load, display initial blogs and start monitoring
window.onload = function () {
    displayBlogs('draftBlogs', draftBlogs);
    displayBlogs('publishedBlogs', publishedBlogs);
    monitorDrafts();
};


// note displaying function
const savedNote = localStorage.getItem('savedNote');
const displayNote = document.getElementById('display-note');

if (savedNote) {
    displayNote.textContent = savedNote;
} else {
    displayNote.textContent = "";
}

document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');

    // Retrieve notes from localStorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    if (notes.length === 0) {
        notesContainer.innerHTML = '<p>No notes available. Add some notes to see them here.</p>';
    } else {
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <p>${note}</p>
                <button class="delete-note" data-index="${index}">Delete</button>
            `;
            notesContainer.appendChild(noteElement);
        });

        // Add delete functionality
        document.querySelectorAll('.delete-note').forEach((button) => {
            button.addEventListener('click', (e) => {
                const noteIndex = e.target.dataset.index;
                notes.splice(noteIndex, 1); // Remove the note
                localStorage.setItem('notes', JSON.stringify(notes)); // Update localStorage
                window.location.reload(); // Refresh the page
            });
        });
    }
});
