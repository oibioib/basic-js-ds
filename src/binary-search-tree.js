const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
    constructor() {
        this.head = null;
    }

    root() {
        return this.head;
    }

    add(value, treeHead = this.head) {
        if (!treeHead) {
            this.head = new Node(value);
        } else {
            const { data, right, left } = treeHead;
            value > data ?
                (right ? this.add(value, right) : treeHead.right = new Node(value)) :
                (left ? this.add(value, left) : treeHead.left = new Node(value))
        }
    }

    has(value, treeHead = this.head) {
        if (!treeHead) return false;
        const { data, right, left } = treeHead;
        if (value === data) return true;
        return value > data ?
            this.has(value, right) :
            this.has(value, left);
    }

    find(value, treeHead = this.head) {
        if (!treeHead) return null;
        const { data, right, left } = treeHead;
        if (value === data) return treeHead;
        return value > data ?
            this.find(value, right) :
            this.find(value, left);
    }

    min(treeHead = this.head) {
        if (!treeHead) return null;
        if (treeHead.left) return this.min(treeHead.left);
        return treeHead.data;
    }

    max(treeHead = this.head) {
        if (!treeHead) return null;
        if (treeHead.right) return this.max(treeHead.right);
        return treeHead.data;
    }

    findCurrentNodeWithParentNode(value, treeHead = this.head, parent = null) {
        if (!treeHead) return null;
        const { data, right, left } = treeHead;
        if (value === data) return { cur: treeHead, par: parent };
        return value > data ?
            this.findCurrentNodeWithParentNode(value, right, treeHead) :
            this.findCurrentNodeWithParentNode(value, left, treeHead);
    }

    remove(value, head = this.head) {
        if (!head) return null;
        const currentNodeWithParentNode = this.findCurrentNodeWithParentNode(value, head);
        if (!currentNodeWithParentNode) return null;
        let { cur: current, par: parent } = currentNodeWithParentNode;

        if (parent) {
            if (current.data > parent.data) {
                parent.right = this.remove(value, parent.right)
            } else {
                parent.left = this.remove(value, parent.left)
            }
        } else {
            const setHead = (node, currentNode = current) => {
                if (currentNode === this.head) {
                    this.head = node;
                }
            }
            const { left, right } = current;
            if (!left && !right) {
                setHead(null);
                return null;
            }

            if (!left) {
                setHead(right);
                return right;
            }

            if (!right) {
                setHead(left);
                return left;
            }

            const min = this.min(right);
            current.data = min;
            current.right = this.remove(min, right);
        }
        this.head = head;
        return head;
    }

    // without recursion

    // add(data) {
    //     const newNode = new Node(data);
    //     if(!this.head) {
    //         this.head = newNode;
    //     } else {
    //         let currentNode = this.head;
    //         let lastNode = null;
    //         while(currentNode) {
    //             lastNode = currentNode;
    //             const { right, left } = currentNode;
    //             currentNode = data > currentNode.data ? right : left;
    //         }
    //         data > lastNode.data ? lastNode.right = newNode : lastNode.left = newNode;
    //     }
    // }

    // has(data) {
    //     if(!this.head) return false;
    //     let currentNode = this.head;
    //     while(currentNode) {
    //         if (data === currentNode.data) return true;
    //         const { right, left } = currentNode;
    //         currentNode = data > currentNode.data ? right : left;
    //     }
    //     return false;       
    // }

    // find(data) {
    //     let currentNode = this.head;
    //     while(currentNode) {
    //         if (data === currentNode.data) return currentNode;
    //         const { right, left } = currentNode;
    //         currentNode = data > currentNode.data ? right : left;
    //     }
    //     return currentNode; 
    // }

    // min() {
    //     if(!this.head) return null;
    //     let currentNode = this.head;
    //     while(currentNode.left) {
    //         currentNode = currentNode.left;
    //     }
    //     return currentNode.data; 
    // }

    // max() {
    //     if(!this.head) return null;
    //     let currentNode = this.head;
    //     while(currentNode.right) {
    //         currentNode = currentNode.right;
    //     }
    //     return currentNode.data; 
    // }
}

module.exports = {
    BinarySearchTree
};
