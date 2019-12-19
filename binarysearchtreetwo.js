class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        let newNode = new Node(data);

        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode) //call recursively
            }
        }

        else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode)//recursively continues down the right path
            }
        }
    }

    remove(data) {
        this.root = this.removeNode(this.root, data);
    }

    removeNode(node, key) {
        if (node === null) {
            return null;
        }

        else if (key < node.data) {
            node.left = this.removeNode(node.left, key);
            return node;
        }

        else if (key > node.data) {
            node.right = this.removeNode(node.right, key);
            return node;
        }

        else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            if (node.left === null) { //There is a node to the right
                node = node.right;
                return node;
            }

            else if (node.right === null) {
                node = node.left;
                return node;
            }

            let tempNode = this.findMinNode(node.right);
            node.data = tempNode.data;

            node.right = this.removeNode(node.right, aux.data);
            return node;
        }
    }

    inorder(node) {

        if (node !== null) {
            this.inorder(node.left);
            console.log(node.data);
            this.inorder(node.right);
        }

    }

    findMinNode(node) {
        if (node.left === null) {
            return node;
        }

        else {
            return this.findMinNode(node.left);
        }
    }

    getRootNode() {
        return this.root;
    }

    search(node, data) {
        if (node === null) {
            return null;
        }

        else if (data < node.data) {
            return this.search(node.left, data);
        }

        else if (data > node.data) {
            return this.search(node.right, data);
        }

        else {
            return node;
        }
    }

    getHeight(node) {
        if (node === null) {
            return 0;
        }

        return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

}

let testTree = new BinarySearchTree();

testTree.insert(91)
testTree.insert(12)
testTree.insert(21)
testTree.insert(8)
testTree.insert(90)
testTree.insert(65)
testTree.insert(33)
testTree.insert(12)
testTree.insert(7)
testTree.insert(71)

console.log(testTree.getRootNode());

console.log(testTree.search(testTree.root, 66));

//5) Height of a BST

let getHeight = function(node) {
    if (node === null) {
        return 0;
    } else {
        let lDepth = getHeight(node.left);
        let rDepth = getHeight(node.right);

        if (lDepth > rDepth) {
            return (lDepth + 1);
        } else {
            return (rDepth + 1);
        }
    }
}

console.log(getHeight(testTree.root))

//6) Is it a BST?

let isBST = function(root) {

    let result = true;

    if (root.left === null|| root.right === null) {
        return result;
    }
    
    if (root.left.data > root.data) {
        result = false;
        isBST(root.left);
    } else {
        result = true;
        isBST(root.left);
    }

    if (root.right.data < root.data) {
        result = false;
        isBST(root.right);
    } else {
        result = true;
        isBST(root.right);
    }
    
}

/* console.log(isBST(testTree)) */

//7) 3rd largest node

let thirdLargest = function(node) {

    let numArray = [];

    function inOrder(node) {
        if (node !== null) {
            inOrder(node.left);
            numArray.push(node.data);
            inOrder(node.right);
        }
    }
    
    inOrder(node);
    

    return numArray[numArray.length - 3]
}

/* console.log(thirdLargest(testTree.root)) */
console.log(thirdLargest(testTree.root))

//8) Balanced BST:

let isBalanced = function(tree) {

    let node = tree.root;

    if (node === null) {
        return true;
    }

    let heightDifference = Math.abs(tree.getHeight(node.left) - tree.getHeight(node.right));

    if (heightDifference > 1) {
        return false;
    } else {
        return isBalanced(node.left) && isBalanced(node.right);
    }
}

console.log(isBalanced(testTree))

//9) Are they the same BST's? -- Cannot construct BSTs

let isSame = function(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    let arr1Ordered = arr1.sort();
    let arr2Ordered = arr2.sort();

    for (let i = 0; i < arr1Ordered.length; i++) {
        if (arr1Ordered[i] !== arr2Ordered[i]) {
            return false
        }
    }

    return true;
}

let arr1 = [3, 1, 5, 2, 4, 6, 0];
let arr2 = [3, 5, 4, 6, 1, 0, 3];

console.log(isSame(arr1, arr2))

