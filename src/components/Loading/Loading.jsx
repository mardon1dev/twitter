import React from "react";

import "./loading.css";

const Loading = () => {
  return (
    <div>
      <div class="ui-loader loader-blk">
        <svg viewBox="22 22 44 44" class="multiColor-loader">
          <circle
            cx="44"
            cy="44"
            r="20.2"
            fill="none"
            stroke-width="3.6"
            class="loader-circle loader-circle-animation"
          ></circle>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
