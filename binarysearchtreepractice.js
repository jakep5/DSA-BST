class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        else if (key < this.key) {
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this)
            }

            else {
                this.left.insert(key, value);
            }
        }

        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            } else {
                this.right.insert(key, value) //keep going until left/right is null, then create a new search tree
            }
        }
    }

    find(key) {
        if (this.key == key) {
            return this.value;
        }
        
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }

        else if (key > this.key && this.right) {
            return this.right.find(key);
        }

        else {
            throw new Error('Key Error');
        }
    }

    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) { //If two child nodes
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key)
            }

            else if (this.left) { //If only 1 left child node
                this._replaceWith(this.left);
            }

            else if (this.right) { //If only 1 right child noe
                this._replaceWith(this.right);
            }

            else { //If no child nodes, just make null
                this._replaceWith(null);
            }
        }

        else if (key < this.key && this.left) {
            this.left.remove(key); //Move left and do it again
        }

        else if (key > this.key && this.right) {
            this.right.remove(key); //Move right and do it again
        }

        else {
            throw new Error('Key error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }

            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right; 
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}

//4 What does this program do?

function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}

//This program adds all values in the tree

//5) Height of a BST

function getHeight(tree) {
    let left = tree.left
    let right = tree.right

    if (!left && !right) {
        return 0;
    }

    let leftCount = 0;
    let rightCount = 0;

    while (tree.left !== null) {
        leftCount ++;
        left = this.left;
    }

    while (tree.right !== null) {
        rightCount = 0;
        right = this.right;
    }

    console.log(leftCount, rightCount)
}

function height(node) {
    if (!node) {
        return 0;
    }

    let leftHeight = height(node.left);

    let rightHeight = height(node.right);
    
    return Math.max(leftHeight, rightHeight) + 1;
}

let testBST = new BinarySearchTree();

testBST.insert(4)
testBST.insert(1)
testBST.insert(7)
testBST.insert(4)
testBST.insert(9)
testBST.insert(2)
testBST.insert(4)
testBST.insert(1)
testBST.insert(8)

console.log(testBST)

//6) Is it a BST?

function isBST(tree) {
    let left = tree.left;
    let right = tree.right;
}

function returnParent(tree) {
    return tree.parent;
}

console.log(returnParent(testBST))