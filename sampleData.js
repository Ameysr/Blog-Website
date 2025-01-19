// Categories
const categories = [
    "Technology",
    "Culture",
    "Business",
    "Politics",
    "Finance",
    "Sports",
    "Arts",
    "Travel"
];

// Function to generate random data for blogs
function generateBlogs() {
    const blogs = []; // Array to store all blog objects
    const userNames = ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona"];
    const sampleContents = [
        "In the rapidly evolving world of technology, staying updated with the latest trends is crucial. From artificial intelligence to blockchain, technological advancements are shaping industries and improving lives every day.",
        "Culture is the thread that binds societies together, showcasing their traditions, art, and values. Exploring different cultures provides insights into diverse ways of life, encouraging empathy and global understanding.",
        "Business strategies have transformed with globalization and digitalization. Today, innovative startups and established corporations alike are focusing on sustainable practices and customer-centric models.",
        "Politics, a dynamic and often polarizing field, plays a significant role in shaping the future of nations. Engaging in political discourse can lead to more informed citizens and stronger democracies.",
        "Finance is not just about numbers; it's about planning and foresight. Effective financial management empowers individuals and organizations to achieve their goals and adapt to economic changes.",
        "Sports are more than just games; they're a way of life. They teach discipline, teamwork, and perseverance while bringing people together to celebrate victories and overcome challenges.",
        "Art is a universal language, transcending boundaries and inspiring people worldwide. From classical paintings to modern installations, art has the power to evoke emotions and provoke thought.",
        "Travel broadens horizons, offering new perspectives and unforgettable experiences. Whether exploring bustling cities or serene landscapes, travel enriches the soul and creates lasting memories.",
        "Technology impacts our lives daily.",
        "Traveling teaches us life lessons."
    ];

    const sampleImages = [
        "https://via.placeholder.com/150?text=Tech",
        "https://via.placeholder.com/150?text=Culture",
        "https://via.placeholder.com/150?text=Business",
        "https://via.placeholder.com/150?text=Politics",
        "https://via.placeholder.com/150?text=Finance",
        "https://via.placeholder.com/150?text=Sports",
        "https://via.placeholder.com/150?text=Arts",
        "https://via.placeholder.com/150?text=Travel"
    ];

    // Iterate over each category and create six blogs for each
    categories.forEach((category, index) => {
        for (let i = 0; i < 6; i++) {
            const blog = {
                category: category,
                userName: userNames[i % userNames.length],
                content: sampleContents[(i + index) % sampleContents.length], // Cycle through sampleContents
                image: sampleImages[index % sampleImages.length],
                likeCount: 0 // Initialize with 0 likes
            };
            blogs.push(blog);
        }
    });

    return blogs;
}

// Generate the blogs
const blogData = generateBlogs();

// Log the data for verification
console.log(blogData);
