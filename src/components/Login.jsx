import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const email = user.email;
        const uid = user.uid;
        console.log("로그인 회원 정보 : ", uid, " ", email);
      }
    });
  }, []);

  const onChange = (event) => {
    const {
      target: {name, value},
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const signUp = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("회원가입 성공");

      setEmail("");
      setPassword("");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error with signUp", errorCode, errorMessage);
    }
  };

  const signIn = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("로그인 성공");
      setEmail("");
      setPassword("");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error with signUp", errorCode, errorMessage);
    }
  };
  const logOut = async (event) => {
    event.preventDefault();

    try {
      const userLogout = await signOut(auth);
      console.log("로그아웃 완료");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error with logOut", errorCode, errorMessage);
    }
  };

  return (
    <>
      <Layout>
        <LoginWrapper>
          <LoginTitle>
            In-vision에 오신것을
            <br />
            환영합니다
          </LoginTitle>
          <form>
            <LoginInputWrapper>
              <LoginLabel>이메일</LoginLabel>
              <LoginInput placeholder="이메일" type="email" value={email} name="email" onChange={onChange} required></LoginInput>
            </LoginInputWrapper>
            <LoginInputWrapper>
              <LoginLabel>비밀번호</LoginLabel>
              <LoginInput placeholder="비밀번호" type="password" value={password} name="password" onChange={onChange} required></LoginInput>
            </LoginInputWrapper>

            <LoginButton onClick={signIn}>로그인</LoginButton>
            <SignUpButton onClick={signUp}>회원가입</SignUpButton>
            <LogoutButton onClick={logOut}>로그아웃</LogoutButton>
          </form>
        </LoginWrapper>
      </Layout>
    </>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  z-index: 99;
`;

const LoginWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 30px;
  width: 300px;
  padding: 70px 100px 70px 100px;
  box-shadow: rgb(0 0 0 / 45%) 0px 2px 10px;
`;

const LoginTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
  margin-bottom: 32px;
`;

const LoginInputWrapper = styled.div`
  width: 100%;
`;

const LoginLabel = styled.label`
  display: block;
  font-size: 12px;
  margin-bottom: 5px;
`;

const LoginInput = styled.input.attrs({required: true})`
  width: 100%;
  font-size: 16px;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid #cdcdcd;
  margin-bottom: 12px;
  box-sizing: border-box;

  &::placeholder {
    color: #cdcdcd;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px 0;
  color: #fff;
  font-weight: 900;
  background-color: #000;
  border-radius: 30px;
  font-size: 16px;
  margin-top: 10px;
  transition: 0.3s ease;

  &:hover {
    background-color: #ff385c;
    color: #fff;
    transition: 0.3s ease;
  }
`;

const SignUpButton = styled.button`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  margin-top: 24px;
`;

const LogoutButton = styled.button`
  font-size: 16px;
  font-weight: 700;
  color: #999;
`;

export default Login;
