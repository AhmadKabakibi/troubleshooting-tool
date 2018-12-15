import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Question from '../Question'
import QuestionCount from '../../components/QuestionCount'

// import { connect } from 'react-redux'

class Questionnaire extends Component {
  componentDidMount() {}

  handleNext = e => {
    e.preventDefault()
    this.props.handleNext()
  }

  handlePrev = e => {
    e.preventDefault()
    this.props.handlePrev()
  }

  handleAnswerSelected = e => {
    this.props.handleAnswerSelected(e.target.value)
  }

  render() {
    const { data, questionsList } = this.props
    return (
      <div className="questionnaire">
        <QuestionCount
          counter={data.questionIndex}
          total={questionsList.length}
        />
        <Question
          values={data.questionsList[data.questionIndex - 1]}
          selectedAnswer={data.selectedAnswer}
          questionIndex={data.questionIndex}
          sensorID={this.props.sensorID}
          currentState={data.answers.find(x => x.index === data.questionIndex)}
          onAnswerSelected={this.handleAnswerSelected}
        />
        <div>
          <button onClick={this.handlePrev}>Previous</button>
          <button onClick={this.handleNext}>Next</button>
        </div>
      </div>
    )
  }
}

Questionnaire.propTypes = {
  data: PropTypes.object.isRequired,
  questionsList: PropTypes.array.isRequired,
  sensorID: PropTypes.string.isRequired,
  handleNext: PropTypes.func.isRequired,
  handlePrev: PropTypes.func.isRequired,
  handleAnswerSelected: PropTypes.func.isRequired
}

export default Questionnaire
