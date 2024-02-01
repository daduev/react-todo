import { VStack, Container, Button } from "@chakra-ui/react";
import useTodoRouter from "../hooks/useTodoRouter";

export default function About() {
  const navigate = useTodoRouter();

  const back = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <VStack bg="#456797" padding={3}>
      <VStack color="white">
        <Container maxW="700px" padding={1}>
          The ToDo App: Streamlining Productivity
        </Container>
        <Container maxW="700px" padding={1}>
          In the hustle of daily life, the ToDo application stands out as a
          simple yet powerful tool for staying organized and boosting
          productivity. This digital task manager offers a user-friendly
          platform to create, edit, and prioritize tasks effortlessly.
        </Container>

        <Container maxW="700px" padding={1}>
          Designed for versatility, ToDo apps cater to students, professionals,
          and individuals seeking a streamlined organizational solution. Users
          can categorize tasks, assign priorities, and set reminders, tailoring
          the experience to their specific needs.
        </Container>

        <Container maxW="700px" padding={1}>
          Accessibility is a key feature, with most ToDo apps offering
          cross-platform synchronization. Whether on a computer, tablet, or
          smartphone, your to-do list remains at your fingertips, enhancing
          efficiency and peace of mind.
        </Container>

        <Container maxW="700px" padding={1}>
          As technology advances, ToDo applications evolve with collaborative
          features, enabling users to share tasks and integrate seamlessly with
          calendars. Smart notifications keep users informed, fostering a
          proactive approach to task management.
        </Container>

        <Container maxW="700px" padding={1}>
          In essence, the ToDo application is a beacon of productivity, offering
          a straightforward design and powerful features to empower users in
          taking control of their tasks. Harnessing its capabilities,
          individuals can navigate daily challenges with enhanced organization
          and efficiency, leading to a more balanced and productive lifestyle.
        </Container>
      </VStack>
      <Button colorScheme="blue" onClick={back}>
        Back
      </Button>
    </VStack>
  );
}