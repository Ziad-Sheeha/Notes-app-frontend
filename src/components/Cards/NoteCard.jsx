import moment from "moment";
import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
      return (
            <div
                  className="border border-l-4 border-l-blue-500 rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out
                   hover:bg-blue-50"
            >
                  <div className="flex items-center justify-between">
                        <div>
                              <h6 className="text-2xl text-slate-900 font-bold ">{title}</h6>
                              <span className="text-xs text-slate-400">
                                    {moment(date).isValid()
                                          ? moment(date).format("Do MMM YYYY")
                                          : "Invalid date"}
                              </span>
                        </div>
                        <MdOutlinePushPin
                              className={`icon-btn  ${
                                    isPinned
                                          ? "text-primary p-1 h-8 rotate-45 w-8 text-2xl border-2 rounded-full border-blue-500"
                                          : "text-slate-300"
                              }  `}
                              onClick={onPinNote}
                        />
                  </div>
                  <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-4	">
                        <div className="text-xs text-blue-900 font-medium rounded-lg pr-3 py-1">
                              {tags.map((item) => ` #${item} `)}
                        </div>

                        <div className="flex items-center gap-2">
                              <MdCreate className="icon-btn hover:text-primary" onClick={onEdit} />
                              <MdDelete
                                    className="icon-btn hover:text-red-500"
                                    onClick={onDelete}
                              />
                        </div>
                  </div>
            </div>
      );
};

export default NoteCard;
