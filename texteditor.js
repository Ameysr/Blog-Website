function formatDoc(cmd, value=null) {
	if(value) {
		document.execCommand(cmd, false, value);
	} else {
		document.execCommand(cmd);
	}
}

function addLink() {
	const url = prompt('Insert url');
	formatDoc('createLink', url);
}


const content = document.getElementById('content');

content.addEventListener('mouseenter', function () {
	const a = content.querySelectorAll('a');
	a.forEach(item=> {
		item.addEventListener('mouseenter', function () {
			content.setAttribute('contenteditable', false);
			item.target = '_blank';
		})
		item.addEventListener('mouseleave', function () {
			content.setAttribute('contenteditable', true);
		})
	})
})


const showCode = document.getElementById('show-code');
let active = false;

showCode.addEventListener('click', function () {
	showCode.dataset.active = !active;
	active = !active
	if(active) {
		content.textContent = content.innerHTML;
		content.setAttribute('contenteditable', false);
	} else {
		content.innerHTML = content.textContent;
		content.setAttribute('contenteditable', true);
	}
})



const filename = document.getElementById('filename');

function fileHandle(value) {
	if(value === 'new') {
		content.innerHTML = '';
		filename.value = 'untitled';
	} else if(value === 'txt') {
		const blob = new Blob([content.innerText])
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a');
		link.href = url;
		link.download = `${filename.value}.txt`;
		link.click();
	} else if(value === 'pdf') {
		html2pdf(content).save(filename.value);
	}
}

// File handling
function fileHandle(value) {
    if (value === 'new') {
        content.innerHTML = '';
        filename.value = 'untitled';
    } else if (value === 'txt') {
        const blob = new Blob([content.innerText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename.value}.txt`;
        link.click();
    } else if (value === 'pdf') {
        html2pdf(content).save(filename.value);
    }
}

// Insert image from file
document.getElementById('insertimgfile').addEventListener('click', () => {
    document.getElementById('imgfile').click();
});

document.getElementById('imgfile').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            insertImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Insert video from file
document.getElementById('insertvideofile').addEventListener('click', () => {
    const videoFileInput = document.createElement('input');
    videoFileInput.type = 'file';
    videoFileInput.accept = 'video/*';
    videoFileInput.style.display = 'none';

    document.body.appendChild(videoFileInput);
    videoFileInput.click();

    videoFileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                insertVideo(e.target.result);
            };
            reader.readAsDataURL(file);
        }
        document.body.removeChild(videoFileInput);
    });
});

// Function to insert an image
function insertImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    content.appendChild(img);
}

// Function to insert a video
function insertVideo(src) {
    const video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.style.maxWidth = '100%';
    video.style.height = 'auto';
    content.appendChild(video);
}

// schdule time 
const publishButton = document.getElementById('publish');
const popup = document.getElementById('popup');

// Dynamically create and style the overlay
const overlay = document.createElement('div');
overlay.id = 'overlay';
overlay.style.position = 'fixed';
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
overlay.style.zIndex = 999; 
overlay.style.display = 'none';
overlay.style.opacity = 0;
overlay.style.transition = 'opacity 0.5s ease';
document.body.appendChild(overlay); 

// Toggle function for popup and overlay
function togglePopup() {
    const isVisible = popup.classList.contains('show');

    if (isVisible) {
        // Hide popup and overlay
        popup.classList.remove('show');
        overlay.style.opacity = 0;
        setTimeout(() => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        }, 500); // Wait for the fade-out to finish
    } else {
        // Show popup and overlay
        overlay.style.display = 'block';
        popup.style.display = 'block';
        setTimeout(() => {
            overlay.style.opacity = 1;
            popup.classList.add('show');
        }, 10); // Small delay for smooth transitions
    }
}

// Add click event listeners
publishButton.addEventListener('click', togglePopup);

// Hide popup when clicking on the overlay
overlay.addEventListener('click', togglePopup);


// Handle blog submission
document.getElementById('blogForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    // Fetch blog details
    const title = document.getElementById('title').value;
    const blogContent = document.getElementById('content').innerHTML;
    const scheduleDate = document.getElementById('scheduleDate').value;

    // Fetch selected tags
    const selectedTags = Array.from(document.querySelectorAll('.tag-badge')).map(tag => tag.textContent.replace('x', '').trim());

    if (title && scheduleDate) {
        const publishedDate = new Date(scheduleDate).toLocaleString([], {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });

        // Save blog to localStorage
        const blog = { title, scheduleDate: publishedDate, blogContent, tags: selectedTags };
        const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        storedBlogs.push(blog);
        localStorage.setItem('blogs', JSON.stringify(storedBlogs));

        // Display blogs
        displayBlogs();

        // Clear the form and close popup
        document.getElementById('title').value = '';
        document.getElementById('scheduleDate').value = '';
        document.getElementById('content').innerHTML = '';
        selectedTagsContainer.innerHTML = ''; // Clear selected tags
        togglePopup();
    } else {
        alert('Please fill out all fields!');
    }
});


// Display blogs from localStorage
function displayBlogs() {
    const blogsContainer = document.getElementById('blogsContainer');
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];

    blogsContainer.innerHTML = ''; // Clear existing blogs
    storedBlogs.forEach(blog => {
        const blogDiv = document.createElement('div');
        blogDiv.className = 'blog';
        blogDiv.innerHTML = `
            <h3>${blog.title}</h3>
            <p>Content: ${blog.blogContent}</p>
            <p>Scheduled at: ${blog.scheduleDate}</p>
            <p>Tags: ${blog.tags && blog.tags.length > 0 ? blog.tags.join(', ') : 'No tags selected'}</p>
        `;
        blogsContainer.appendChild(blogDiv);
    });
}


// Load blogs on page load
window.onload = displayBlogs;

// scheduel funtion

const tags = [
    "Technology",
    "Culture",
    "Business",
    "Politics",
    "Finance",
    "Sports",
    "Arts",
    "Travel"
];

const tagOptionsContainer = document.getElementById('tag-options');
const selectedTagsContainer = document.getElementById('selected-tags');

// Populate the tag options dynamically
tags.forEach(tag => {
    const tagButton = document.createElement('button');
    tagButton.textContent = tag;
    tagButton.classList.add('tag-button');
    tagButton.addEventListener('click', () => selectTag(tag)); // Add click event to select tag
    tagOptionsContainer.appendChild(tagButton);
});

// Function to handle tag selection
function selectTag(tag) {
    if (document.getElementById(`selected-${tag}`)) {
        return; 
    }

    // Create a badge for the selected tag
    const tagBadge = document.createElement('span');
    tagBadge.textContent = tag;
    tagBadge.id = `selected-${tag}`;
    tagBadge.classList.add('tag-badge');

    // Add a remove option to the badge
    const removeButton = document.createElement('button');
    removeButton.textContent = "x";
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', () => {
        tagBadge.remove(); // Remove the tag badge when clicked
    });

    tagBadge.appendChild(removeButton); 
    selectedTagsContainer.appendChild(tagBadge);
}
