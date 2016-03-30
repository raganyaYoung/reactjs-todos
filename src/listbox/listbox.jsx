import React from 'react';
import style from './listbox.css';
import SubList from '../sublist/SubList.jsx';

class ListBox extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      todolists:[],
      inputValue:'',
      finishCount:0,
      allChecked:false
    };
  }


  //    获取填写的任务
  //foo = (a,b,c) => {...}    foo = function(a,b,c) {...}
  handleText = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  };

  //勾选单个完成后修改已完成数 ， 传递给子组件SubList
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
    this.setState({
      todolists: lists,
      finishCount:count
    });
  };

  //删除所有已完成
  delAllFinish = () => {
    var that = this;
    var lists = that.state.todolists;
    function unChecked(lists){
      if(lists.checked){
        return false
      }else{
        return true
      }
    }
    var unFinishArr = lists.filter(unChecked);
    this.setState({
      todolists:unFinishArr,
      finishCount:0,
      allChecked:false
    });
  };

  //将所有task变成已完成
  checkAllFinish = () => {
    var lists = this.state.todolists;
    var bool = !this.state.allChecked;
    var count = 0;
    lists.forEach(function(msg,index){
      msg.checked = bool;
    })
    console.log('list',lists)
    this.setState({
      todolists:lists,
      finishCount:bool?lists.length:0,
      allChecked:bool
    })
  }

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
            <input type="checkbox" name="goodCheck" onClick={this.checkAllFinish} checked={this.state.allChecked}/>
            <label>{this.state.finishCount}已完成/{this.state.todolists.length}总数</label>
            <button className="btn btn-xs btn-info pull-right delBtn" onClick={this.delAllFinish}>清除已完成</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default ListBox;