import { request, removeChained } from "../api.js";
import SideList from "./SideList.js";
import LinkButton from "../LinkButton.js";
import Header from "./Header.js";
import { getItem, setItem } from "../storage.js";

export default function SidePage({ $target, mainPageId, onClick }) {
  new Header({
    $target,
    initialState: {
      id: null,
      title: "",
      content: "",
      parent: null,
    },
  });

  new LinkButton({
    $target,
    initialState: {
      text: "+New Page",
      link: "/documents/new",
      btnType: "new",
    },
  });

  this.renderList = async () => {
    const pageList = (await request("/documents")).slice(1);
    const $sideListBox = document.createElement("div");
    $sideListBox.setAttribute("id", "sideListBox");

    const $sideListHeader = document.createElement("h2");
    $sideListHeader.setAttribute("id", "sideListHeader");
    $sideListHeader.innerHTML = "WORK SPACE";
    $sideListBox.appendChild($sideListHeader);

    new SideList({
      $target: $sideListBox,
      initialState: pageList,
      onClick: (clicked) => {
        const postListInfo = pageList.filter((list) => list.id == clicked)[0];
        onClick(postListInfo);
      },
      onRemove: async (clicked) => {
        const clickedComponent = (await request("/documents")).filter(
          (list) => list.id == clicked
        )[0];

        let thisPage = getItem("mainPageId");

        $sideListBox.querySelector(`[data-listid="${clicked}"]`).remove();
        removeChained(clickedComponent);

        if (clicked == thisPage) {
          const firstPageId = pageList[0].id;
          setItem("mainPageId", firstPageId);
          thisPage = firstPageId;
        }

        const postListInfo = pageList.filter((list) => list.id == thisPage)[0];
        onClick(postListInfo);
      },
    });

    let savedMainPage = getItem("mainPageId", false);
    savedMainPage =
      savedMainPage != "initialPage"
        ? $sideListBox
            .querySelector(`[data-listid="${savedMainPage}"]`)
            .classList.add("nowOpened")
        : null;

    $target.appendChild($sideListBox);
  };

  this.render = () => {
    this.renderList();
  };

  this.render();

  this.refreshList = () => {
    $target.querySelector("#sideListBox").remove();
    this.render();
  };
}
