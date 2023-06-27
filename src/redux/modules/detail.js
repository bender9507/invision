//액션 value와 액션 크리에이터가 선언되는 곳
//리듀서가 들어가는 곳
//리듀서: 변화를 일으키는 함수
//변화가 필요한 곳은 내 게시물 등록, 수정, 삭제

// 초기 상태값
const initialState = {};

// 리듀서
const details = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// 모듈파일에서는 리듀서를 export default 한다.
export default details;
