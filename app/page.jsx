"use client";

import { useState, useEffect, useMemo, useCallback, memo } from "react";

import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import {
  FunnelIcon,
  BookmarkIcon,
  ShoppingCartIcon,
  ChevronLeftIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

import styles from "@/styles/Catalogue.module.css";

import SubCategoryList from "@/components/SubCategoryList";
import DataRow from "@/components/DataRow";
import Header from "@/components/Header";

import response1 from "@/data/response1.json";
import response2 from "@/data/response2.json";

const RECORDS_PER_PAGE = 10;

const getTopCategories = (categories) => {
  return ["India & States", "IMF", "Global Indicators"].filter(
    (value, index, self) => self.indexOf(value) === index
  );
};

export default function CataloguePage() {
  const ALL_DATA = {
    "India & States": response1,
    IMF: response2,
    "Global Indicators": { categories: {}, frequent: [] },
  };

  const topLevelCategories = getTopCategories(ALL_DATA);

  const [selectedCategory, setSelectedCategory] = useState(
    topLevelCategories[0]
  );
  const [data, setData] = useState(ALL_DATA[selectedCategory]?.frequent || []);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const newDataSource = ALL_DATA[selectedCategory] || {
      categories: {},
      frequent: [],
    };
    setData(newDataSource.frequent);
    setCurrentPage(1);
  }, [selectedCategory]);

  const totalPages = Math.ceil(data.length / RECORDS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * RECORDS_PER_PAGE;
    const end = start + RECORDS_PER_PAGE;
    return data.slice(start, end);
  }, [data, currentPage]);

  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        document.getElementById("results-pane")?.scrollTo(0, 0);
      }
    },
    [totalPages]
  );

  return (
    <div className={styles.pageContainer}>
      <Header />

      <div className={styles.secondHeaderBar}>
        <div
          className={styles.secondHeaderContentGroup}
          style={{
            maxWidth: "80rem",
            justifyContent: "space-between",
            width: "100%",
            borderRight: "1px solid grey",
            paddingRight: "1rem",
          }}
        >
          <h1 className={styles.monitorTitle}>
            <ChevronLeftIcon
              style={{ height: "1rem", width: "1rem", marginRight: "4px" }}
            />
            Economic Monitor
          </h1>
          <div className={styles.iconContainer}>
            <MagnifyingGlassIcon
              className={styles.secondaryHeaderIcon}
              title="Search Monitor"
            />
            <BookmarkIcon
              className={styles.secondaryHeaderIcon}
              title="Bookmarks"
            />
            <FunnelIcon className={styles.secondaryHeaderIcon} title="Filter" />
          </div>
        </div>

        <div
          className={styles.secondHeaderContentGroup}
          style={{ maxWidth: "40rem", border: "none", gap: "8px" }}
        >
          <span style={{ color: "#6b7280", fontSize: "16px" }}>
            Selected (2)
          </span>
          <ShoppingCartIcon
            className={styles.secondaryHeaderIcon}
            title="Shopping Cart"
          />
          <MapPinIcon className={styles.secondaryHeaderIcon} title="Map View" />
          <button className={styles.actionButton}>View Graph</button>
        </div>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.sidebar}>
          <div
            className={styles.categoryLabel}
            style={{ position: "sticky", top: 0 }}
          >
            Category
          </div>
          <div className={styles.categorySelectWrapper}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.categorySelect}
            >
              {topLevelCategories.map((catName) => (
                <option key={catName} value={catName}>
                  {catName}
                </option>
              ))}
            </select>
            <ChevronDownIcon className={styles.selectArrow} />
          </div>

          <SubCategoryList
            categoryName={selectedCategory}
            nodes={ALL_DATA[selectedCategory]}
          />
        </div>

        <div id="results-pane" className={styles.resultsPane}>
          <div className={styles.tableHeader}>
            <div className={styles.colName}>New Releases ({data.length})</div>
            <div className={styles.colRange}>Range</div>
            <div className={styles.colUnit}>Unit</div>
            <div className={styles.colCoverage}>Coverage</div>
            <div className={styles.colActions}>Actions</div>
          </div>

          <div className={styles.resultsScrollWrapper}>
            <div className={styles.resultsList}>
              {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <DataRow key={item.id} item={item} />
                ))
              ) : (
                <div className={styles.noResult}>No Result Found</div>
              )}
            </div>
          </div>

          {Array.isArray(paginatedData) && paginatedData.length > 0 && (
            <>
              <div className={styles.paginationContainer}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.pageButton}
                >
                  Previous
                </button>
                <span
                  className={styles.pageButtonActive}
                  style={{ padding: "0.5rem 0.75rem" }}
                >
                  {currentPage}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.pageButton}
                >
                  Next
                </button>
              </div>
              <div className={styles.pageInfo}>
                Showing{" "}
                {Math.min(
                  data.length,
                  (currentPage - 1) * RECORDS_PER_PAGE + 1
                )}{" "}
                - {Math.min(data.length, currentPage * RECORDS_PER_PAGE)} of{" "}
                {data.length} records
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
