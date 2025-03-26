# TaskBuddy

TaskBuddy is a simple task management web application that allows users to add, edit, delete, and filter tasks based on status, category, and due date. It also includes Google OAuth authentication for secure login.

## Features

✅ **Google OAuth Login** – Users can log in securely using Google authentication.
✅ **Add Task Modal** – A modal appears to add tasks with title, description, category, due date, and status.
✅ **Task List** – Tasks are categorized under "To-Do", "In Progress", and "Completed" sections.
✅ **Edit & Delete Tasks** – Users can modify task details or remove tasks.
✅ **Filters & Search** – Tasks can be filtered by category, due date, and searched by name.
✅ **Local State Management** – Uses React state to store tasks without backend integration.
✅ **Responsive Design** – The UI adapts to different screen sizes for better usability.

## Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/taskbuddy.git
cd taskbuddy
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```sh
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

### 4️⃣ Run the Application
```sh
npm start
```
The app will be available at `http://localhost:3000`

## Challenges Faced & Solutions

### 🔹 Google OAuth Setup Issue (401: invalid_client)
- **Issue:** The OAuth client ID was not recognized after deployment.
- **Solution:** Enabled the OAuth consent screen and added authorized redirect URIs in the Google Cloud Console.

### 🔹 Tasks Not Updating Properly
- **Issue:** The task list was not updating in real-time after adding or editing tasks.
- **Solution:** Used React's `useState` effectively and ensured `setTasks([...tasks, newTask])` was correctly updating state.

### 🔹 Modal Not Closing on Outside Click
- **Issue:** The modal remained open even when clicking outside.
- **Solution:** Implemented an `onClick` event to detect clicks outside the modal and close it accordingly.

### 🔹 Filtering & Search Not Working
- **Issue:** Filters and search queries did not update tasks dynamically.
- **Solution:** Used `Array.prototype.filter()` to dynamically render tasks based on user input.


