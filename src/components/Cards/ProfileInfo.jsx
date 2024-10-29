import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
      return (
            <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
                        {getInitials(userInfo?.fullName)}
                  </div>
                  <div>
                        <p className="text-sm font-semibold">{userInfo?.fullName}</p>
                        <button
                              className="text-sm text-red-700 bg-red-50 px-3 py-1 rounded-full transition-all duration-200  hover:bg-red-500 hover:text-white"
                              onClick={onLogout}
                        >
                              Logout
                        </button>
                  </div>
            </div>
      );
};

export default ProfileInfo;
