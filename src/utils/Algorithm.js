export const Trie = (function () {
  function TrieNode(val = '') {
      this.val = val;
      this.end = false;
      this.children = {};
  }

  function Trie() {
      this.root = new TrieNode();
  }

  Trie.prototype.insert = function (str) {
      let curNode = this.root;

      for (let i = 0; i < str.length; i++) {
          const curChar = str[i];

          if (!curNode.children[curChar]) curNode.children[curChar] = new TrieNode(curChar);
          curNode = curNode.children[curChar];
      }

      curNode.end = true;
  };

  Trie.prototype.getAllWords = function (userInputString) {
      let curNode = this.root;
      let str = '';
      const res = [];

      if(userInputString.length === 0) return res;

      for (let i = 0; i < userInputString.length; i++) {
          const curChar = userInputString[i];

          if (!curNode.children[curChar]) return res;

          curNode = curNode.children[curChar];
          str += curChar;
      }

      this.findAllWords(curNode, str, res);

      return res;
  };

  Trie.prototype.findAllWords = function (node, str, arr) {
      if (node.end === true) arr.push(str);

      for (const child in node.children) {
          this.findAllWords(node.children[child], str + node.children[child].val, arr);
      }
  };

  return Trie;
})();