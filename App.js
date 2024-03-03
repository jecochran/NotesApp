import NotesList from "./components/NotesList";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Search from "./components/Search";
import Header from "./components/Header";
import { MdAddLocationAlt } from "react-icons/md";
import StepByStep from "./components/StepByStep";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "12/12/2022",
    },
    {
      id: nanoid(),
      text: "This is my second note!",
      date: "14/12/2022",
    },
    {
      id: nanoid(),
      text: "This is my fourth note!",
      date: "54/12/2022",
    },
    {
      id: nanoid(),
      text: "This is my fifth note!",
      date: "25/12/2022",
    },
    {
      id: nanoid(),
      text: "This is my sixth note!",
      date: "10/12/2022",
    },
  ]);

  //State for search text
  const [searchText, setSearchText] = useState("");

  //State for dark mode
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    try {
      const savedNotes = JSON.parse(
        localStorage.getItem("react-notes-app-data")
      );

      const savedMode = JSON.parse(
        localStorage.getItem("react-notes-app-mode")
      );

      if (savedNotes) {
        setNotes(savedNotes);
      }

      if (savedMode) {
        setDarkMode(savedMode);
      }
    } catch (error) {
      console.error("Error loading notes from local storage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
      localStorage.setItem("react-notes-app-mode", JSON.stringify(darkMode));
    } catch (error) {
      console.error("Error saving notes to local storage:", error);
    }
  }, [notes, darkMode]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <StepByStep />
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
