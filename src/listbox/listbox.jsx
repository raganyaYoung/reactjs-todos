import React from 'react';
import style from './listbox.css';
import SubList from '../sublist/SubList.jsx';

class ListBox extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      todolists:[{
        checked:false,
        text:'11'
      },{
        checked:false,
        text:'22'
      }],
      inputValue:'',
      finishCount:1
    };
  }

  //    获取填写的任务
  //foo = (a,b,c) => {...}    foo = function(a,b,c) {...}
  handleText = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  };

  checkCallBack = index => {
    var arr = this.state.todolists;
    arr[index].checked = !arr[index].checked;
    var count = arr.reduceRight((prev, cur) => {
      if(cur.checked) {
        return prev+1;
      }
      return prev;
    }, 0);
    this.setState({
      todolists: arr,
      finishCount: count
    });
  };

  //    添加任务
  handleAdd = (e) => {
    if(e.keyCode == 13){
      var value = e.target.value;
      if(!value) return false;
      var todos = {
        checked:false,
        text:value
      };
      var totalLen = this.state.todolists.push(todos);//push返回数组的长度
      this.setState({
        todolists:this.state.todolists,
        inputValue:''
      })
    }
  };

  //plus按钮添加任务
  handleAddBtn = (e) => {
    var nextTask = this.state.inputValue;

    if(this.state.inputValue != ''){
      var todos = {
        checked:false,
        text:nextTask
      };
      var totalLen = this.state.todolists.push(todos);
      this.setState({
        todolists:this.state.todolists,
        inputValue:'',
      })
    }else{
      return false;
    }
  };

  //    删除单个任务，传递给SubList组件的方法
  delCallback = (index) => {
    var lists = this.state.todolists;
    var count = lists[index].checked?this.state.finishCount-1:this.state.finishCount;
    lists.splice(index,1);
    console.log('lists',lists);
    this.setState({
      todolists: lists,
      finishCount:count
    });
  };

  //删除所有已完成
  delAllFinish = () => {
    var lists = this.state.todolists;
    lists.forEach(function(msg,index){
      if(msg.checked){
        this.delCallback(index)
      }else{
        return false;
      }
    })
  };

  render() {
    var _self = this;
    var msgs = [];
    _self.state.todolists.forEach(function(msg,index){
      msgs.push(
        <SubList
          ref='conLabel' key={'msg'+index}
          tasks={msg}
          tasksText={msg.text}
          taskIndex={index}
          checkCallBack={_self.checkCallBack}
          delTask={_self.delCallback}
        />
      )
    });
    return (
      <div className="panel">
        <div className="panel-heading">
          <span className="glyphicon glyphicon-plus-sign" onClick={this.handleAddBtn}></span>
          <input className="panel-title" placeholder="what's your task?" value={this.state.inputValue} onChange={this.handleText} onKeyUp={this.handleAdd}/>
        </div>
        <ul className="panel-body">
          {msgs}
          <li>
            <input type="checkbox" name="goodCheck"/>
            <label>{this.state.finishCount}已完成/{this.state.todolists.length}总数</label>
            <button className="btn btn-xs btn-info pull-right delBtn">清除已完成</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default ListBox;