const nav = `
<div>
<nav class="">
    <div class="">
      <a class="" href="/"><img src="http://localhost:3000/logo-light.png"/></a>
      <button class="">
        <span class=""></span>
      </button>
      <div class="" id="">
        <ul class="">
          <li class="">
                <a class="" href="/board/write">글쓰기</a>
            </li>
                <li class="">
                    <a class="" href="#" onclick="publicChatHandler(true)">전체채팅하기</a>
                </li>
          <li class="">
            <a class="" href="#" id="" >
              Account
            </a>
            <ul class="" >
                <li><a class=""  id="logout" href="">로그아웃</a></li>
            </ul>
          </li>       
          <li class="">
              <a class="" href="#" id="" role="">
                Account
              </a>
              <ul class="">
                <li><a class=""  href="/user/login">로그인</a></li>
              </ul>
            </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="">
    <div class="" id="">
        <div class="">
            <div class="">
                <span>Public Chat </span>
                <button class="" onclick="publicChatHandler(false)">close</button>
            </div>
            <div class="" id="chat-msg-box">
                <ul id="chat" class="">
                </ul>
            </div>
            <div class="card-footer">
                <form action="/" method="get">
                    <div class="">
                        <input class="" type="text" name="input" id="input"/>
                        <button class="" type="submit">send</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="private-chat-wrapper" id="private-chat-wrapper">
     1:1 chat
  </div>
  </div>
</div>`;

const template = document.querySelector('template');
template.innerHTML = nav;

const t = document.importNode(template.content, true);

function createNav(ele){
  const navE = document.querySelector(ele)
  navE.appendChild(navE);
}