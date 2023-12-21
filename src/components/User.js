import {
  Link,
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  VStack,
  Input,
} from "@chakra-ui/react";

export default function User({
  username,
  onSubmit,
  onLogout,
  onCleanUserInput,
  loading,
}) {
  function submit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());

    onSubmit(formJson);
  }

  return (
    <VStack>
      {username && <Link onClick={onLogout}>{username}</Link>}
      {!username && (
        <Popover onOpen={onCleanUserInput} isLazy>
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <Button isLoading={loading} colorScheme="blue">
                  Login
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Box p="4" color="black">
                  <VStack>
                    <form onSubmit={submit}>
                      <Input placeholder="Username" name="username" />
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                      />
                      <Button
                        type="submit"
                        width="100%"
                        colorScheme="blue"
                        onClick={onClose}
                      >
                        Login
                      </Button>
                    </form>
                  </VStack>
                </Box>
              </PopoverContent>
            </>
          )}
        </Popover>
      )}
    </VStack>
  );
}
