

module.exports = function(app){

    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    
    var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}]
    
    app.use(bodyParser.urlencoded({extended: true}));
    //var urlencodedParser = bodyParser.urlencoded({ extended: true })


    var mongoose = require('mongoose');

        const MONGODB_URI = "mongodb+srv://mychat:mychat@cluster0.m9ikb.mongodb.net/mychat?retryWrites=true&w=majority";
    
        mongoose.connect( process.env.MONGODB_URI || MONGODB_URI, {
           useNewUrlParser: true,
          useUnifiedTopology: true
        });
    
    
    
        mongoose.connection.on('connected', () => {
          console.log('mongoose is connected')
        });
    
        const Schema = mongoose.Schema;
       const mychatSchema= new Schema({
            item: String
        });
    
       var mychat = mongoose.model('mychat', mychatSchema);
    
    
    

app.get('/', function (req, res) {
    mychat.find({}, function(err, data){
             if(err) throw err;
            res.render('todo', { todos: data})
        });
    //res.render('todo', {todos: data})
});
app.post('/todo', function (req, res) {
     var todo = {item: req.body.item}
   data.push(todo);
   var newmychat =  new mychat(todo)
          newmychat.save(function(err, data){
      
             if (err) throw err;
             res.render('todo', {todos: data})
             console.log('data has been saved')
          });
   res.render('todo', {todos: data})
   console.log(todo)
});
app.delete('/todo/:item', function (req, res) {
    data = data.filter(function(todo) {
        return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
});



}