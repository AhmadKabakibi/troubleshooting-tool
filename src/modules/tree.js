/*
theory research process of the tree:
Start with a full list of the objects. These can all start at equally likely, 
or they can be sorted by how likely the object was to be chosen in testing.
Start with the first question in the decision tree.
Push it onto the question queue.
Ask the question on top of the queue.
Process response:
Yes/No answers removes/adds a predetermined amount of probability from each answer based on the question.
"Maybe" answer removes/adds a fraction of the predetermined amount of a "yes".
"Unknow" does not change probabilities
An "Unknown" or "Maybe" response pushes both of the next nodes questions onto the question queue. 
A "Yes" or "No" response just adds the one respective yes/no node onto the question queue.
*/

class Tree {
  constructor(treeObj) {
    this.nodes = []
    this.currentNode = 0

    const add = ({ question, yes, no }) => {
      const currentIndex = this.nodes.length
      this.nodes.push({ question })
      if (yes) {
        this.nodes[currentIndex].yesIndex = add(yes)
      }
      if (no) {
        this.nodes[currentIndex].noIndex = add(no)
      }
      return currentIndex
    }

    add(treeObj)
  }

  setCurrentNode(node) {
    this.currentNode = node
  }
  getCurrentNode() {
    return this.currentNode
  }
  getCurrentNodeQuestion() {
    return this.nodes[this.currentNode].question
  }

  walk(affirmative) {
    if (affirmative) {
      this.currentNode = this.nodes[this.currentNode].yesIndex
    } else {
      this.currentNode = this.nodes[this.currentNode].noIndex
    }
    return {
      question: this.getCurrentNodeQuestion(),
      complete: !this.nodes[this.currentNode].yesIndex
    }
  }
}

module.exports = Tree
