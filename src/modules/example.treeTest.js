const Tree = require('./tree.js')

const treeData = {
  question: 'Sensor {id} not pinging?',
  yes: {
    question: 'Average data quality at farm {id} is low?',
    yes: {
      question: 'Field access point {id} has a very high load?',
      yes: { question: 'Internet connection down' },
      no: { question: 'Power  down at the farm' }
    },
    no: {
      question: 'Sensor {id} has very low signal strength?',
      yes: { question: 'Sensor out of range ' },
      no: { question: 'Overload deployment' }
    }
  },
  no: {
    question: 'Base station {id} not pinging?',
    yes: {
      question: 'Fap {id} is not pinging to bs {id}?',
      yes: { question: 'Cloud platform down' },
      no: { question: 'Internet connection down' }
    },
    no: {
      question: 'All base stations not pinging',
      yes: { question: 'Power  down at the farm' },
      no: { question: 'Sensor out of range' }
    }
  }
}

const tree = new Tree(treeData)

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.warn(tree.getCurrentNode())
rl.on('line', input => {
  let next
  if (input === 'y' || input === 'yes') {
    next = tree.walk(true)
    console.warn(next.question)
    if (next.complete) {
      console.warn('* thank you!')
      rl.close()
    }
  } else if (input === 'n' || input === 'no') {
    next = tree.walk(false)
    console.warn(next.question)
    if (next.complete) {
      console.warn('* thank you!!')
      rl.close()
    }
  } else {
    console.warn('* Sorry, I did not understand that.')
    console.warn(tree.getCurrentNode())
  }
})
