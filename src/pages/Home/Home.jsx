import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import Toaster from "../../components/Toasters & Alerts/Toaster.jsx";
import EmptyCard from "../../components/Cards/EmptyCard.jsx";

const Home = () => {
      const [openAddEditModal, setOpenAddEditModal] = useState({
            isShown: false,
            type: "add",
            date: null,
      });

      const [showToaster, setShowToaster] = useState({
            isShown: false,
            message: "",
            type: "add",
      });

      const [allNotes, setAllNotes] = useState([]);
      const [userInfo, setUserInfo] = useState(null);

      const [isSearch, setIsSearch] = useState(false);

      const navigate = useNavigate();

      const handleEdit = (noteDetails) => {
            setOpenAddEditModal({
                  isShown: true,
                  data: noteDetails,
                  type: "edit",
            });
      };

      //Show Toaster
      const showToasterMessage = (message, type) => {
            setShowToaster({
                  isShown: true,
                  message,
                  type,
            });
      };

      //Close Toaster
      const handleCloseToaster = () => {
            setShowToaster({
                  isShown: false,
                  message: "",
            });
      };

      //Get User Info
      const getUserInfo = async () => {
            try {
                  const response = await axiosInstance.get("/get-user");
                  if (response.data && response.data.user) {
                        setUserInfo(response.data.user);
                  }
            } catch (error) {
                  if (error.response && error.response.status === 401) {
                        localStorage.clear();
                        navigate("/login");
                  } else {
                        console.error("Error fetching user info:", error.response || error.message);
                  }
            }
      };

      //Get All Notes
      const getAllNotes = async () => {
            try {
                  const response = await axiosInstance.get("/get-all-notes");
                  if (response.data && response.data.notes) {
                        setAllNotes(response.data.notes);
                  }
            } catch (error) {
                  console.log("An unexpected error occurred. Please try again.");
            }
      };

      //Delete Note
      const deleteNote = async (data) => {
            const noteId = data._id;
            try {
                  const response = await axiosInstance.delete("/delete-note/" + noteId);
                  if (response.data && !response.data.error) {
                        getAllNotes();
                        showToasterMessage("Note Deleted Successfully", "delete");
                  }
            } catch (error) {
                  if (error.response && error.response.data && error.response.data.message) {
                        console.log("An unexpected error occurred. Please try again.");
                  }
            }
      };

      //Search for a Note
      const onSearchNote = async (query) => {
            try {
                  const response = await axiosInstance.get("/search-notes", {
                        params: { query },
                  });
                  if (response.data && response.data.notes) {
                        setIsSearch(true);
                        setAllNotes(response.data.notes);
                  }
            } catch (error) {
                  console.log(error);
            }
      };

      const handleClearSearch = () => {
            setIsSearch(false);
            getAllNotes;
      };

      // Pin the note
      const updateIsPinned = async (noteData) => {
            const noteId = noteData._id;
            try {
                  const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
                        isPinned: !noteData.isPinned, // Fix this line to use noteData.isPinned
                  });
                  if (response.data && response.data.note) {
                        getAllNotes();
                  }
            } catch (error) {
                  console.log(error);
            }
      };

      useEffect(() => {
            getAllNotes();
            getUserInfo();
            return () => {};
      }, []);

      return (
            <>
                  <Navbar
                        userInfo={userInfo}
                        onSearchNote={onSearchNote}
                        handleClearSearch={handleClearSearch}
                  />

                  <div className="container mx-auto">
                        {allNotes.length > 0 ? (
                              <div className=" px-6 grid md:grid-cols-3 gap-4 mt-8">
                                    {allNotes.map((item, index) => (
                                          <NoteCard
                                                key={item._id}
                                                title={item.title}
                                                date={item.createdOn}
                                                content={item.content}
                                                tags={item.tags}
                                                isPinned={item.isPinned}
                                                onEdit={() => handleEdit(item)}
                                                onDelete={() => deleteNote(item)}
                                                onPinNote={() => updateIsPinned(item)}
                                          />
                                    ))}
                              </div>
                        ) : (
                              <EmptyCard />
                        )}
                  </div>
                  <button
                        className={`w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 absolute right-5 bottom-5 ${
                              allNotes.length === 0 ? "animate-bounce" : ""
                        }`}
                        onClick={() => {
                              setOpenAddEditModal({ isShown: true, type: "add", date: null });
                        }}
                  >
                        <MdAdd className="text-[32px] text-white" />
                  </button>

                  <Modal
                        isOpen={openAddEditModal.isShown}
                        onRequestClose={() => {}}
                        style={{
                              overlay: {
                                    backgroundColor: "rgba(0,0,0,0.2)",
                              },
                        }}
                        contentLabel=""
                        className="outline-none md:w-[40%] w-[85%] max-h-3/4 bg-white  rounded-md mx-auto mt-14 p-5 overflow-auto"
                  >
                        <AddEditNotes
                              type={openAddEditModal.type}
                              noteData={openAddEditModal.data}
                              onClose={() => {
                                    setOpenAddEditModal({
                                          isShown: false,
                                          type: "add",
                                          date: null,
                                    });
                              }}
                              getAllNotes={getAllNotes}
                              showToasterMessage={showToasterMessage}
                        />
                  </Modal>

                  <Toaster
                        isShown={showToaster.isShown}
                        message={showToaster.message}
                        type={showToaster.type}
                        onClose={handleCloseToaster}
                  />
            </>
      );
};

export default Home;
