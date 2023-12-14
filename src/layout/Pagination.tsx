import { Link } from "react-router-dom";

const PaginationNavigation = ({
  path,
  currentPageNum,
  maxPage,
  listOfPage,
}: {
  path: string;
  listOfPage: number[];
  currentPageNum: number;
  maxPage: number;
}) => {
  return (
    <nav aria-label={`${path}-pagination`}>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPageNum === 1 ? "disabled" : null}`}>
          <Link to={`/${path}?page=${currentPageNum - 1}`} className="page-link">
            Previous
          </Link>
        </li>
        {listOfPage.map((item) => (
          <li
            className={`page-item ${item === currentPageNum ? "active" : ""}`}
            key={item}
          >
            <Link to={`/${path}?page=${item}`} className="page-link">
              {item}
            </Link>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPageNum === maxPage ? "disabled" : null
          }`}
        >
          <Link to={`/${path}?page=${currentPageNum + 1}`} className="page-link">
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationNavigation;
