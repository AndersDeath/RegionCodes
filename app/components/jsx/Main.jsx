define(['react','db/base','Tools'], function(React,baseArr,tools) {
       var Line = React.createClass({
           render: function() {
               return (
                   <div className="line">
                     <div className="regionName">
                       {this.props.name}
                     </div>
                     {
                       this.props.arr.map(function(el){
                         return (
                           <div className="code">{el} </div>
                         )
                       })
                     }
                  </div>
               );
           }
       });
       var App = React.createClass({
           getInitialState: function() {
               return {
                  regionList: baseArr,
               };
           },
           componentWillMount:function(){
            this.initStorage();
            this.bindKeys();
           },
           //переписать метод
           bindKeys: function() {
            var codes = [17,39,37];
            var pressed =[];
            var self = this;
            document.onkeydown = function(e) {
              e = e || window.event;
              pressed.push(e.keyCode);
              if(JSON.stringify(pressed)=='[17,39]')
              {
                self._switchSearchHandle(0);
              }
              if(JSON.stringify(pressed)=='[17,37]')
              {
                self._switchSearchHandle(1);
              }
            };
            document.onkeyup = function(e) {
              e = e || window.event;
              pressed = [];
            };

          },
           componentDidMount:function(){
             var doc = document;
             var trigger = this.getStorage('trigger');
             if(trigger==0){
               doc.querySelector(".search.region").style.display = 'none';
               doc.querySelector(".searchSwitch button.code").classList.add('active');
             } else {
               doc.querySelector(".search.code").style.display = 'none';
               doc.querySelector(".searchSwitch button.region").classList.add('active');
             }

           },
           initStorage:function(){
             var defaultTbl = {
               'trigger':0,
             };
             var tbl = localStorage.getItem("RegionCodes");
             if(tbl===null){
               localStorage.setItem("RegionCodes",JSON.stringify(defaultTbl));
             }
           },
           getStorage:function(value){
              return JSON.parse(localStorage.getItem("RegionCodes"))[value];
           },
           setStorage:function(num){
             var defaultTbl = {
               'trigger':num,
             };
              localStorage.setItem("RegionCodes",JSON.stringify(defaultTbl));
          },
           startSearch: function(event) {
               var doc = document;
               var target = event.target;
               var state = target.classList.contains('code') ? 1 : 0;
               var searchQuery = target.value;
               var regionList = baseArr.filter(function(el) {
                   var searchValue = target.classList.contains('code') ?  el.code.join('') :  el.name.toLowerCase();
                   return searchValue.indexOf(searchQuery.toLowerCase()) !== -1;
               });
               this.setState({
                   regionList: regionList
               });
           },
           switchSearch:function(el){
             var testClass = el.target.classList;
            if(testClass.contains('code') && !testClass.contains('actve')){
                this._switchSearchHandle(1);
             } else if (testClass.contains('region') && !testClass.contains('actve')) {
                this._switchSearchHandle(0);
             }
           },
           _switchSearchHandle:function(e){
             var state,
             doc = document;
             if(e==1){
                doc.querySelector(".searchSwitch button.region").classList.remove('active');
                doc.querySelector(".searchSwitch button.code").classList.add('active');
                doc.querySelector(".search.code").style.display = 'block';
                doc.querySelector(".search.region").style.display = 'none';
                doc.querySelector(".search.region").value = '';
                state = 0;
              } else if (e==0) {
                doc.querySelector(".searchSwitch button.code").classList.remove('active');
                doc.querySelector(".searchSwitch button.region").classList.add('active');
                doc.querySelector(".search.region").style.display = 'block';
                doc.querySelector(".search.code").style.display = 'none';
                doc.querySelector(".search.code").value = '';
                state = 1;
              }
              this.setStorage(state);
              this.setState({
                  regionList: baseArr
              });
           },
           render: function() {
             return (
                    <div className="regionList">
                          <div className="top">
                            <div className="helpBlock">
                              для быстрого переключения между режимами поиcка используйте <br/>
                              ctrl+ &larr; поиск по коду<br/>
                              ctrl+ &rarr; поиск по названию<br/>
                            </div>
                            <h2 className="searchLabel"></h2>
                            <input className="search code" onChange={this.startSearch} type="text" placeholder="Поиск по коду"></input>
                            <input className="search region" onChange={this.startSearch} type="text" placeholder="Поиск по региону"></input>
                            <div className="searchSwitch">
                              <button className="code" onClick={this.switchSearch}>Код</button>
                              <button className="region" onClick={this.switchSearch}>Имя</button>
                            </div>
                          </div>
                          <div className="content">
                         {
                            this.state.regionList.map(function(el) {
                                 return <Line
                                     name={el.name}
                                     arr={el.code}
                                     key={el.id}
                                 />;
                            })
                         }
                       </div>
                     </div>
             );
           }
       });


     return App;
});
