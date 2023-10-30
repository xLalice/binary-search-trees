class Node {
  constructor(data) {
	this.data = data;
	this.left = null;
	this.right = null;
  }
}

class Tree {
	constructor(data) {
		this.root = this.buildTree([...new Set(data.sort((a, b) => a - b))]);
	}

	buildTree(data) {
		if (data.length === 0) {
			return null;
		}

		const mid = Math.floor(data.length / 2);
		const root = new Node(data[mid]);
		root.left = this.buildTree(data.slice(0, mid));
		root.right = this.buildTree(data.slice(mid + 1));
		return root;
	}

	insert(value) {
		this.root = this._insert(this.root, value);
	}

	_insert(node, value) {
		if (node === null) {
			return new Node(value);
		}

		if (value < node.data) {
			node.left = this._insert(node.left, value);
		} else if (value > node.data) {
			node.right = this._insert(node.right, value);
		}

		return node;
	}

	delete(value) {
		this.root = this._delete(this.root, value);
	}

	_delete(node, value) {
		if (node === null) {
			return node;
		}

		if (value < node.data) {
			node.left = this._delete(node.left, value);
		} else if (value > node.data) {
			node.right = this._delete(node.right, value);
		} else {
			if (node.left === null) {
			return node.right;
			} else if (node.right === null) {
			return node.left;
			}

			node.data = this.findMinValue(node.right);
			node.right = this._delete(node.right, node.data);
		}

		return node;
	}

	findMinValue(node) {
		while (node.left !== null) {
			node = node.left;
		}
		return node.data;
	}

	prettyPrint() {
		this._prettyPrint(this.root, '', true);
	}

	_prettyPrint(node, prefix, isLeft) {
		if (node === null) {
			return;
		}

		if (node.right !== null) {
			this._prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
		if (node.left !== null) {
			this._prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}
	}

	find(value) {
		return this._find(this.root, value);
	}

	_find(node, value) {
		if (node === null) {
			return null; // Value not found in the tree
		}

		if (value < node.data) {
			return this._find(node.left, value);
		} else if (value > node.data) {
			return this._find(node.right, value);
		} else {
			return node; // Value found in the current node
		}
	}

	levelOrder(arr = [], queue = [], root = this.root) {
		if (root === null) return;
		// Visit the root
		arr.push(root.data);
  
		// Traverse to left and right children -> add to queue
		queue.push(root.left);
		queue.push(root.right);
  
		// Move to next level
		while (queue.length) {
		  const level = queue[0];
		  queue.shift();
		  this.levelOrder(arr, queue, level)
		}
  
		return arr;
	}

	inOrder(arr = [], root = this.root){
		if (root === null) return arr;

		this.inOrder(arr, root.left);
		arr.push(root);
		this.inOrder(arr, root.right);

		return arr;
	}

	preOrder(arr = [], root = this.root){
		if (root === null) return arr;
		
		this.preOrder(arr, root.left);
		arr.push(root);
		this.preOrder(arr, root.right);
		return arr;
	}

	postOrder(arr = [], root = this.root){
		if (root === null) return arr;

		this.postOrder(arr, root.left);
		this.postOrder(arr, root.right);
		arr.push(root);
		return arr;
	}

	height(root = this.root){
		if (!root) return 0;

		let leftHeight = this.height(root.left);
		let rightHeight = this.height(root.right);

		if (leftHeight > rightHeight){
			return leftHeight + 1;
		} else {
			return rightHeight + 1;
		}
	}

	depth(node, root = this.root, depth = 0){
		if (node === null || root === null) return;
		if (node.data === root.data) return `Depth: {${depth}}`;

		if (node.data < root.data){
			return this.depth(node, root.left, depth += 1);
		} else {
			return this.depth(node, root.right, depth += 1);	
		}
	}

	isBalanced(root = this.root){
		let leftHeight = this.height(root.left);
		let rightHeight = this.height(root.right);
		let result = Math.abs(leftHeight - rightHeight);

		return  result <= 1 ? true : false;
	}

	reBalance() {
		const values = this.inOrder().map(node => node.data);
		this.root = this.buildTree(values);
	}
}

function getRandomValues(arr = []){
	if (arr.length === 20){
		return;
	}

	arr.push(Math.floor(Math.random() * 100 + 1));
	getRandomValues(arr);
	return arr;
}

function main(){
	let newTree = new Tree(getRandomValues());
	newTree.prettyPrint();
	console.log(`isBalanced : ${newTree.isBalanced()}`);
	console.log(newTree.levelOrder());
	console.log(newTree.inOrder());
	console.log(newTree.preOrder());
	console.log(newTree.postOrder());
	for (let i = 0; i < 10; i++){
		newTree.insert(Math.floor(Math.random() * 1000 + 100));
	}
	newTree.prettyPrint();
	console.log(`The new tree should be false: ${newTree.isBalanced()}`);
	console.log("Balance the tree");
	newTree.reBalance();
	newTree.prettyPrint();
	newTree.isBalanced();
	console.log(newTree.levelOrder());
	console.log(newTree.inOrder());
	console.log(newTree.preOrder());
	console.log(newTree.postOrder());
}

main();
