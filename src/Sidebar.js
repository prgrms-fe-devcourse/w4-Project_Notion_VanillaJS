import DocList from "./docList.js";
import { request } from "./api.js";

export default function Sidebar({ $target, userName, data }) {
  const $sidebar = document.createElement('div');
  $sidebar.id = 'sidebar';
  $target.appendChild($sidebar);

  const $header = document.createElement('div');
  $header.id = 'sidebar-header';
  $sidebar.appendChild($header);

  this.render = async () => {
    $header.innerHTML = `${userName}님의 Notion`;

    const docList = new DocList({
      $target: $sidebar,
      initialState: await data(),
      onCreate: async (t, p) => {
        await request(userName, 'documents', {
          method: 'POST',
          body: JSON.stringify({
            title: t,
            parent: p
          })
        });
        const nextState = await data();
        docList.setState(nextState);
      },
      onDelete: async (id) => {
        await request(userName, `documents/${id}`, {
          method: 'DELETE'
        });
        const nextState = await data();
        docList.setState(nextState);
      }
    });
  }

  this.render();
}

// export default function Sidebar({ $target, userName }) {
//   const $sidebar = document.createElement('div');
//   $sidebar.id = 'sidebar';

//   $target.appendChild($sidebar);

//   const docList = new DocList({
//     $target: $sidebar,
//     initialState: [],
//     userName,
//     getDoc: async () => {
//       const reqList = await request(userName, 'documents', {
//         method: 'GET'
//       });
//       return reqList;
//     },
//     postWelcomeDoc: async () => {
//       await request(userName, 'documents', {
//         method: 'POST',
//         body: JSON.stringify({
//           title: "기본 문서",
//           parent: null
//         })
//       });
//     }
//   });

//   this.render = () => {

//     // if (!isInit) {
//     //   const $li = $sidebar.querySelectorAll('li');

//     //   $li.forEach(li => li.addEventListener("click", (e) => {
//     //     const { id } = e.target.closest('li').dataset;
//     //     onToggle(parseInt(id));
//     //   }));
//     // }
//   }

//   this.render();
// }
