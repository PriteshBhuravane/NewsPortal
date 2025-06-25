# NewsPortal Project

## Overview
This project is a news portal application built using React. It allows users to view news articles, save their favorite articles, and manage their preferences through a user-friendly interface.

## Project Structure
The project has the following structure:

```
NewsPortal
├── src
│   ├── App.css               # CSS styles for the application
│   ├── App.jsx               # Main application component with routing
│   ├── index.css             # Tailwind CSS directives
│   ├── main.jsx              # Entry point of the application
│   ├── assets                # Directory for image assets
│   ├── componets             # Directory for React components
│   ├── context               # Directory for context files
│   └── firebase              # Directory for Firebase setup files
├── .env                      # Environment variables for API keys
├── .gitignore                # Specifies files to be ignored by Git
└── README.md                 # Documentation for the project
```

## Features
- **User Authentication**: Users can sign in using Google authentication.
- **Favorites Management**: Users can save and remove their favorite articles.
- **Responsive Design**: The application is designed to be responsive and user-friendly across devices.

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd NewsPortal
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
1. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=<your-api-key>
   VITE_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
   VITE_FIREBASE_PROJECT_ID=<your-project-id>
   VITE_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
   VITE_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
   VITE_FIREBASE_APP_ID=<your-app-id>
   VITE_NEWS_API_KEY=<your-news-api-key>
   ```
2. Start the development server:
   ```
   npm run dev
   ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.