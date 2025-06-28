# Tbilisi Hack Club Assets

A simple, fast, and lightweight assets browser for [Tbilisi Hack Club](https://tbilisi.hackclub.com/).

## 🚀 About The Project

This repository serves two primary purposes:

1. It stores all the static assets (images, documents, etc.) used across the Tbilisi Hack Club digital properties.

2. It hosts a simple web interface that dynamically lists all available assets and provides direct links to them.

The goal is to have a centralized, easy-to-browse location for all our digital materials.

### Built With

The project is intentionally lightweight, relying on fundamental web technologies and a powerful CSS framework.

## ⚙️ Functionality

The core functionality of the web interface is straightforward:

1. **File Discovery:** On page load, a JavaScript script makes a request to the GitHub API (`Octocat`) to scan the contents of the `/assets/` directory in this repository.

2. **Dynamic List:** The script then dynamically populates a selection dropdown with the full path of every file it finds.

3. **Direct Redirect:** When a user clicks on a file from the list, the page immediately redirects to the asset's direct URL, hosted on our website. The URL structure is:

   ```
   https://tbilisi.hackclub.com/assets/assets/<folder-name>/<filename.extension>
   
   ```

This provides a permanent and easy-to-remember link for every asset.

## 📂 Folder Structure

All assets should be placed inside the top-level `/assets` directory. It is recommended to create sub-directories within `/assets` to keep resources organized.

```
/
├── assets/
│   ├── logos/
│   │   ├── icon.png
│   │   └── full_logo.svg
│   ├── events/
│   │   ├── event_poster_2024.jpg
│   └── documents/
│       └── info.pdf
├── index.html
└── README.md

```

## 🤝 Contributing

Contributions are welcome! If you want to add an asset, please follow these steps:

1. Fork the Project

2. Create your Feature Branch (`git checkout -b feature/AddAmazingAsset`)

3. Place your new asset in the appropriate sub-folder within `/assets/`.

4. Commit your Changes (`git commit -m 'Add some AmazingAsset'`)

5. Push to the Branch (`git push origin feature/AddAmazingAsset`)

6. Open a Pull Request

Please ensure your assets are optimized for the web where possible.
