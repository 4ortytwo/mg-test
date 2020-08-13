import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDrivers } from "../features/drivers/driversSlice";
import { RootState } from "../redux/store";

function usePagination(data, itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const drivers = useSelector((state: RootState) => state.drivers.drivers);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return data.slice(null, end);
  }, [data, currentPage, itemsPerPage]);

  function next() {
    if (drivers.length < currentPage * itemsPerPage) {
      dispatch(
        fetchDrivers(
          itemsPerPage.toString(),
          (itemsPerPage * currentPage).toString()
        )
      );
    }

    setCurrentPage((currentPage) => Math.min(currentPage + 1));
  }

  return { next, paginatedData, currentPage };
}

export default usePagination;
