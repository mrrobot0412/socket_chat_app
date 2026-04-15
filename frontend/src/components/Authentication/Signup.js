import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { ChatState } from "../../Context/ChatProvider";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();
  const { setUser } = ChatState();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data); // Add this line to update context
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
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
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        toast({
          title: "Image upload is not configured",
          description: "Set Cloudinary environment variables before uploading avatars.",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setPicLoading(false);
        return;
      }

      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", uploadPreset);
      data.append("cloud_name", cloudName);
      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing={5}>
      <FormControl id="first-name" isRequired>
        <FormLabel
          fontWeight="600"
          color="gray.700"
          fontSize="sm"
          mb={3}
        >
          Full Name
        </FormLabel>
        <Input
          placeholder="Enter your full name"
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
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

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
            type={show ? "text" : "password"}
            placeholder="Create a password"
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
            onChange={(e) => setPassword(e.target.value)}
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

      <FormControl id="confirm-password" isRequired>
        <FormLabel
          fontWeight="600"
          color="gray.700"
          fontSize="sm"
          mb={3}
        >
          Confirm Password
        </FormLabel>
        <InputGroup size="lg">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm your password"
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
            onChange={(e) => setConfirmpassword(e.target.value)}
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

      <FormControl id="pic">
        <FormLabel
          fontWeight="600"
          color="gray.700"
          fontSize="sm"
          mb={3}
        >
          Profile Picture (Optional)
        </FormLabel>
        <Input
          type="file"
          p={2}
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
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        size="lg"
        height="12"
        fontSize="md"
        fontWeight="600"
        borderRadius="12px"
        mt={4}
        onClick={submitHandler}
        isLoading={picLoading}
        loadingText="Creating account..."
        _hover={{
          transform: "translateY(-1px)",
          boxShadow: "lg",
        }}
        transition="all 0.2s"
      >
        Create Account
      </Button>
    </VStack>
  );
};

export default Signup;
