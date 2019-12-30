class Node {
    constructor(data) {
        this.data = data;
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

        if(this.first === null) {
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