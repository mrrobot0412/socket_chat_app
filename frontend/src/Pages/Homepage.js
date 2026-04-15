import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Flex,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { ChatIcon } from "@chakra-ui/icons";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Box
      minH="100vh"
      w="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-br, gray.50, blue.50)"
      position="absolute"
      top="0"
      left="0"
    >
      <Container maxW="lg" py={8} centerContent>
        <Flex direction="column" align="center" justify="center" minH="80vh" w="100%">
          {/* App Title Section */}
          <VStack spacing={6} mb={12} textAlign="center">
            <HStack spacing={3} align="center">
              <Box
                p={3}
                bg="blue.500"
                borderRadius="full"
                boxShadow="lg"
                _hover={{
                  transform: "scale(1.05)",
                  boxShadow: "xl",
                }}
                transition="all 0.3s"
              >
                <Icon as={ChatIcon} w={8} h={8} color="white" />
              </Box>
              <Text
                fontSize="5xl"
                fontWeight="800"
                color="gray.800"
                letterSpacing="tight"
              >
                Socket Chat
              </Text>
            </HStack>
            <Text
              fontSize="xl"
              color="gray.600"
              fontWeight="400"
              maxW="md"
              lineHeight="1.6"
              textAlign="center"
            >
              Connect instantly with friends and family. Start meaningful conversations in a beautiful, secure environment.
            </Text>
          </VStack>

          {/* Auth Card */}
          <Box
            bg="white"
            w="100%"
            maxW="md"
            p={10}
            borderRadius="24px"
            boxShadow="2xl"
            border="1px solid"
            borderColor="gray.200"
            position="relative"
            _hover={{
              boxShadow: "3xl",
              transform: "translateY(-2px)",
            }}
            transition="all 0.3s"
          >
            <Tabs isFitted variant="soft-rounded" colorScheme="blue">
              <TabList
                mb={8}
                bg="gray.50"
                p={2}
                borderRadius="16px"
                border="1px solid"
                borderColor="gray.100"
              >
                <Tab
                  fontWeight="600"
                  fontSize="md"
                  py={3}
                  _selected={{
                    bg: "blue.500",
                    color: "white",
                    boxShadow: "md",
                    transform: "translateY(-1px)",
                  }}
                  _hover={{
                    bg: "gray.100",
                  }}
                  transition="all 0.2s"
                >
                  Sign In
                </Tab>
                <Tab
                  fontWeight="600"
                  fontSize="md"
                  py={3}
                  _selected={{
                    bg: "blue.500",
                    color: "white",
                    boxShadow: "md",
                    transform: "translateY(-1px)",
                  }}
                  _hover={{
                    bg: "gray.100",
                  }}
                  transition="all 0.2s"
                >
                  Sign Up
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel p={0}>
                  <Login />
                </TabPanel>
                <TabPanel p={0}>
                  <Signup />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          {/* Footer */}
          <Text
            mt={8}
            fontSize="sm"
            color="gray.500"
            textAlign="center"
          >
            Secure • Fast • Reliable
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}

export default Homepage;
