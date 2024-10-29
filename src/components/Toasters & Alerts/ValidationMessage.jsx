import React from "react";

const ValidationMessage = ({ msg }) => {
      return (
            <>
                  <p className="text-red-500 text-sm mt-0 bg-red-50 px-3 py-1 rounded-lg mb-5">
                        {msg}
                  </p>
            </>
      );
};

export default ValidationMessage;
