class Queue {
  queue;
  constructor() {
    this.queue = [];
  }

  async verifyInput(input) {
    if (!input || input == null) {
      console.warn("wrong input ");
      return false;
    }
    return true;
  }

  // method to add an item to the rear of the queue
  async enqueue(item) {
    if (await this.verifyInput(item)) {
      this.queue.push(item);
      console.log(this.queue);
    }
  }

  // method to remove and return the item from the front of the queue
  async dequeue() {
    const result = this.queue.shift();
    console.log(result);
    return result;
  }

  // method to return the item at the front of the queue
  async peek() {
    const result = this.queue[0];
    console.log(result);
    return result;
  }

  // method to return true if empty and false otherwise
  async is_empty() {
    const result = this.queue.length > 0 ? false : true;
    console.log(result);
    return result;
  }

  // method to return the number of items in the queue
  async size() {
    const result = this.queue.length;
    console.log(result);
    return result;
  }

  // method to print all the elements in the queue
  async print() {
    let result = "";
    for (let index = 0; index < this.queue.length; index++) {
      result += `${this.queue[index]}, `;
    }
    console.log(result);
    return result;
  }
}

my_queue = new Queue();
my_queue.is_empty();
my_queue.enqueue("undefined");
my_queue.enqueue("banana");
my_queue.enqueue("cherry");
my_queue.size();
my_queue.is_empty();
my_queue.dequeue();
my_queue.print();
// my_queue.enqueue("cbk");
my_queue.is_empty();
my_queue.size();
my_queue.print();

// my_queue.peek();
