define(['react','db/base'], function(React,baseArr) {
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
           startSearch: function(event) {
               var searchQuery = event.target.value;
               var regionList = baseArr.filter(function(el) {
                   var searchValue =el.code.join('');
                   return searchValue.indexOf(searchQuery) !== -1;
               });
               this.setState({
                   regionList: regionList
               });
           },
           render: function() {
             return (
                    <div className="regionList">
                          <h2 className="searchLabel">Код региона:</h2> <input className="search" onChange={this.startSearch} type="text"></input>
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
             );
           }
       });


     return App;
});
