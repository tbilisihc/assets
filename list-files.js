// --- CONFIGURATION ---
// 1. Your GitHub username
const GITHUB_USERNAME = "tbilisihc";

// 2. Your repository name
const GITHUB_REPONAME = "assets";

// 3. The path to the PARENT folder you want to scan for subfolders
const ROOT_FOLDER_PATH = "assets";
// ---------------------

// The element where the links will be inserted
const container = document.getElementById("file-links");

// The base URL for the file links on your GitHub Pages site
const baseUrl = `https://tbilisi.hackclub.com/assets/`;

/**
 * Fetches the contents of a specific folder from the GitHub API.
 * @param {string} path - The path to the folder in the repository.
 * @returns {Promise<Array>} A promise that resolves to an array of items in the folder.
 */
async function fetchFolderContents(path) {
  const apiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPONAME}/contents/${path}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(
      `GitHub API request for ${path} failed: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
}

/**
 * The main function to discover folders and list files within them.
 */
async function listAllFiles() {
  if (!container) {
    console.error(
      "Error: The container element with ID 'file-links' was not found."
    );
    return;
  }
  container.innerHTML = "<p>Loading file lists...</p>"; // Show a loading message

  try {
    // 1. Get the list of all items (files and folders) in the root 'assets' directory
    const rootItems = await fetchFolderContents(ROOT_FOLDER_PATH);

    // 2. Filter that list to get only the directories
    const subfolders = rootItems.filter((item) => item.type === "dir");

    // Clear the loading message
    container.innerHTML = "";

    if (subfolders.length === 0) {
      container.innerHTML = `<p>No subfolders found in the '${ROOT_FOLDER_PATH}' directory.</p>`;
      return;
    }

    // 3. Loop through each subfolder and get its contents
    for (const folder of subfolders) {
      // Create a heading for the folder
      const heading = document.createElement("h3");
      heading.textContent = folder.name; // e.g., "logo" or "icons"
      container.appendChild(heading);

      // Fetch the files inside this specific subfolder
      const files = await fetchFolderContents(folder.path);

      // Create a list for the files
      const ul = document.createElement("ul");

      const fileItems = files.filter((item) => item.type === "file");

      if (fileItems.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No files in this folder.";
        ul.appendChild(li);
      } else {
        // Loop through the files and create the links
        for (const file of fileItems) {
          const li = document.createElement("li");
          const a = document.createElement("a");

          a.textContent = file.name;
          a.href = baseUrl + file.path; // The href is the full path from the repo root
          a.target = "_blank";
          a.rel = "noopener noreferrer";

          li.appendChild(a);
          ul.appendChild(li);
        }
      }
      container.appendChild(ul);
    }
  } catch (error) {
    console.error("Error during file discovery:", error);
    container.innerHTML =
      "<p>Error loading file list. See console for details.</p>";
  }
}

// Run the main function when the page loads
listAllFiles();
