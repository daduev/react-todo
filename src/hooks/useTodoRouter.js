import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useTodoRouter = () => {
  const navigate = useNavigate();

  return useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );
};

export default useTodoRouter;
