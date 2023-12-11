import React from "react";
import "./SortArrow.scss";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";

type Props = {
  direct: string;
};

const SortArrow = (props: Props) => {
  return (
    <div className="sort-arrow">
      <span className="flex-column">
        <FaSortUp
          className={`${
            props.direct === "asc" ? "highlight-arrow" : "mute-arrow"
          } arrow-top`}
        />
        <FaSortDown
          className={`${
            props.direct === "desc" ? "highlight-arrow" : "mute-arrow"
          } arrow-down`}
        />
      </span>
    </div>
  );
};

export default SortArrow;
