import React from 'react'

export default class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  showCompleted = () => {
    this.props.showFiltered('SHOW_COMPLETED')
  }

  showAll = () => {
    this.props.showFiltered('SHOW_ALL')
  }

  showActive = () => {
    this.props.showFiltered('SHOW_ACTIVE')
  }

  render() {
    console.log('props in footer', this.props)

    return (
      <footer>
        <label>show：</label>
        <a href="javascript:;" onClick={this.showAll}>all</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="javascript:;" onClick={this.showCompleted}>completed</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="javascript:;" onClick={this.showActive}>active</a>
      </footer>
    )
  }
}