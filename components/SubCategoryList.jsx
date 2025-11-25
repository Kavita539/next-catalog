import styles from "@/styles/Catalogue.module.css";

import CategoryNode from "@/components/CategoryNode";

const SubCategoryList = ({ categoryName, nodes }) => {
  let topLevelNodes = {};
  const dataNode = nodes;

  if (categoryName === "IMF" && dataNode && dataNode.categories) {
    topLevelNodes = dataNode.categories;
  } else if (dataNode && dataNode.categories) {
    topLevelNodes = dataNode.categories;
  } else {
    return (
      <div className={styles.subCategory} style={{ color: "#9ca3af" }}>
        No monitor structure available.
      </div>
    );
  }

  return (
    <div className={styles.subCategoryList} style={{ overflowY: "auto" }}>
      {Object.keys(topLevelNodes).map((nodeName) => (
        <CategoryNode
          key={nodeName}
          name={nodeName}
          children={topLevelNodes[nodeName]}
        />
      ))}
    </div>
  );
};

export default SubCategoryList;
