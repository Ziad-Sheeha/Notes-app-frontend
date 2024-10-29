import React, { useEffect, useState } from "react";
import TagInput from "../../components/Input/TagInput";
import ValidationMessage from "../../components/Toasters & Alerts/ValidationMessage.jsx";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance.js";

const AddEditNotes = ({ noteData, showToasterMessage, type, getAllNotes, onClose }) => {
      const [title, setTitle] = useState(noteData?.title || "");
      const [content, setContent] = useState(noteData?.content || "");
      const [tags, setTags] = useState(noteData?.tags || []);
      const [error, setError] = useState(null);

      // Check if the form should be disabled
      const isDisabled =
            type === "edit"
                  ? title === noteData?.title &&
                    content === noteData?.content &&
                    JSON.stringify(tags) === JSON.stringify(noteData?.tags)
                  : !title || !content;

      //Add Note
      const addNewNote = async () => {
            try {
                  const res = await axiosInstance.post("/add-note", {
                        title,
                        content,
                        tags,
                  });
                  if (res.data && res.data.note) {
                        getAllNotes();
                        onClose();
                        showToasterMessage("Note Added Successfully");
                  }
            } catch (error) {
                  if (error.res && error.res.data && error.res.data.message) {
                        setError(error.res.data.message);
                  }
            }
      };

      //Edit Note
      const editNote = async () => {
            const noteId = noteData._id;
            try {
                  const response = await axiosInstance.put("/edit-note/" + noteId, {
                        title,
                        content,
                        tags,
                  });
                  if (response.data && response.data.note) {
                        getAllNotes();
                        onClose();
                        showToasterMessage("Note Updated Successfully");
                  }
            } catch (error) {
                  if (error.response && error.response.data && error.response.data.message) {
                        setError(error.response.data.message);
                  }
            }
      };

      const handleAddNote = () => {
            if (!title) {
                  setError("Please enter the title");
                  return;
            }

            if (!content) {
                  setError("Please enter the content");
                  return;
            }
            setError("");

            if (type === "edit") {
                  editNote();
            } else {
                  addNewNote();
            }
      };

      useEffect(() => {
            if (noteData) {
                  setTitle(noteData.title || "");
                  setContent(noteData.content || "");
                  setTags(noteData.tags || []);
            }
      }, [noteData]);

      return (
            <div className="relative">
                  <button
                        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                        onClick={onClose}
                  >
                        <MdClose className="text-xl text-slate-400" />
                  </button>

                  <div className="flex flex-col gapp-2">
                        <label htmlFor="" className="input-label">
                              TITLE
                        </label>
                        <input
                              type="text"
                              className="text-2xl text-slate-950 outline-none"
                              placeholder="Go To Gym At 5.."
                              value={title}
                              onChange={(e) => {
                                    setTitle(e.target.value);
                              }}
                        />
                  </div>

                  <div className="flex flex-col gap-2 mt-4 ">
                        <label htmlFor="" className="input-label">
                              CONTENT
                        </label>
                        <textarea
                              type="text"
                              className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                              placeholder="Content"
                              rows={10}
                              value={content}
                              onChange={(e) => {
                                    setContent(e.target.value);
                              }}
                        ></textarea>
                  </div>

                  <div className="my-3">
                        <label htmlFor="" className="input-label">
                              TAGS
                        </label>
                        <TagInput tags={tags} setTags={setTags} />
                  </div>

                  {error && <ValidationMessage msg={error} />}
                  <button
                        className={`btn-primary font-medium mt-5 p-3 ${
                              isDisabled
                                    ? "bg-gray-300 hover:bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : ""
                        }`}
                        onClick={() => {
                              handleAddNote();
                        }}
                        disabled={isDisabled}
                  >
                        {type === "edit" ? "Update" : "ADD"}
                  </button>
            </div>
      );
};

export default AddEditNotes;
