class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(data) {
        const node = new Node(data);

        if (this.first === null) {
            this.first = node;
        }

        if (this.last !== null) {
            this.last.next = node;
        }

        this.last = node;
    }

    dequeue() {
        if (this.first === null) {
            return
        }

        let node = this.first;

        this.first = this.first.next;

        if (node === this.last) {
            this.last = null;
        }

        return node.value;

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

    preorder(node) {
        //visit root
        //traverse left subtree (this.inorder on left subtree)
        //traverse the right subtree (this.inorder on right subtree)

        if (node !== null) {
            console.log(node.data);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }

    postorder(node) {
        //Traverse left subtree
        //Traverse right subtree
        //Visit root
        this.postorder(node.left);
        this.postorder(node.right);
        console.log(node.data);
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

    bfs(node, values = []) {
        const queue = new Queue();
        queue.enqueue(node);
        while (queue.length) {
            const node = queue.dequeue();
            values.push(node.value);

            if (node.left) {
                queue.enqueue(node.left);
            }

            if (node.right) {
                queue.enqueue(node.right);
            }
        }

        return values;
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

const assignmentBST = new BinarySearchTree();

assignmentBST.insert(25);
assignmentBST.insert(15);
assignmentBST.insert(50);
assignmentBST.insert(10);
assignmentBST.insert(24);
assignmentBST.insert(35);
assignmentBST.insert(70);
assignmentBST.insert(4);
assignmentBST.insert(12);
assignmentBST.insert(18);
assignmentBST.insert(31);
assignmentBST.insert(44);
assignmentBST.insert(66);
assignmentBST.insert(90);
assignmentBST.insert(22);

/* console.log(assignmentBST.preorder()) */

//6) Find the next commanding officer (search algorithms assignments)

let commandTree = new BinarySearchTree();

commandTree.insert(45)
commandTree.insert(35)
commandTree.insert(42)
commandTree.insert(34)
commandTree.insert(33)
commandTree.insert(46)
commandTree.insert(55)
commandTree.insert(53)

let orderOfCommand = function(tree, node) {
    return tree.bfs(node)
}

console.log(orderOfCommand(commandTree, commandTree.root))

//7) Max profit:
//share price for company over a week is: [128, 97, 121, 123, 98,  97, 105]

let priceArray = [128, 97, 121, 123, 98, 97, 105];


function getMaxProfit(priceArray) {
    if (priceArray.length < 2) {
        throw new Error('Getting a profit requires at least 2 prices');
    }

    let minPrice = priceArray[0];

    let maxProfit = priceArray[1] - priceArray[0];

    let minIndex = 0;

    for (let i = 1; i < priceArray.length; i++) {
        if (priceArray[i] - minPrice > maxProfit) {
            maxProfit = priceArray[i] - minPrice;
        }

        if (priceArray[i] < minPrice && i !== priceArray.length - 1) {
            minPrice = priceArray[i];
            minIndex = i;
        }
    }

    return maxProfit;
}


console.log(getMaxProfit(priceArray))