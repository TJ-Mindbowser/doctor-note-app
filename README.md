## Getting Started
First, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

# Application bootstrap Flow
-App initiats a fetches call from mockable api - http://demo9104628.mockable.io/notes
-List of all the patients is rendered
-The app has
->Access/Search all the patients
->View all the notes associated to the patient
->Tab to see recent notes
->Add new note feature to the patient
->Sort the note in chronological order


Components
# components/Patient.js
-Contains Patient list followed by search feature
# component/Add.js
-Contains form to add new note
# component/Details.js
-Contains view to see note title and description
# components/Notes.js
-Contains list render of all the notes

Improvements/TODOs
-Implement redux for state management
