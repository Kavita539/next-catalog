import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/outline";

import styles from "@/styles/Catalogue.module.css";

const Header = () => (
  <nav className={styles.headerNav}>
    <div className={styles.headerContent}>
      <div className={styles.headerSearchWrapper}>
      <div className={styles.logo}>IndiaDataHub</div>
      <div className={styles.searchWrapper}>
        <div className={styles.searchContainer}>
          <MagnifyingGlassIcon className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search for data and analytics"
            type="search"
          />
        </div>
      </div>
      </div>
      <div className={styles.navLinks}>
        <span>Database</span>
        <span>Calendar</span>
        <span>Help</span>
        <UserIcon className={styles.loginIcon} />
      </div>
    </div>
  </nav>
);

export default Header;
