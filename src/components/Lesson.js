var Boxxy = require('boxxy')
var React = require('react')

var LessonCode = require('./LessonCode')
var LessonHeader = require('./LessonHeader')
var LessonOutput = require('./LessonOutput')
var LessonText = require('./LessonText')

require('./Lesson.css')

var BOXXY_CONFIG = {
  columns: [
    {
      id: 'left',
      size: 50,
      children: [
        {id: 'lesson', size: 60},
        {id: 'output', size: 40}
      ]
    },
    {
      id: 'code',
      size: 50
    }
  ]
}

var Lesson = React.createClass({
  componentDidMount() {
    this.boxxy = new Boxxy(React.findDOMNode(this.refs.boxxy), BOXXY_CONFIG)
    this.renderBoxxyContent()
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.currentLessonIndex !== nextProps.currentLessonIndex ||
        this.props.currentStepIndex !== nextProps.currentStepIndex) {
      this.boxxy.blocks.lesson.scrollTop = 0
    }
    this.renderBoxxyContent(nextProps)
  },
  componentWillUnmount() {
    var {lesson, output, code} = this.boxxy.blocks
    React.unmountComponentAtNode(lesson)
    React.unmountComponentAtNode(output)
    React.unmountComponentAtNode(code)
  },
  render() {
    return <div className="Lesson">
      <LessonHeader {...this.props}/>
      <div className="Lesson__boxxy" ref="boxxy"/>
    </div>
  },
  renderBoxxyContent(props) {
    props = props || this.props
    var {lesson, output, code} = this.boxxy.blocks
    React.render(<LessonText {...props}/>, lesson)
    React.render(<LessonOutput {...props}/>, output)
    React.render(<LessonCode {...props}/>, code)
  }
})

module.exports = Lesson
