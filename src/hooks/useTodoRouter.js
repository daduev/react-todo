import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useTodoRouter = () => {
  const navigate = useNavigate();

  const goToMain = useCallback(
    (id) => {
      if (id) {
        navigate(`/main/${id}`);
      } else {
        navigate("/main");
      }
    },
    [navigate]
  );

  const goToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const goToRegistration = useCallback(() => {
    navigate("/registration");
  }, [navigate]);

  return { goToHome, goToMain, goToRegistration };
};

export default useTodoRouter;
