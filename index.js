const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
	useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('안녕하세요dddddddd하이오!!'))


app.post('/register', (req, res) => {
  //회원가입할 때 필요한 정보들을 Client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  
    const user = new User(req.body)
  //save는 몽고디비에서 온 메소드
    user.save((err, userInfo) => { 
        if(err) return res.json({success: false, err})
        return res.status(200).json({//status(200)은 그냥 성공했다는 표시. 그걸 json형식으로 전달해준다는 뜻
          success: true
        })
    })

})



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))