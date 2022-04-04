/* board view.html 연결 */

async function view() {
    const [, , , idx] = location.pathname.split('/');
    const subjectBox = document.querySelector('#subject');
    const nicknameBox = document.querySelector('#nickname');
    const contentBox = document.querySelector('#content');

    const response = await axios.post(`http://localhost:3000/board/view/${idx}`, {
        withCredentials: true,
    });

    if (response.data.errno === 0) {
        const [{ subject, nickname, content }] = response.data.result;
        subjectBox.innerHTML = subject;
        nicknameBox.innerHTML = nickname;
        contentBox.innerHTML = content;
    }
}
view();

let state = {
    replay: [],
    value: '',
    length: ''
};

async function getComment() {
    const [, , , idx] = location.pathname.split('/');
    const response = await axios.post(`http://localhost:3000/board/comment/${idx}`, {
        withCredentials: true,
    });
    if (response.data.status) {
        state = {
            ...state,
            replay: response.data.commentList,
            length: response.data.commentList.length
        }
        commentView();
    }
}
getComment();

const commentApp = document.querySelector('#commentApp');
const commentForm = document.querySelector('#commentForm');
const commentList = document.querySelector('#commentList');
const commentInput = document.querySelector('#commentInput');

function createForm() {
    const clone = document.importNode(commentForm.content, true);
    const form = clone.querySelector('form');
    const counting = form.querySelector('h4 > span');
    counting.innerHTML = `(${state.length})`;

    form.addEventListener('submit', submitHandler);
    commentApp.append(clone);
}

async  function submitHandler(e) {
    e.preventDefault();
    const { input } = e.target;
    const counting = e.target.querySelector('h4 > span');
    const [, , , idx] = location.pathname.split('/');
    const result = {  userid: '{{  userData.userid  }}',nickname: '{{  userData.nickname  }}', comment: input.value };

    const response = await axios.post(`http://localhost:3000/board/comment-write/${idx}`,result, {
        withCredentials: true,
    });

    if (response.data.status) {
        state = {
            ...state,
            replay: response.data.commentList,
            length: response.data.commentList.length
        };
        input.value = '';
        counting.innerHTML = `(${state.length})`;
        commentView();
    }
}

function commentView() {
    commentApp.innerHTML = '';
    createForm();

    state.replay.forEach((v,i) => {
        const clone = document.importNode(commentList.content, true);
        const row = clone.querySelectorAll('.comment-row > li');
   
        row[0].innerText = v.nickname;
        row[1].querySelector('input').value = v.uuid;
        const deleteBtn = row[1].querySelector('.comment-delete-btn');
        if (v.updateFlag === true) {
            const spanElement = document.createElement('span');
            spanElement.innerText = v.comment;
            spanElement.addEventListener('click', updateHandler);
            deleteBtn.addEventListener('click', deleteHandler);
            row[1].prepend(spanElement);
        } else {
            const clone = document.importNode(commentInput.content, true);
            clone.querySelector('input').value = v.comment;
            clone.querySelector('input').addEventListener('keypress', updateSubmitHandler);
            deleteBtn.addEventListener('click', deleteHandler);
            row[1].prepend(clone);
        }
        row[2].innerHTML = moment(v.updatedAt).format('YYYY MM-DD hh:mm:ss');
        commentApp.appendChild(clone);
    });
}

function updateHandler(e) {
    const idx = parseInt(e.target.parentNode.querySelector('input').value);
    const newReply = [...state.replay];
    let index;
    for (let i = 0; i < newReply.length; i++) {
        if (newReply[i].idx === idx) {
            index = i;
        }
    }
    newReply[index].updateFlag = false;
    state = {
        ...state,
        replay: newReply
    };
    commentView();
}

async function updateSubmitHandler(e) {
    if (e.keyCode === 13) {
        const uuid = e.target.parentNode.parentNode.querySelector('input[type=hidden]').value;
        const response = await axios.post(`http://localhost:3000/board/comment-update/${uuid}`, { comment: e.target.value }, {
            withCredentials: true,
        });
        if (response.data.status) {
            const newReplay = Array.from(state.replay);
            const i = newReplay.findIndex(f => f.uuid === uuid);
            newReplay.splice(i, 1, response.data.comment);
            state = {
                ...state,
                replay: newReplay
            };
        }
        commentView();
    }
}

async function deleteHandler(e) {
    const uuid = e.target.parentNode.parentNode.querySelector('input[type=hidden]').value;
    const response = await axios.post(`http://localhost:3000/board/comment-delete/${uuid}`, {
        withCredentials: true,
    });
    if (response.data.status) {
        const newReply = state.replay.filter(v => v.uuid !== uuid);
        state = {
            ...state,
            replay: newReply,
            length: newReply.length
        };
    }
    commentView();
}
commentView();

async function view() {
    const [, , , idx] = location.pathname.split('/');
    const subjectBox = document.querySelector('#subject');
    const nicknameBox = document.querySelector('#nickname');
    const contentBox = document.querySelector('#content');
    const imageBox = document.querySelector('#image');
    const hitBox = document.querySelector('#hit');
    const private_chat = document.querySelector('#private_chat');

    const response = await axios.post(`http://localhost:3000/board/view/${idx}`, {
        withCredentials: true,
    });
    if (response.data.status) {
        const { subject, nickname, content, imageName, hit } = response.data.data;
        const array = JSON.parse(imageName).upload;
        for (let i = 0; i < array.length; i++) {
            const image = array[i];
            const url = `http://localhost:3000/${image.path.replace('public/', '')}`;
            imageBox.innerHTML += `<div class="image-wrapper"><img src="${url} "/></div>`;
        }
        subjectBox.innerHTML = subject;
        nicknameBox.innerHTML = nickname;
        contentBox.innerHTML = content;
        hitBox.innerHTML = `hit : ${hit}`;
        private_chat.innerHTML = `<a href="http://localhost:3001/board/private_chat/${nickname}" >1:1채팅</a>`;
    }
}
view();