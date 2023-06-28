import React from "react";
import {useNavigate} from "react-router-dom";
import {addDoc, collection, getDocs, query} from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../firebase";
import styled from "styled-components";
import {doc, getDoc} from "firebase/firestore";

function ShowDetail() {
  const navigate = useNavigate();
  // const params = useParams();

  const [content, setContent] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const snapContent = await getDoc(doc(db, "contents", "content"));

      if (snapContent.exists()) {
        console.log(snapContent.data());
        setContent(snapContent.data());
      } else {
        console.log("No such document");
      }

      const snapUser = await getDoc(doc(db, "users", "user"));

      if (snapUser.exists()) {
        console.log(snapUser.data());
        setUser(snapUser.data());
      } else {
        console.log("No such document");
      }
    };

    fetchData();
  }, []);

  const [comments, setComments] = useState([]);

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

  const [text, setText] = useState("");
  const onChange = (event) => {
    const {
      target: {name, value},
    } = event;
    if (name === "text") {
      setText(value);
    }
  };

  //데이터 추가
  const addComment = async (event) => {
    event.preventDefault();
    const newComment = {text: text};
    setComments((prev) => {
      return [...comments, newComment];
    });
    setText("");

    const collectionRef = collection(db, "comments");
    // 'todos' 컬렉션에 newTodo 문서를 추가합니다.
    // 첫번째 인자는 '어디'에 추가할 것인지, 두번째 인자는 '무엇'을 추가할 것인지
    await addDoc(collectionRef, newComment);
  };

  return (
    <Layout>
      {/* <Backbutton
        onClick={() => {
          navigate("/");
        }}
      >
        BACK
      </Backbutton> */}
      <Container>
        {/* 컨텐츠가 null이 아닐때 */}
        {content && user && (
          <>
            <PhotoBox>
              <PhotoImg src={content.imgUrl} />
            </PhotoBox>

            <TextBox>
              <SmallTextBox>
                <ContentBox>
                  <UserImgBox>
                    <UserImg src={user.imgUrl} />
                  </UserImgBox>

                  <h1>{user.nickname}</h1>
                </ContentBox>
                <ContentTitle>{content.title}</ContentTitle>
                <ContentDesc>{content.desc}</ContentDesc>
              </SmallTextBox>
              <ListBox>
                <H1>COMMENT ▼</H1>
                <CommentListBox>
                  {comments.map(function (comment) {
                    // console.log(comment.id);
                    return (
                      <CommentBox key={comment.id}>
                        <Comment>{comment.text}</Comment>
                      </CommentBox>
                    );
                  })}
                </CommentListBox>

                <div>
                  <ListBoxForm onSubmit={addComment}>
                    <FormInput type="text" placeholder="leave comment" value={text} name="text" onChange={onChange} required></FormInput>
                    {/* <FormButton>✏️</FormButton> */}
                  </ListBoxForm>
                </div>
              </ListBox>
            </TextBox>
          </>
        )}
      </Container>
    </Layout>
  );
}
export default ShowDetail;

const Layout = styled.div`
  max-width: 1200px;
  min-width: 1000px;

  /* box-sizing: border-box; */
  /* text-align: center; */
  display: flex;

  justify-content: center;

  margin: 300px auto;
`;
const Container = styled.div`
  font-family: "Cafe24Ssurround";
  /* color: burlywood; */
  /* border: 2px solid burlywood; */
  box-shadow: 5px 5px 20px 5px #e5e5e5;
  border-radius: 30px;
  display: flex;

  width: 950px;
  height: 800px;

  /* margin: auto; */
  padding: 20px;
`;

const ContentDesc = styled.div`
  font-size: 1.3em;
  line-height: 140%;
  overflow-y: auto;
  /* word-break: break-all */
  /* word-break: break-word */
  /* padding: 10px; */
  word-wrap: break-word;

  &::-webkit-scrollbar {
    width: 20px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: white;
  }
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
  /* background-color: #ff385c; */
  border-radius: 30px;
  overflow: hidden;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
`;
const PhotoImg = styled.img`
  width: 100%;
  border-radius: 30px;

  /* object-fit: contain; */
`;

const TextBox = styled.div`
  /* background-color: lightgrey; */
  border-radius: 30px;
  width: 50%;
  height: 100%;
  /* margin-left: 40px; */
  box-sizing: border-box;
  padding-left: 35px;
  padding-right: 20px;
`;

const SmallTextBox = styled.div`
  /* border: 1px solid black; */
  border-radius: 30px;
  width: 100%;
  height: 50%;

  box-sizing: border-box;
  padding-top: 40px;
`;
const ContentBox = styled.div`
  display: flex;
  align-items: center;
`;

const ContentTitle = styled.div`
  font-size: 2.5em;
  font-weight: bold;

  margin: 30px 0;
`;
const ListBox = styled.div`
  /* border: 1px solid black; */
  border-radius: 30px;

  width: 100%;
  height: 50%;
  /* margin-top: 20px; */

  box-sizing: border-box;
  padding-top: 20px;
`;
const H1 = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
`;
const CommentListBox = styled.div`
  /* border: 1px solid black; */
  /* border-radius: 30px; */

  width: 100%;
  height: 65%;
  margin-top: 30px;

  box-sizing: border-box;
  overflow-y: auto;
  /* word-break: break-all */
  /* word-break: break-word */
  /* padding: 10px; */
  word-wrap: break-word;

  &::-webkit-scrollbar {
    width: 20px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: white;
  }
`;
const CommentBox = styled.div`
  width: 100%;

  margin-bottom: 15px;

  box-sizing: border-box;
`;
const Comment = styled.div`
  font-size: 1.2em;

  box-sizing: border-box;
`;
const ListBoxForm = styled.form`
  width: 100%;
  height: 35px;
  margin-top: 20px;

  box-sizing: border-box;
`;
const FormInput = styled.input`
  border: transparent;
  background-color: lightgray;
  border-radius: 30px;

  width: 95%;
  height: 35px;
  margin-right: 3px;

  font-size: 20px;
  padding-left: 20px;
`;
// const FormButton = styled.button`
//   border: 1px solid black;
//   border-radius: 30px;
//   float: right;
//   width: 40px;
//   height: 40px;
// `;
const UserImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50px;
`;
/* object-fit: contain; */

const UserImgBox = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50px;
  margin-right: 10px;
`;
