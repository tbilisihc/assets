

// ---------------------

// The element where the links will be inserted
const fileListContainer = document.getElementById("file-links");

// Construct the GitHub API URL
const apiUrl = `https://api.github.com/repos/tbilisihc/assets/contents/assets`;

// The base URL for the links on your GitHub Pages site
const baseUrl = `https://tbilisi-hackclub.com/assets`;

// Function to fetch and display the file links
async function listFiles() {
  if (!fileListContainer) {
    console.error("Error: The element with ID 'file-links' was not found.");
    return;
  }

  try {
    // Fetch the list of files from the GitHub API
    const response = await fetch(apiUrl);

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(
        `GitHub API request failed: ${response.status} ${response.statusText}`
      );
    }

    const files = await response.json();

    // Create an unordered list to hold the links
    const ul = document.createElement("ul");

    // Loop through each item in the directory
    for (const item of files) {
      // We only want to list files, not sub-directories
      if (item.type === "file") {
        // Create the list item and the link
        const li = document.createElement("li");
        const a = document.createElement("a");

        // The link text will be the filename (e.g., "image.png")
        a.textContent = item.name;

        // The link href will be the full URL to the file
        // item.path gives the full path from the repo root (e.g., "assets/logo/image.png")
        a.href = baseUrl + item.path;

        // Open the link in a new tab
        a.target = "_blank";
        a.rel = "noopener noreferrer";

        li.appendChild(a);
        ul.appendChild(li);
      }
    }

    // Clear any previous content and add the new list
    fileListContainer.innerHTML = "";
    fileListContainer.appendChild(ul);
  } catch (error) {
    console.error("Error fetching file list:", error);
    fileListContainer.innerHTML =
      "<p>Error loading file list. See console for details.</p>";
  }
}

// Run the function when the page loads
listFiles();
