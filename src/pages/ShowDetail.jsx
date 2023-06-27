import React from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import styled from "styled-components";

function ShowDetail() {
  const navigate = useNavigate();
  // const params = useParams();
  const [comments, setComments] = useState([
    { text: "할 일 1", isDone: false, id: 1 },
    { text: "할 일 2", isDone: true, id: 2 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      const q = query(collection(db, "comments"));
      const querySnapshot = await getDocs(q);

      const initialComments = [];

      // document의 id와 데이터를 initialTodos에 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshot.forEach((doc) => {
        //doc.id를 포함한 데이터를 가져와 추가한다
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        // console.log("data", data);
        initialComments.push(data);
      });

      // firestore에서 가져온 데이터를 state에 전달
      setComments(initialComments);
    };

    fetchData();
  }, []);

  // const [text, setText] = useState("");

  // const onChange = (event) => {
  //   const {
  //     target: { name, value },
  //   } = event;
  //   if (name === "text") {
  //     setText(value);
  //   }
  // };

  // //데이터 추가
  // const addTodo = async (event) => {
  //   event.preventDefault();
  //   const newTodo = { text: text, isDone: false };
  //   setTodos((prev) => {
  //     return [...todos, newTodo];
  //   });
  //   setText("");

  //   // Firestore에서 'todos' 컬렉션에 대한 참조 생성하기

  //   const collectionRef = collection(db, "todos");
  //   // 'todos' 컬렉션에 newTodo 문서를 추가합니다.
  //   // 첫번째 인자는 '어디'에 추가할 것인지, 두번째 인자는 '무엇'을 추가할 것인지
  //   await addDoc(collectionRef, newTodo);
  // };

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
            {/* <div>작성자 이메일</div>
            <div>게시물 제목, 내용</div> */}
            {comments.map(function (comment) {
              return (
                <div key={comment.id}>
                  <Span>{comment.text}</Span>
                </div>
              );
            })}
          </SmallTextBox>
          <ListBox>
            <h2>댓글 리스트</h2>
            {comments.map(function (comment) {
              return (
                <div key={comment.id}>
                  <Span>{comment.text}</Span>
                </div>
              );
            })}

            <div>댓글 입력창</div>
          </ListBox>
        </TextBox>
      </Container>
    </Layout>
  );
}

export default ShowDetail;

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

const Span = styled.span`
  /* display: flex; */
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

  box-sizing: border-box;
  padding: 20px;
`;
const ListBox = styled.div`
  border: 1px solid black;
  border-radius: 30px;

  width: 400px;
  height: 200px;
  margin-top: 20px;

  box-sizing: border-box;
  padding: 20px;
`;
