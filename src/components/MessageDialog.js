import { createStandaloneToast } from "@chakra-ui/react";

const { ToastContainer, toast } = createStandaloneToast();

function showError(payload) {
  showMessage({
    title: payload.status,
    description: payload.message,
    status: "error",
  });
}

function showSuccess(payload) {
  showMessage({
    title: payload.status,
    description: payload.data?.message || "OK",
    status: "success",
  });
}

function showMessage({ title, description, status }) {
  return toast({
    title,
    description,
    status,
    duration: 5000,
    isClosable: true,
    position: "top-right",
  });
}

export { ToastContainer, showError, showSuccess };
