import React, { Component } from 'react'
import './MainPage.css'
import logo from './logo.svg'

import Questionnaire from '../../components/Questionnaire'
import Result from '../../components/Result'
import questionsList from '../../constants/questions'

// Random SENSOR_ID auto generated everytime
const SENSOR_ID =
  String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
  Math.floor(Math.random() * (999 - 100 + 1) + 100)

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      questionIndex: 1,
      questionsList: questionsList,
      answers: [],
      selectedAnswer: {}
    }
  }

  componentDidMount() {}

  handleAnswerSelected = answer => {
    // console.log('handleAnswerSelected', answer)
    this.answerQuestion(this.state.questionIndex, answer)
    this.setState({
      selectedAnswer: { index: this.state.questionIndex, answer: answer }
    })
    // console.log('handleAnswerSelected', this.state.answers)
  }

  handleNext = answer => {
    console.log(this.state.questionIndex)
    if (this.state.questionIndex < this.state.questionsList.length - 1) {
      console.log(this.state.answers)
      this.answerQuestion(
        this.state.questionIndex,
        this.state.selectedAnswer.answer
      )
      const counter = this.state.counter + 1
      const questionIndex = this.state.questionIndex + 1
      this.setState({
        counter: counter,
        questionIndex: questionIndex
      })
    }
  }

  handlePrev = answer => {
    if (this.state.questionIndex === 1) return
    const counter = this.state.counter - 1
    const questionIndex = this.state.questionIndex - 1
    this.setState({
      counter: counter,
      questionIndex: questionIndex
    })
  }

  answerQuestion(index, answer) {
    const answers = this.state.answers
    if (answers.find(x => x.index === index)) {
      answers[index - 1].answer = answer || 'maybe'
    } else {
      answers.push({ index: index, answer: answer || 'maybe' })
    }
    this.setState({
      answers: answers
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Service disruption detected</h2>
        </div>
        {this.state.questionIndex === this.state.questionsList.length - 1 ? (
          <Result />
        ) : (
          <Questionnaire
            data={this.state}
            questionsList={this.state.questionsList}
            sensorID={SENSOR_ID}
            handleNext={this.handleNext}
            handlePrev={this.handlePrev}
            handleAnswerSelected={this.handleAnswerSelected}
          />
        )}
      </div>
    )
  }
}

export default MainPage
