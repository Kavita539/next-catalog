import { memo } from "react";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  BookmarkIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

import styles from "@/styles/Catalogue.module.css";

const DataRow = memo(({ item }) => {
  return (
    <div className={styles.dataRow}>
      {/* Name Column (title + tags) */}
      <div className={styles.rowName}>
        <p>{item.title}</p>
        <div className={styles.rowTags}>
          <span>{item.subCat}</span>
          <span>{item.src}</span>
        </div>
      </div>

      {/* Range Column (Mocked) */}
      <div className={styles.colRange}>
        Jan 2000 - Dec 2024
        <div
          style={{
            color: "rgb(87, 87, 87)",
            fontSize: "14px",
            fontStyle: "italic",
          }}
        >
          {item.freq}
        </div>
      </div>

      {/* Unit Column */}
      <div className={styles.colUnit}>{item.unit.split(" ")[0]}</div>

      {/* Coverage Column (Badges) */}
      <div className={styles.colCoverage}>
        <span className={`${styles.badge}`}>N</span>
      </div>

      {/* Actions Column (Static Icons) */}
      <div className={styles.rowActionGroup}>
        <BookmarkIcon
          className={styles.iconButtonInactive}
          title="Select"
          style={{ height: "1.25rem", width: "1.25rem" }}
        />
        <PlusCircleIcon
          className={styles.iconButtonInactive}
          title="Add to Cart"
          style={{ height: "1.25rem", width: "1.25rem" }}
        />
        <EllipsisVerticalIcon
          className={styles.iconButtonInactive}
          title="More"
          style={{ height: "1.25rem", width: "1.25rem" }}
        />
      </div>
    </div>
  );
});
DataRow.displayName = "DataRow";

export default DataRow;
