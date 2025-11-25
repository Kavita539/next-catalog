import { memo, useState } from "react";

import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";

import styles from "@/styles/Catalogue.module.css";

const CategoryNode = memo(({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = children && Object.keys(children).length > 0;

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.categoryNode}>
      <div
        className={styles.subCategory}
        onClick={hasChildren ? handleToggle : undefined}
        style={{ fontWeight: hasChildren ? "600" : "normal" }}
      >
        {/* Collapse Icon or Leaf Icon */}
        {hasChildren ? (
          isOpen ? (
            <ChevronDownIcon className={styles.subCategoryIcon} />
          ) : (
            <ChevronRightIcon className={styles.subCategoryIcon} />
          )
        ) : (
          <MapPinIcon
            className={styles.subCategoryIcon}
            style={{ color: "#9ca3af" }}
          />
        )}
        {name}
      </div>

      {/* Render children only if open and children exist */}
      {hasChildren && isOpen && (
        <div className={styles.nestedCategories}>
          {Object.keys(children).map((childName) => (
            <CategoryNode
              key={childName}
              name={childName}
              children={children[childName]}
            />
          ))}
        </div>
      )}
    </div>
  );
});
CategoryNode.displayName = "CategoryNode";

export default CategoryNode;
