import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const Layout = styled.div`
  max-width: 1200px;
  min-width: 1000px;

  /* text-align: center; */
  display: flex;
  /* justify-content: center; */

  margin: 400px auto;
`;
const Container = styled.div`
  font-family: "Cafe24Ssurround";
  color: burlywood;
  border: 2px solid burlywood;
  border-radius: 30px;
  display: flex;

  height: 600px;
  width: 800px;
  margin: auto;
  padding: 20px;
`;

const H2 = styled.h2`
  display: flex;
  /* justify-content: center; */
  font-size: 1.3em;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const Backbutton = styled.button`
  background-color: burlywood;
  border: none;

  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  height: 40px;
  width: 70px;
  transition: 0.2s;
  &:hover {
    background-color: #ddd;
  }
`;

const PhotoBox = styled.div`
  background-color: burlywood;
  border-radius: 30px;
  width: 400px;
  height: 600px;
`;

const TextBox = styled.div`
  background-color: lightgrey;
  border-radius: 30px;
  width: 400px;
  height: 600px;
  margin-left: 20px;
`;

const SmallTextBox = styled.div`
  border: 1px solid black;
  border-radius: 30px;
  width: 400px;
  height: 300px;
`;
const ListBox = styled.div`
  border: 1px solid black;
  border-radius: 30px;

  width: 400px;
  height: 200px;
  margin-top: 20px;
`;

function ShowDetail() {
  const navigate = useNavigate();
  // const params = useParams();
  return (
    <Layout>
      <Backbutton
        onClick={() => {
          navigate("/");
        }}
      >
        BACK
      </Backbutton>
      <Container>
        <PhotoBox></PhotoBox>
        <TextBox>
          <SmallTextBox>
            <div>작성자 이메일</div>
            <div>게시물 제목, 내용</div>
          </SmallTextBox>
          <ListBox>
            <div>댓글 리스트</div>
            <div>댓글 입력창</div>
          </ListBox>
        </TextBox>
      </Container>
    </Layout>
  );
}

export default ShowDetail;
