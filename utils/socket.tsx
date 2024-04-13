// import {over} from 'stompjs';
// import SockJS from 'sockjs-client';

// let stompClient = null;

// const connect = () => {
//     let Sock = new SockJS('http://localhost:8080/api/ws');
//     stompClient = over(Sock);
//     stompClient.connect({}, onConnected, (error) => console.log(error));
// }

// const onConnected = () => {
//     // Dùng để nhận các thông báo có người kết bạn, có người đồng ý kết bạn
//     stompClient.subscribe('/user/' + user.username + '/private', onMessageReceived);
//     // Dùng để nhận tin nhắn mới từ phòng chat
//     stompClient.subscribe('/chatroom/{id của phòng chat}', onPrivateMessageReceived);
// }

// const onMessageReceived = (payload) => {
  
//     // TODO làm quần què gì đó làm
// }

// // Gửi tin nhắn
// const sendMessage = () => {
//     const data = {
//         content: "Hello mấy ní",
//         sender: "id của thằng gửi",
//         replyMessageId: "id của tin nhắn muốn rep",
//         attachments: [
//             {
//                 type: "IMAGE",
//                 url: "/abc/abc.png",
//                 filename: "abc.png"
//             }
            
//         ],
//     };
//     stompClient.send("/app/chat/{id của phòng chat}", {}, JSON.stringify(data));
// }