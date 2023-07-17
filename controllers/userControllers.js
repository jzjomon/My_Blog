const doLogin = (req,res)=>{
    res.render('login')
}
const doSignUp = (req,res)=>{
    res.render('signUp')
}
module.exports = { doLogin , doSignUp }