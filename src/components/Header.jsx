import { styled } from "styled-components";
import Button from "../components/Button";
import searchIcon from "../search-icon.svg";
import userIcon from "../user-icon.svg";
import { Link } from "react-router-dom";

function Header() {
  const HEADER_ST = styled.header`
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  `;

  const H1_ST = styled.h1`
    color: #ff385c;
    font-weight: bold;
  `;

  const FORM_ST = styled.form`
    width: 70%;
    position: relative;
    display: flex;
    align-items: center;
  `;

  const INPUT_ST = styled.input`
    width: 100%;
    height: 30px;
    border-radius: 20px;
    border: none;
    outline: none;
    background-color: #efefef;
    padding-left: 40px;
  `;

  const SEARCHICON_ST = styled.img`
    position: absolute;
    left: 10px;
    z-index: 1;
    cursor: pointer;
  `;

  const RIGHTBOX_ST = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
  `;

  const USERICON_ST = styled.img`
    cursor: pointer;
  `;
  return (
    <HEADER_ST>
      <H1_ST>In-VISION</H1_ST>
      <FORM_ST
        onSubmit={(event) => {
          event.preventDefault();
          alert("개발 중입니다.");
        }}
      >
        <SEARCHICON_ST src={searchIcon} alt="돋보기 아이콘" />
        <INPUT_ST type="text" placeholder="어떤 걸 찾으시나요?" />
      </FORM_ST>
      <RIGHTBOX_ST>
        <Button>글쓰기</Button>
        <Link to={`/showdetail`}>
          <USERICON_ST src={userIcon} alt="사용자 아이콘" />
        </Link>
      </RIGHTBOX_ST>
    </HEADER_ST>
  );
}

export default Header;
