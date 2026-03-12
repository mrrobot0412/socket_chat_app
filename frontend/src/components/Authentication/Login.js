import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={6}>
      <FormControl id="email" isRequired>
        <FormLabel
          fontWeight="600"
          color="gray.700"
          fontSize="sm"
          mb={3}
        >
          Email Address
        </FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter your email address"
          size="lg"
          variant="filled"
          bg="gray.50"
          border="2px solid transparent"
          borderRadius="12px"
          _hover={{
            bg: "gray.100",
            borderColor: "blue.200",
          }}
          _focus={{
            bg: "white",
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px #3182ce",
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel
          fontWeight="600"
          color="gray.700"
          fontSize="sm"
          mb={3}
        >
          Password
        </FormLabel>
        <InputGroup size="lg">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            variant="filled"
            bg="gray.50"
            border="2px solid transparent"
            borderRadius="12px"
            _hover={{
              bg: "gray.100",
              borderColor: "blue.200",
            }}
            _focus={{
              bg: "white",
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px #3182ce",
            }}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              variant="ghost"
              color="gray.600"
              _hover={{
                bg: "gray.200",
              }}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <VStack spacing={4} w="100%" pt={2}>
        <Button
          colorScheme="blue"
          width="100%"
          size="lg"
          height="12"
          fontSize="md"
          fontWeight="600"
          borderRadius="12px"
          onClick={submitHandler}
          isLoading={loading}
          loadingText="Signing in..."
          _hover={{
            transform: "translateY(-1px)",
            boxShadow: "lg",
          }}
          transition="all 0.2s"
        >
          Sign In
        </Button>

        <Button
          variant="outline"
          colorScheme="gray"
          width="100%"
          size="lg"
          height="12"
          fontSize="md"
          fontWeight="500"
          borderRadius="12px"
          borderWidth="2px"
          _hover={{
            bg: "gray.50",
            transform: "translateY(-1px)",
            boxShadow: "md",
          }}
          transition="all 0.2s"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
        >
          Try as Guest
        </Button>
      </VStack>
    </VStack>
  );
};

export default Login;
