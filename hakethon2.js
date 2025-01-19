// Select elements
const openButton = document.querySelector('[data-open-button="notes-pop"]');
const closeButtons = document.querySelectorAll('[data-close-button]'); // Select all close buttons
const notesPopup = document.getElementById('notes-pop');
const overlay = document.getElementById('overlay');
const searchBar = document.getElementById('searchBar');
const menus = document.getElementsByClassName('menu'); // This gives an HTMLCollection
const textarea = document.getElementById('note-textarea');

// Function to open the popup and overlay
function openPopup() {
    notesPopup.classList.add('active');
    overlay.classList.add('active');
}

// Function to close the popup and overlay
function closePopup() {
    notesPopup.classList.remove('active');
    overlay.classList.remove('active');
}

// Open the popup
if (openButton) {
    openButton.addEventListener('click', openPopup);
}

// Close the popup when clicking any close button
if (closeButtons) {
    closeButtons.forEach(button => {
        button.addEventListener('click', closePopup);
    });
}

// Close the popup when clicking outside the menu
document.addEventListener('click', (event) => {
    const isClickInsidePopup = notesPopup.contains(event.target); 
    const isClickInsideOpenButton = openButton.contains(event.target); 

    if (!isClickInsidePopup && !isClickInsideOpenButton) {
        closePopup();
    }
});

// Close the popup when clicking on the overlay
if (overlay) {
    overlay.addEventListener('click', closePopup);
}

// Adjust the height of the textarea dynamically
if (textarea) {
    textarea.addEventListener('input', function () {
        this.style.height = 'auto'; 
        this.style.height = this.scrollHeight + 'px'; 
    });
}

// Function to handle menu opacity based on screen width
function handleMenuOpacity() {
    if (window.innerWidth <= 480) {
        if (searchBar) searchBar.style.display = 'block';
        Array.from(menus).forEach(menu => {
            menu.style.opacity = '0'; 
        });
    } else {
        if (searchBar) searchBar.style.display = 'none';
        Array.from(menus).forEach(menu => {
            menu.style.opacity = '1';
        });
    }
}

// Initial check
handleMenuOpacity();

// Add an event listener to handle window resizing
window.addEventListener('resize', handleMenuOpacity);

const humbergerIcon = document.getElementById('humbergerIcon');
const dashbord = document.getElementById('dashbord');
const searchIcon = document.getElementById('searchBar');
const menu = document.getElementById('mobileMenu');

// Function to adjust layout and visibility dynamically
const adjustLayout = () => {
    if (window.innerWidth <= 480) {
        dashbord.style.display = 'block';
        searchIcon.style.display = 'block';
        humbergerIcon.style.display = 'block'; 
    } else {
        dashbord.style.display = 'none';
        searchIcon.style.display = 'none';
        humbergerIcon.style.display = 'none';
    }
};

// Event listener for humbergerIcon click
humbergerIcon.addEventListener('click', () => {
    const isMenuOpen = menu.style.bottom === '0px';
    menu.style.bottom = isMenuOpen ? '-100%' : '0px';
});

// Adjust layout on page load and window resize
adjustLayout();
window.addEventListener('resize', adjustLayout);




// Function to handle the menu's visibility based on screen size
function handleMenuVisibility() {
    const menu = document.getElementById('menu');

    if (window.innerWidth < 480) {
        if (menu) {
            menu.remove(); 
        }
    } else {
        if (!document.getElementById('menu')) {
            // Recreate the menu if it doesn't exist
            const newMenu = document.createElement('div');
            newMenu.id = 'menu';
            newMenu.className = 'menu';
            newMenu.innerHTML = `
                <!-- Recreate menu content here -->
                <div>Menu Item 1</div>
                <div>Menu Item 2</div>
                <div>Menu Item 3</div>
            `;
            document.body.appendChild(newMenu); // Append the menu to the body
        }
    }
}

// Run the function on page load and resize
window.addEventListener('resize', handleMenuVisibility);
window.addEventListener('DOMContentLoaded', handleMenuVisibility);



// removes focus of textarea 
document.querySelector('.notescontent textarea').addEventListener('focus', function(e) {
    e.target.style.outline = 'none'; // Removes the focus outline dynamically
});

// notes pop up 
const overlayNotes = document.getElementById('overlay');
const popup = document.getElementById('notes-pop');
const publishButton = document.getElementById('publishButton');
const closeButtonsNotes = document.querySelectorAll('.closebutton');

// Toggle function to show and hide the popup
function togglePopup() {
    const isVisible = popup.classList.contains('active');

    if (isVisible) {
        // Hide popup and overlay
        popup.classList.remove('active');
        overlayNotes.classList.remove('active');
    } else {
        // Show popup and overlay
        overlayNotes.classList.add('active');
        popup.classList.add('active');
    }
}

// Show popup when clicking on the publish button
publishButton.addEventListener('click', togglePopup);

// Hide popup when clicking on any close button
closeButtonsNotes.forEach(button => {
    button.addEventListener('click', togglePopup);
});

// Hide popup when clicking on the overlay
overlayNotes.addEventListener('click', togglePopup);
// decktop end 

// mobile view 
document.addEventListener('DOMContentLoaded', () => {
    const overlayNotesM = document.getElementById('overlayM');
    const popupM = document.getElementById('notes-popM');
    const closeButtonsNotesM = document.querySelectorAll('.closebuttonM');
    const notesMenuItemM = document.getElementById('notesMenuItemM');

    if (!notesMenuItemM) {
        console.error("notesMenuItemM is not defined or missing in HTML.");
        return;
    }

    // Toggle function to show and hide the popup
    function togglePopupM() {
        const isVisible = popupM.classList.contains('active');

        if (isVisible) {
            popupM.classList.remove('active');
            overlayNotesM.classList.remove('active');
        } else {
            overlayNotesM.classList.add('active');
            popupM.classList.add('active');
        }
    }

    notesMenuItemM.addEventListener('click', togglePopupM);

    closeButtonsNotesM.forEach(button => {
        button.addEventListener('click', togglePopupM);
    });

    overlayNotesM.addEventListener('click', togglePopupM);
});

document.querySelector('.notescontentM textarea').addEventListener('focus', function(e) {
    e.target.style.outline = 'none'; // Removes the focus outline dynamically
});


// blog data
      document.addEventListener('DOMContentLoaded', function() {
        const blogData = [
            {
              category: "Culture",
              blogs: [
                { userName: "Amey", content: "Culture is the thread that binds societies together. Diverse cultures enrich our global perspective. Festivals are a celebration of culture and community. Diverse cultures enrich our global perspective.", image: "c1.jpg", likeCount: 0 },
                { userName: "Jit", content: "Art, music, and traditions define the essence of humanity. Diverse cultures enrich our global perspective. Festivals are a celebration of culture and community. Diverse cultures enrich our global perspective.", image: "c2.jpg", likeCount: 0 },
                { userName: "Saurav", content: "Diverse cultures enrich our global perspective. Language bridges the gap between different cultures. Festivals are a celebration of culture and community. Diverse cultures enrich our global perspective.", image: "c3.jpg", likeCount: 0 },
                { userName: "Ayush", content: "Cultural exchanges encourage empathy and understanding. Festivals are a celebration of culture and community. Festivals are a celebration of culture and community. Diverse cultures enrich our global perspective.", image: "c4.jpg", likeCount: 0 },
                { userName: "Rohit", content: "Festivals are a celebration of culture and community. Diverse cultures enrich our global perspective. Festivals are a celebration of culture and community. Diverse cultures enrich our global perspective.", image: "c5.jpg", likeCount: 0 },
                { userName: "Sonu", content: "Language bridges the gap between different cultures. Culture is the thread that binds societies together. Culture is the thread that binds societies together. Diverse cultures enrich our global perspective.", image: "c6.jpg", likeCount: 0 },
              ],
            },
            {
              category: "Business",
              blogs: [
                { userName: "Amey", content: "Business strategies have transformed with globalization. Customer-centric models are the key to brand loyalty.", image: "b1.jpg", likeCount: 0 },
                { userName: "Jit", content: "Sustainable practices lead to long-term success in business. Digital marketing is the future of advertising Business strategies have transformed with globalization. Customer-centric models are the key to brand loyalty.", image: "b2.jpg", likeCount: 0 },
                { userName: "Saurav", content: "Startups are reshaping the global business landscape. Customer-centric models are the key to brand loyalty. E-commerce is revolutionizing the way we shop. Digital marketing is the future of advertising", image: "b3.jpg", likeCount: 0 },
                { userName: "Ayush", content: "Customer-centric models are the key to brand loyalty. E-commerce is revolutionizing the way we shop. E-commerce is revolutionizing the way we shop. Digital marketing is the future of advertising", image: "b4.jpg", likeCount: 0 },
                { userName: "Rohit", content: "E-commerce is revolutionizing the way we shop. Digital marketing is the future of advertising E-commerce is revolutionizing the way we shop. Digital marketing is the future of advertising", image: "b5.jpg", likeCount: 0 },
                { userName: "Sonu", content: "Digital marketing is the future of advertising. Business strategies have transformed with globalization. Business strategies have transformed with globalization. Customer-centric models are the key to brand loyalty.", image: "b6.jpg", likeCount: 0 },
              ],
            },
            {
              category: "Politics",
              blogs: [
                { userName: "Amey", content: "Political systems shape the policies that govern our lives.", image: "p1.jpg", likeCount: 0 },
                { userName: "Jit", content: "Global cooperation is key to addressing climate change.", image: "p2.jpg", likeCount: 0 },
                { userName: "Saurav", content: "Elections empower citizens to have a say in their future.", image: "p3.jpg", likeCount: 0 },
                { userName: "Ayush", content: "Transparency in governance builds trust among people.", image: "p4.jpg", likeCount: 0 },
                { userName: "Rohit", content: "Diplomacy resolves conflicts and fosters peace.", image: "p5.jpg", likeCount: 0 },
                { userName: "Sonu", content: "Policy-making addresses pressing societal issues.", image: "p6.jpg", likeCount: 0 },
              ],
            },
            {
              category: "Finance",
              blogs: [
                { userName: "Amey", content: "Financial literacy is crucial for personal and economic growth.", image: "f1.jpg", likeCount: 0 },
                { userName: "Jit", content: "Investments drive wealth creation and economic stability.", image: "f2.jpg", likeCount: 0 },
                { userName: "Saurav", content: "The stock market reflects economic trends and growth.", image: "f3.jpg", likeCount: 0 },
                { userName: "Ayush", content: "Cryptocurrencies are reshaping the financial landscape.", image: "f4.jpg", likeCount: 0 },
                { userName: "Rohit", content: "Saving for retirement ensures a secure future.", image: "f5.jpg", likeCount: 0 },
                { userName: "Sonu", content: "Budgeting is key to managing personal finances effectively.", image: "f6.jpg", likeCount: 0 },
              ],
            },
            {
              category: "Arts",
              blogs: [
                { userName: "Amey", content: "Art is a timeless expression of human creativity.", image: "a1.jpg", likeCount: 0 },
                { userName: "Jit", content: "Painting captures emotions and moments in vibrant colors.", image: "a2.jpg", likeCount: 0 },
                { userName: "Saurav", content: "Photography freezes time and tells stories through visuals.", image: "a3.jpg", likeCount: 0 },
                { userName: "Ayush", content: "Theater brings characters and narratives to life.", image: "a4.jpg", likeCount: 0 },
                { userName: "Rohit", content: "Sculpture immortalizes ideas in three-dimensional forms.", image: "a5.jpg", likeCount: 0 },
                { userName: "Sonu", content: "Music transcends boundaries and unites people.", image: "a6.jpg", likeCount: 0 },
              ],
            },
          ];
    
        // Function to display blog data
        function displayBlogData() {
            const blogContainer = document.getElementById('blogs');
            blogData.forEach((categoryData) => {
                categoryData.blogs.forEach((blogItem, index) => {
                    const blog = document.createElement('div');
                    blog.classList.add('blog');
    
                    const blogHeader = document.createElement('div');
                    blogHeader.classList.add('blog-header');
                    blogHeader.innerText = blogItem.userName;
    
                    const blogContent = document.createElement('p');
                    blogContent.classList.add('blog-content');
                    blogContent.innerText = blogItem.content;
    
                    const image = document.createElement('img');
                    image.src = blogItem.image;
                    image.alt = 'Blog image';
    
                    const icons = document.createElement('div');
                    icons.classList.add('blog-icons');
                    icons.innerHTML = `
                        <i class="bx bx-like" title="Like"></i>
                        <i class="bx bx-comment" title="Comment"></i>
                        <i class="bx bx-bookmark" title="Bookmark"></i>
                    `;
    
                    blog.appendChild(blogHeader);
                    blog.appendChild(blogContent);
                    blog.appendChild(image);
                    blog.appendChild(icons);
    
                    blogContainer.appendChild(blog);
                });
            });
        }
    
        // Display the blog data initially
        displayBlogData();
    });
    
    document.addEventListener('DOMContentLoaded', () => {
       const blogData = [
            {
              category: "Culture",
              blogs: [
                { userName: "Amey", content: "Culture is the thread that binds societies together. Diverse cultures enrich our global perspective. Festivals are a celebration of culture and community. Diverse cultures enrich our global perspective.", image: "c1.jpg", likeCount: 0 },
                { userName: "Jit", content: "Art, music, and traditions define the essence of humanity. Diverse cultures enrich our global perspective. Festivals are a celebration of culture and community. Diverse cultures enrich our global perspective.", image: "c2.jpg", likeCount: 0 },
                { userName: "Saurav", content: "Diverse cultures enrich our global perspective. Language bridges the gap between different cultures. Festivals are a celebration of culture and community. Diverse cultures enrich our global perspective.", image: "c3.jpg", likeCount: 0 },
                { userName: "Ayush", content: "Cultural exchanges encourage empathy and understanding. Festivals are a celebration of culture and community. Festivals are a celebration of culture and community. Diverse cultures enrich our global perspective.", image: "c4.jpg", likeCount: 0 },
                { userName: "Rohit", content: "Festivals are a celebration of culture and community. Diverse cultures enrich our global perspective. Festivals are a celebration of culture and community. Diverse cultures enrich our global perspective.", image: "c5.jpg", likeCount: 0 },
                { userName: "Sonu", content: "Language bridges the gap between different cultures. Culture is the thread that binds societies together. Culture is the thread that binds societies together. Diverse cultures enrich our global perspective.", image: "c6.jpg", likeCount: 0 },
              ],
            },
            {
              category: "Business",
              blogs: [
                { userName: "Amey", content: "Business strategies have transformed with globalization. Customer-centric models are the key to brand loyalty.", image: "b1.jpg", likeCount: 0 },
                { userName: "Jit", content: "Sustainable practices lead to long-term success in business. Digital marketing is the future of advertising Business strategies have transformed with globalization. Customer-centric models are the key to brand loyalty.", image: "b2.jpg", likeCount: 0 },
                { userName: "Saurav", content: "Startups are reshaping the global business landscape. Customer-centric models are the key to brand loyalty. E-commerce is revolutionizing the way we shop. Digital marketing is the future of advertising", image: "b3.jpg", likeCount: 0 },
                { userName: "Ayush", content: "Customer-centric models are the key to brand loyalty. E-commerce is revolutionizing the way we shop. E-commerce is revolutionizing the way we shop. Digital marketing is the future of advertising", image: "b4.jpg", likeCount: 0 },
                { userName: "Rohit", content: "E-commerce is revolutionizing the way we shop. Digital marketing is the future of advertising E-commerce is revolutionizing the way we shop. Digital marketing is the future of advertising", image: "b5.jpg", likeCount: 0 },
                { userName: "Sonu", content: "Digital marketing is the future of advertising. Business strategies have transformed with globalization. Business strategies have transformed with globalization. Customer-centric models are the key to brand loyalty.", image: "b6.jpg", likeCount: 0 },
              ],
            },
            {
              category: "Politics",
              blogs: [
                { userName: "Amey", content: "Political systems shape the policies that govern our lives.", image: "p1.jpg", likeCount: 0 },
                { userName: "Jit", content: "Global cooperation is key to addressing climate change.", image: "p2.jpg", likeCount: 0 },
                { userName: "Saurav", content: "Elections empower citizens to have a say in their future.", image: "p3.jpg", likeCount: 0 },
                { userName: "Ayush", content: "Transparency in governance builds trust among people.", image: "p4.jpg", likeCount: 0 },
                { userName: "Rohit", content: "Diplomacy resolves conflicts and fosters peace.", image: "p5.jpg", likeCount: 0 },
                { userName: "Sonu", content: "Policy-making addresses pressing societal issues.", image: "p6.jpg", likeCount: 0 },
              ],
            },
            {
              category: "Finance",
              blogs: [
                { userName: "Amey", content: "Financial literacy is crucial for personal and economic growth.", image: "f1.jpg", likeCount: 0 },
                { userName: "Jit", content: "Investments drive wealth creation and economic stability.", image: "f2.jpg", likeCount: 0 },
                { userName: "Saurav", content: "The stock market reflects economic trends and growth.", image: "f3.jpg", likeCount: 0 },
                { userName: "Ayush", content: "Cryptocurrencies are reshaping the financial landscape.", image: "f4.jpg", likeCount: 0 },
                { userName: "Rohit", content: "Saving for retirement ensures a secure future.", image: "f5.jpg", likeCount: 0 },
                { userName: "Sonu", content: "Budgeting is key to managing personal finances effectively.", image: "f6.jpg", likeCount: 0 },
              ],
            },
            {
              category: "Arts",
              blogs: [
                { userName: "Amey", content: "Art is a timeless expression of human creativity.", image: "a1.jpg", likeCount: 0 },
                { userName: "Jit", content: "Painting captures emotions and moments in vibrant colors.", image: "a2.jpg", likeCount: 0 },
                { userName: "Saurav", content: "Photography freezes time and tells stories through visuals.", image: "a3.jpg", likeCount: 0 },
                { userName: "Ayush", content: "Theater brings characters and narratives to life.", image: "a4.jpg", likeCount: 0 },
                { userName: "Rohit", content: "Sculpture immortalizes ideas in three-dimensional forms.", image: "a5.jpg", likeCount: 0 },
                { userName: "Sonu", content: "Music transcends boundaries and unites people.", image: "a6.jpg", likeCount: 0 },
              ],
            },
          ];
        const blogContainer = document.getElementById('blogs'); 
        
        // Function to render blogs
        function renderBlogs(category) {
            const selectedCategory = blogData.find((data) => data.category === category);
            blogContainer.innerHTML = ""; 
    
            if (!selectedCategory) {
                blogContainer.innerHTML = "<p>No blogs available for this category.</p>";
                return;
            }
    
            selectedCategory.blogs.forEach((blogItem) => {
                // Create blog wrapper
                const blog = document.createElement('div');
                blog.classList.add('blog');
    
                const blogHeader = document.createElement('div');
                blogHeader.classList.add('blog-header');
                blogHeader.innerText = blogItem.userName;
    
                const blogContent = document.createElement('p');
                blogContent.classList.add('blog-content');
                blogContent.innerText = blogItem.content;
    
                const image = document.createElement('img');
                image.src = blogItem.image;
                image.alt = 'Blog image';
    
                const icons = document.createElement('div');
                icons.classList.add('blog-icons');
                icons.innerHTML = `
                    <i class="bx bx-like" title="Like"></i>
                    <i class="bx bx-comment" title="Comment"></i>
                    <i class="bx bx-bookmark" title="Bookmark"></i>
                `;
    
                blog.appendChild(blogHeader);
                blog.appendChild(blogContent);
                blog.appendChild(image);
                blog.appendChild(icons);
    
                blogContainer.appendChild(blog);
            });
          
        }
    
        // Add event listeners to the buttons
        document.querySelectorAll('#filter button').forEach((button) => {
            button.addEventListener('click', () => {
                const category = button.id; 
                renderBlogs(category);
            });
        });
    });
  
//  filter toggle 
document.addEventListener('DOMContentLoaded', () => {
    const filterToggle = document.getElementById('filter-toggle');
    const filter = document.getElementById('filter');

    // Toggle the display of filter buttons on click
    filterToggle.addEventListener('click', () => {
        filter.classList.toggle('show');
    });
});



// note save 
document.getElementById('save-note').addEventListener('click', () => {
    const noteContent = document.getElementById('note-textareaM').value;
    console.log("Note content:", noteContent);
    if (noteContent.trim() === "") {
        alert("Please write something before saving!");
        return;
    }
    localStorage.setItem('savedNote', noteContent);
    console.log("Note saved to localStorage:", noteContent);
    alert('Note saved successfully!');
});


// Save the note to localStorage
document.querySelector('.save').addEventListener('click', () => {
    const noteTextarea = document.getElementById('note-textarea');
    const noteContent = noteTextarea.value;

    if (noteContent) {
        // Save the note to localStorage
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteContent);
        localStorage.setItem('notes', JSON.stringify(notes));

        alert('Note saved successfully!');
        noteTextarea.value = ''; 
    } else {
        alert('Please write something before saving.');
    }
});
