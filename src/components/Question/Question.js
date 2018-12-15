import React from 'react'
import PropTypes from 'prop-types'
import './Question.css'

function Question({
  onAnswerSelected,
  values,
  selectedAnswer,
  currentState,
  sensorID,
  questionIndex
}) {
  return (
    <div className="">
      <h2 className="question">{values.question.replace('{id}', sensorID)}</h2>
      <ul className="answerOptions">
        {values.answers.map((answer, i) => {
          return (
            <li className="answerOption" key={i}>
              <input
                type="radio"
                className="radioButton"
                name="radioGroup"
                id={i}
                value={answer}
                checked={Question.isChecked(
                  currentState,
                  answer,
                  selectedAnswer
                )}
                onChange={onAnswerSelected}
              />
              <label className="radioLabel" htmlFor={i}>
                {answer}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

Question.isChecked = (currentState, answer, selectedAnswer) => {
  if (currentState) {
    return answer === currentState.answer
  } else {
    return false
  }
}

Question.propTypes = {
  onAnswerSelected: PropTypes.func.isRequired,
  sensorID: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  selectedAnswer: PropTypes.object.isRequired,
  currentState: PropTypes.object,
  questionIndex: PropTypes.number.isRequired
}

export default Question
